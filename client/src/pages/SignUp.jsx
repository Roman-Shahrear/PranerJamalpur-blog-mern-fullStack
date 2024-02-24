import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import OAuth from "../components/OAuth";
import pranerjamalpur from '../images/pranerjamalpur.svg';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    if(!formData.username || !formData.email || !formData.password){
      return setErrorMessage("Please fill out all fields");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(data.success === false){
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  }


  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
          {/* left-side*/}
      <div className="flex-1">
      <Link to="/" className="font-bold dark:text-white text-3xl">
            <span>
              <img className="px-1 py-1 rounded-full border-2 border-green-400" src={pranerjamalpur} alt="pranerjamalpur" />
            </span>
            
        </Link>
        <p className="text-sm mt-5">This is a first Blog web application which from Praner Jamalpur group or Praner Jamalpur page.Now we are exist at web application also, It is one of the popular media of Jamalpur. We want to all the news to give at first in Praner Jamalpur . So, let to Praner Jamalpur helped for move forward as a true and fair media. Be connect with us also as a Blog member using through with your email and password or with your Google Account.</p>
        
      </div>
       {/* right-side*/}

       <div className="flex-1">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <Label value="Your username" />
            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange}/>
          </div>
          <div>
            <Label value="Your email" />
            <TextInput type="email" placeholder="example@gmail.com" id="email" onChange={handleChange} />
          </div>
          <div>
            <Label value="Your password" />
            <TextInput type="password" placeholder="password" id="password" onChange={handleChange} />
          </div>
          <Button gradientDuoTone="greenToBlue" type="submit" disabled={loading}>
            {
              loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : "Sign Up"
            }
          </Button>
          <OAuth />
        </form>
        <div className="flex gap-2 text-sm mt-5">
          <span>Have an account?</span>
          <Link to="/sign-in" className="text-green-500 font-bold">
            Sign In
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
