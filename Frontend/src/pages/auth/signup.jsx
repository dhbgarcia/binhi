import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import image from '../../assets/auth/signInImage.png';
import Button from '../../components/auth/button.jsx';
import HeaderText from '../../components/auth/headerText.jsx';
import Input from '../../components/auth/inputText.jsx';
import PSMessage from '../../components/auth/psMessage.jsx';
import SubheaderText from '../../components/auth/subheaderText.jsx';
import { useUser } from '../../context/UserContext.jsx';
import axios from 'axios';

const SignUpPage = () => {
    const { setErrorMessage, setToken, NotificationComponent } = useUser();
    const navigate = useNavigate();
    
    function valid(email) {
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(email);
    }
    
    const handleSignUp = async (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirmpassword.value;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const username = form.username.value;


        if(firstName===null || firstName==='') {
            setErrorMessage("First name is required")
            return;
        }

        if(lastName===null || lastName==='') {
            setErrorMessage("First name is required")
            return;
        }
        
        if(username===null || username==='') {
            setErrorMessage("First name is required")
            return;
        }

        if(email===null || email==='') {
            setErrorMessage("Email is required")
            return;
        }

        if(!valid(email)) {
            setErrorMessage("Email is not valid follow 'example@example.com' ")
            return;
        }

        if(password===null || password==='') {
            setErrorMessage("Password is required")
            return;
        }

        if(confirmPassword===null || confirmPassword==='') {
            setErrorMessage("Confirm password first")
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    username
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log(data.token)
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setErrorMessage(`Welcome, ${username}!`);
                navigate('/shop')
            } else {
                setErrorMessage(data.message || "Signup failed");
            }
        } catch (err) {
            console.error("Signup error:", err);
            setErrorMessage("Something went wrong");
        }
    };

    return(
        <>
            <div className=" flex h-screen bg-white flex-row">
                <div className="w-7/16 pl-6 py-10 flex justify-center slide-in-left">
                    <img src={ image } className='w-full object-cover rounded-2xl'/>
                </div>

                <form onSubmit={handleSignUp} className='flex flex-col space-y-3 w-9/16 justify-center text-center px-6'>
                    <HeaderText text={"Sign Up"}/>
                    <SubheaderText text={"Create your account. It's free and only takes a few minutes"}/>
                    
                        <div  className='flex flex-row gap-2'>
                            <Input type={"text"} placeholder={"First name"} name={"firstName"}/>
                            <Input type={"text"} placeholder={"Last name"} name={"lastName"}/>
                        </div>

                        <Input type={"text"} placeholder={"Username"} name={"username"}/>
                        <Input type={"text"} placeholder={"Email"} name={"email"}/>
                        <Input type={"password"} placeholder={"Password"} name={"password"}/>
                        <Input type={"password"}  placeholder={"Confirm Password"} name={"confirmpassword"}/>
    
                        <Button text={"SIGN UP"} type={"submit"}/>
                    
                    <PSMessage text={"Already have an account?"} clickable={"Sign in!"} route={"/signin"}/>
                </form>
                {/* <NotificationComponent /> */}
            </div>
        </>
    );
}

export default SignUpPage;