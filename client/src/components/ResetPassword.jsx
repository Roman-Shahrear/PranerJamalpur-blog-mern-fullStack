import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import pranerjamalpur from "../images/pranerJamalpur.png";
import {
  setPasswordStart,
  setPasswordFailure,
  setPasswordSuccess,
} from "../redux/user/userSlice";
export default function ResetPassword() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error: errorMessage, successMessage } = useSelector(
    (state) => state.user
  );
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);
  
  const handlePasswordChange = ({ target }) => {
    setFormData({ ...formData, [target.id]: target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.password || isButtonDisabled) {
      return dispatch(setPasswordFailure("Please enter your Password."));
    }
    try {
      dispatch(setPasswordStart());
      setButtonDisabled(true);
      const token = new URLSearchParams(window.location.search).get('token');
      const response = await fetch(`/api/auth/resetpassword/${token}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: formData.password }),
      });

      if (response.ok) {
        dispatch(setPasswordSuccess("Password reset successfully."));
        setSuccessVisible(true);

        setTimeout(() => {
          setSuccessVisible(false);
          navigate("/");
        }, 5000);
      }else {
        const data = await response.json();
        dispatch(setPasswordFailure(data.message));
      }
    } catch (error) {
      dispatch(setPasswordFailure(error.message));
    }finally{
      setButtonDisabled(false);
    }
  };

  return (
    <div className="min-h-96 mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-">
        <div className="flex-1 font-bold text-3xl">
          <img
            className="px-1 py-1 rounded-full border-2 border-green-400 dark:bg-white"
            src={pranerjamalpur}
            alt="pranerjamalpur"
          />
        </div>
        <div className="flex-1 dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-5">
            Below give your associate email for reset your Password
          </h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="*************"
                id="password"
                onChange={handlePasswordChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? (
                <>
                  <span className="pl-3">Updating...</span>
                </>
              ) : (
                "Update Password"
              )}
            </Button>
            {errorMessage && (
              <Alert className="mt-5" color="failure">
                {errorMessage}
              </Alert>
            )}
            {isSuccessVisible && (
              <Alert className="mt-5" color="success">
                {successMessage}
              </Alert>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
