import { createContext, useContext, useEffect, useRef, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import { XCircle } from 'lucide-react';

const UserContext = createContext();

const useUser  =  ()  =>  useContext(UserContext);

const UserProvider =  ({children})  =>  {
    const [token, setToken] = useState(() => localStorage.getItem('token') || '');
    const [decodedToken, setDecodedToken] = useState(() => {
        try {
            return token ? jwtDecode(token) : null;
        } catch (err) { 
            return null;
        }
    });

    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [userType, setUserType] = useState('');
    const [userId, setUserId] = useState('');

    const [errorMessage, setErrorMessage] = useState('');
    const [centerMessage, setCenterMessage] = useState('');
    const [showCenterNotification, setShowCenterNotification] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const timeoutRef = useRef(null);
    const timeoutRef2 = useRef(null);

    const [isTokenSet, setisTokenSet] = useState(false);

    const isTokenValid = () => {
        try {
            const { exp } = jwtDecode(token);
            return Date.now() < exp * 1000;
        } catch (err) {
            return false;
        }
    }

    useEffect (() => {
        if(token && isTokenValid()){
            setUserType(decodedToken.userType);
            if(decodedToken.userType == "User"){
                setUsername(decodedToken.username);
                setFirstName(decodedToken.firstName);
                setLastName(decodedToken.lastName);
                setEmail(decodedToken.email);         
                setUserId(decodedToken.id);
            } else {
                setUserType('');
                setUsername('');
                setFirstName('');
                setUserId('');
                setLastName('');
                setEmail('');
            }
            setisTokenSet(true);
        } else {
            setUserType('');
            setUsername('');
            setFirstName('');
            setLastName('');
            setEmail('');
            setUserId('');
        }
    }, [decodedToken]);

    const closeNotification = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setErrorMessage('');
        setShowCenterNotification(false);
    };

    useEffect (() => {
        if(centerMessage==null || centerMessage==''){
            setShowCenterNotification(false);
        }
        else{
            setShowCenterNotification(true);

            if (timeoutRef2.current) {
                clearTimeout(timeoutRef2.current);
            }

            timeoutRef.current = setTimeout(() => {
                setCenterMessage('');
                setShowCenterNotification(false);
                timeoutRef2.current = null;
            }, 5000);
        }
    }, [centerMessage])


    const NotificationComponent = () => {
        return showNotification ? (
            <div className="flex flex-row gap-3 absolute bottom-[2%] left-[2%] p-5 text-primaryGreen slide-in-left  rounded-xl bg-primaryYellow">
                {errorMessage} <div className="cursor-pointer"><XCircle onClick={()=>{
                    setErrorMessage('');
                    closeNotification();
                }} /></div>
            </div>
        ) : null;
    }

    const closeCenterNotification = () => {
        if (timeoutRef2.current) {
            clearTimeout(timeoutRef2.current);
            timeoutRef2.current = null;
        }
        setCenterMessage('');
        setShowCenterNotification(false);
    };

    useEffect (() => {
        if(errorMessage==null || errorMessage==''){
            setShowNotification(false);
        }
        else{
            setShowNotification(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                setErrorMessage('');
                setShowNotification(false);
                timeoutRef.current = null;
            }, 5000);
        }
    }, [errorMessage])


    const CenterNotificationComponent = () => {

        return showCenterNotification ? (
            <div className="z-1000 flex flex-row absolute bottom-[5%] w-1/2 p-5 self-center text-center justify-center slide-in-bottom left-1/4 text-primaryGreen rounded-xl bg-primaryYellow">
                {centerMessage} <div className="cursor-pointer">
                    {/* <XCircle onClick={()=>{
                    setCenterMessage('');
                    closeCenterNotification();
                }} /> */}
                </div>
            </div>
        ) : null;
    }
    
    return (
        <UserContext.Provider value={{ 
            token, 
            setToken, 
            isTokenValid, 
            username, 
            firstName, 
            lastName, 
            email, 
            userType, 
            userId, 
            NotificationComponent, 
            showNotification, 
            setShowNotification, 
            setErrorMessage, 
            isTokenSet,
            setCenterMessage,
            CenterNotificationComponent,
            showCenterNotification,
            setShowCenterNotification,
            setDecodedToken,
            }}>
            {children}
        </UserContext.Provider>
    );
}

export {useUser, UserProvider}