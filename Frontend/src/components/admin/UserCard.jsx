
import { UserCircle, UserCircle2 } from "lucide-react"
const UserCard = ({user,  onDelete }) => {


return (
  <div className="w-full my-4 rounded overflow-hidden">
    {/* Top Bar with Delete Button */}
    <div className="bg-emerald-900 h-10 w-full flex items-center px-4">
      <div
        className="bg-red-500 h-8 px-4 rounded-full flex items-center justify-center ml-auto cursor-pointer hover:bg-red-600"
         onClick={() => onDelete(user._id)}
      >
        <p className="text-white text-xs font-bold">DELETE</p>
      </div>
    </div>

    {/* White Section with Centered Circle */}
    <div className="bg-white h-50 w-full flex items-center  ">
      <div className="bg-emerald-900 w-36 h-36 rounded-full flex m-10">
         <UserCircle className="text-yellow-400 w-36 h-36" /> 
         
      </div>
      <div >
            <p>{user.username}</p>
            <p>{user.email}</p>

         </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-emerald-900 h-10 w-full"></div>
  </div>
);
}

export default UserCard
