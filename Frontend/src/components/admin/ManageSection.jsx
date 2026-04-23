import UserCard from "./UserCard";
import {  useState, useEffect } from "react";

const ManageSection = () => {
     const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users from your backend API
    fetch('http://localhost:3000/api/user?userType=User')
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

const handleDelete = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/user/delete/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsers((prev) => prev.filter((user) => user._id !== id));
    } else {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const error = await response.json();
        console.error("Delete failed:", error.message);
      } else {
        const text = await response.text();
        console.error("Delete failed. Server returned:", text);
      }
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

  return (
   <div className="flex-1 bg-gray-200 p-6 m-4 rounded-4xl shadow-md h-[90vh] max-h-[90vh] overflow-y-auto">
  {/* Header */}
  <div className="pt-8">
    <div className="flex items-center justify-between">
      <p className="text-4xl font-bold text-emerald-900">Users</p>  
      <p className="text-xl font-semibold text-emerald-900 relative top-[10px]">Total Users: {users.length}</p>
    </div>

    <div className="bg-emerald-900 h-0.5 w-full my-4 rounded"></div>
  </div>

  {/* Scrollable Cards Section */}
  <div className="space-y-4">
        {users.map((user) => (
          <UserCard key={user._id} user={user} onDelete={handleDelete}  />
        ))}
      </div>
</div>
  );
};

export default ManageSection;
