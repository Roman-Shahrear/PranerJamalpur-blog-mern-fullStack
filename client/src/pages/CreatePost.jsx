import { FileInput, Select, TextInput, Button, Alert } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FcCameraIdentification } from "react-icons/fc";
import { FcClapperboard } from "react-icons/fc";

export default function CreatePost() {
  const navigate = useNavigate();

  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);
  const [formData, setFormData] = useState({});
  
  const handleImageFileChange = (e) => {
    setImageFiles([...imageFiles, ...Array.from(e.target.files)]);
  };

  const handleVideoFileChange = (e) => {
    setVideoFiles([...videoFiles, ...Array.from(e.target.files)]);
  };

  const handleUploadFiles = async () => {
    try {
      console.log("Entering handleUploadFiles");

      if (imageFiles.length === 0 && videoFiles.length === 0) {
        setUploadError("Please select at least one image or video");
        return;
      }

      setUploadError(null);

      const storage = getStorage(app);
      const imageUploadPromises = [];
      const videoUploadPromises = [];

      // Upload images
      imageFiles.forEach((imageFile) => {
        const imageFileName = new Date().getTime() + "-image-" + imageFile.name;
        const imageStorageRef = ref(storage, imageFileName);
        const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile);
        imageUploadPromises.push(imageUploadTask);
      });

      // Upload videos
      videoFiles.forEach((videoFile) => {
        const videoFileName = new Date().getTime() + "-video-" + videoFile.name;
        const videoStorageRef = ref(storage, videoFileName);
        const videoUploadTask = uploadBytesResumable(
          videoStorageRef,
          videoFile
        );
        videoUploadPromises.push(videoUploadTask);
      });

      // Update progress during the upload for each image file
      imageFiles.forEach((imageFile, index) => {
        const imageUploadTask = imageUploadPromises[index];

        imageUploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
      });

      // Update progress during the upload for each video file
      videoFiles.forEach((videoFile, index) => {
        const videoUploadTask = videoUploadPromises[index];

        videoUploadTask.on("state_changed", (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        });
      });

      await Promise.all([...imageUploadPromises, ...videoUploadPromises]);

      // Get download URLs after all uploads complete
      const imageUrls = await Promise.all(
        imageUploadPromises.map(async (task) => {
          try {
            const downloadURL = await getDownloadURL(task.snapshot.ref);
            return downloadURL;
          } catch (error) {
            console.error("Error getting download URL for image:", error);
            return "default_image_url.jpg";
          }
        })
      );

      const videoUrls = await Promise.all(
        videoUploadPromises.map(async (task) => {
          try {
            const downloadURL = await getDownloadURL(task.snapshot.ref);
            return downloadURL;
          } catch (error) {
            console.error("Error getting download URL for video:", error);
            return "default_video_url.mp4";
          }
        })
      );

      console.log("Image URLs:", imageUrls);
      console.log("Video URLs:", videoUrls);
      setUploadProgress(null);
      setUploadError(null);
      setFormData({ ...formData, images: imageUrls, videos: videoUrls });
      console.log("Upload completed successfully");
    } catch (error) {
      setUploadError("File upload failed");
      setUploadProgress(null);
      console.error("Error in handleUploadFiles:", error);
    }
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    try{
        const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if(!res.ok){
        if (data.error && data.error.includes("Post with this title already exists.")) {
          setPublishError("Post with this title already exists. Please choose a different title.");
        } else {
          setPublishError(data.message.toString());
        }
      }
      console.log("Response Data:", data);
      if (res.ok) {
        setPublishError(null);
        console.log("Navigating to:", `/post/${data.slug}`);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };
  
  

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create a post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            <option value="uncategorized">Select a category</option>
            <option value="currentAffairs">Current Affairs</option>
            <option value="socialActivity">Social Activity</option>
            <option value="sports">Sports</option>
            <option value="techRelate">Tech Relate</option>
          </Select>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-x-green-600 border-double hover:border-solid p-3">
        <FcCameraIdentification className="text-xl"/>
          <FileInput
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageFileChange}
          />
          <FcClapperboard className="text-xl"/>
          <FileInput
            type="file"
            accept="video/*"
            multiple
            onChange={handleVideoFileChange}
          />
          <Button
            type="button"
            gradientDuoTone="greenToBlue"
            size="sm"
            outline
            onClick={handleUploadFiles}
            disabled={uploadProgress !== null}
          >
            {uploadProgress !== null ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={uploadProgress}
                  text={`${Math.round(uploadProgress)}%`}
                />
              </div>
            ) : (
              <span>Upload</span>
            )}
          </Button>
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}

        {formData.images && formData.images.length > 0 && (
          <div className="flex gap-4">
            {formData.images.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`uploaded-image-${index}`}
                className="w-full h-72 object-cover"
              />
            ))}
          </div>
        )}

        {formData.videos && formData.videos.length > 0 && (
          <div className="flex gap-4">
            {formData.videos.map((videoUrl, index) => (
              <video key={index} controls className="w-full h-72 object-cover">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ))}
          </div>
        )}
        <ReactQuill
          theme="snow"
          placeholder="write something..."
          className="h-72 mb-12"
          required
          onChange={(value) => {
            setFormData({ ...formData, content: value });
          }}
        />
        <Button type="submit" gradientDuoTone="greenToBlue">
          Publish
        </Button>
        {publishError && (
          <Alert color="failure" className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
