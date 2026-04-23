import image from '../../assets/auth/signInImage2.png';
import Button from '../../components/auth/button.jsx';
import HeaderText from '../../components/auth/headerText.jsx';
import Input from '../../components/auth/inputText.jsx';
import PSMessage from '../../components/auth/psMessage.jsx';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { LucideShieldUser } from 'lucide-react';

const AdminSignInPage = () => {
    const { setErrorMessage, setToken } = useUser();
    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();

        const form = event.target;
        const password = form.password.value;

        if(password===null || password==='') {
            setErrorMessage("Password is required")
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            });

            const data = await response.json();

            if (response.ok) {
                console.log("TEST")
                localStorage.setItem("token", data.token);
                setToken(data.token);
                const username = jwtDecode(data.token).username;
                setErrorMessage(`Welcome, ${username}!`);
                navigate('/shop')
            } else {
                setErrorMessage(data.message || "Sign In failed");
            }
        } catch (err) {
            console.error("Sign in error:", err);
            setErrorMessage("Something went wrong");
        }
    };

    // const handleAdminSignIn = async () => {


    return(
        <>
            <div className=" flex h-screen bg-white flex-row w-full">
                <form onSubmit={handleSignIn} className='px-6 flex flex-col space-y-5 w-9/16 justify-center text-center'>
                    <div className='flex flex-row justify-center space-y-5 '>
                        <LucideShieldUser className='w-18 h-18 self-center text-primaryGreen'/>
                        <HeaderText text={"Admin"} size='text-7xl'/>
                    </div>
                    <Input type={"password"}  placeholder={"Password"} name={"password"}/>
                    
                    <Button text={"SIGN IN"} type={"submit"}/>
                
                    <PSMessage text={"Not an admin?"} clickable={"Sign in as user!"} route={'/signin'} />
                </form>
                
                <div className="w-7/16 pr-6 py-10 flex justify-center slide-in-right">
                    <img src={ image } className='w-full h-full object-cover rounded-4xl'/>
                </div>
            </div>
        </>
    );
}

export default AdminSignInPage;