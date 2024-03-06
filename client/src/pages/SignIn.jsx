import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInFailure, signInSuccess } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";
import pranerjamalpur from '../images/pranerjamalpur.svg';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  //For Input set Data by auth
  const handleChange = (e) =>{
    //initialize Formdata useState
    setFormData({...formData, [e.target.id]: e.target.value.trim()});
  }
  console.log(formData);
  
  //For auth submit form
  const handleSubmit = async(e)=>{
    //for when i submit that time does'nt take refresh that page
    e.preventDefault();
    if(!formData.email || !formData.password){
      return dispatch(signInFailure("Please fill out all fields"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailure(data.message));
      }
      if(res.ok){
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }


  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left-side*/}
      <div className="flex-1">
      <Link to="/" className="font-bold dark:text-white text-3xl">
            <span>
              <img className="px-1 py-1 rounded-full border-2 border-green-400 dark:bg-white" src={pranerjamalpur} alt="pranerjamalpur" />
            </span>
        </Link>
        <p className="text-sm mt-5">This is a first Blog web application which from Praner Jamalpur group or Praner Jamalpur page.Now we are exist at web application also, It is one of the popular media of Jamalpur. We want to all the news to give at first in Praner Jamalpur . So, let to Praner Jamalpur helped for move forward as a true and fair media. Be connect with us also as a Blog member using through with your email and password or with your Google Account.</p>
      </div>
       {/* right-side*/}

       <div className="flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your email" />
            <TextInput type="email" placeholder="example@gmail.com" id="email" onChange={handleChange} />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput type="password" placeholder="***********" id="password" onChange={handleChange} />
          </div>
          <Button gradientDuoTone="greenToBlue" type="submit" disabled={loading}>
            {
              loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : "Sign In"
            }
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Don't have an account?</span>
          <Link to="/sign-up" className="text-green-500 font-bold">
            Sign Up
          </Link>
          <Link to="/forgot-password" className="text-red-500 font-bold pl-1 ml-12 text-xs">
            Forgot Password
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )
        }
       </div>
      </div>
    </div>
  )
}
