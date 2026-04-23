import { ArrowLeft, UserCircle2Icon, LayoutListIcon, LockKeyhole, LogOut } from "lucide-react"
import bg from "../../assets/user/orderNavBar.png"

const BackToDashboard=()=>{
    return(
        <>
            <div className="flex flex-row gap-2 text-sm items-center text-white" onClick={console.log("BVACK")}>
                <ArrowLeft/>
                <p> Back to Dashboard</p>
            </div>
        </>
    )
}

const Avatar = () => {
    return(
        <>
            <div className=" my-10 bg-primaryGreen rounded-full p-3 text-authInput">
                <div className="bg-white rounded-full">
                    <UserCircle2Icon className="w-full h-full"/>
                </div>
            </div>
        </>
    )
}

const OutlinedText=({text, size='xl', thick="2"})=>{
    return(
        <>
            <span className={`text-${size} text-white font-outline-${thick} text-center font-extrabold`}>
                {text}
            </span>
        </>
    )
}

const OrderNavBarButtons = ({icon, text, route})=>{
    return(
        <> 
            <div className="mt-5 flex gap-2 text-10 flex-row w-full pl-3 pr-2 py-4 rounded-3xl bg-mintGreen hover:bg-authInput text-white font-bold">
                {icon}
                {text}
            </div>
        </>
    )
}

const OrderNavBar = ()  => {

    return(
        <>
            <div className="w-1/4 h-full relative flex justify-center">
                <img src={bg} className="object-cover h-full w-full absolute"/>
                <div className="absolute p-9 flex flex-col ">  
                    <BackToDashboard />  
                    <Avatar/>         
                    <OutlinedText text={"Username"} size="2xl"/>       
                    <OutlinedText text={"@johndoe@gmail.com"} size="md" thick="1" />  
                    <OrderNavBarButtons icon={ <LayoutListIcon/> } text={"View Orders"}/>
                    <OrderNavBarButtons icon={ <LockKeyhole/> } text={"Change Password"}/>     
                    <OrderNavBarButtons icon={ <LogOut/> } text={"Sign out"}/>     

                </div>
            </div>
        </>
    )
}

export { OrderNavBar, OutlinedText }