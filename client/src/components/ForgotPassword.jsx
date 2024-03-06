import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import {
  forgotPasswordStart,
  forgotPasswordFailure,
  forgotPasswordSuccess,
} from "../redux/user/userSlice";
import pranerjamalpur from "../images/pranerJamalpur.png";

export default function ForgotPassword() {
  const [formData, setFormData] = useState({});
  const { error: errorMessage, successMessage } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [isSuccessVisible, setSuccessVisible] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email || isButtonDisabled) {
      return dispatch(forgotPasswordFailure("Please enter your email."));
    }

    try {
      dispatch(forgotPasswordStart());
      setButtonDisabled(true);

      const res = await fetch("/api/auth/forgotpassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (res.ok) {
        dispatch(forgotPasswordSuccess("Password reset link sent successfully."));
        setSuccessVisible(true);

        setTimeout(() => {
          setSuccessVisible(false);
        }, 5000);
      } else {
        const data = await res.json();
        dispatch(forgotPasswordFailure(data.message));
      }
    } catch (error) {
      dispatch(forgotPasswordFailure(error.message));
    } finally {
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
          <form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
            <div>
              <Label value="Your email" />
              <TextInput
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone="greenToBlue"
              type="submit"
              disabled={isButtonDisabled}
            >
              {isButtonDisabled ? (
                <>
                  <span className="pl-3">Sending...</span>
                </>
              ) : (
                "Send Email"
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
