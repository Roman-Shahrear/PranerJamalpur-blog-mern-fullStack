import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: [{
        type: String,
        default: "https://venngage-wordpress.s3.amazonaws.com/uploads/2020/10/Anatomy-of-the-Perfect-Blog-Post.png",
    }],
    video: [{
        type: String,
    }],
    category: {
        type: String,
        default: "uncategorized",
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },
    likes: [{
        userId: {
            type: String,
        },
    }],
    loves: [{
        userId: {
            type: String,
        },
    }],
    numberOfLikes: {
        type: Number,
        default: 0,
    },
    numberOfLoves: {
        type: Number,
        default: 0,
    },
},{ timestamps: true}
);


const Post = mongoose.model('Post', postSchema);

export default Post;