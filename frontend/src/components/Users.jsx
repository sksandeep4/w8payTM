import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/user/bulk?filter=${searchQuery}`
        );
        setUserList(response.data.users);
        console.log(response.data.users);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [searchQuery]);

  return (
    <div className="ml-4">
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users"
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
        {searchQuery}
      </div>
      <div>
        {userList.map((user) => (
          <User user={user} />
        ))}
      </div>
    </div>
  );
};

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center my-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user?.firstName[0]}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full">
          <div>
            {user?.firstName} {user?.lastName}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center h-full mr-4">
        <Button
          label={"Send Money"}
          onClick={(e) => {
            navigate("/send?id=" + user.id + "&name=" + user.firstName);
          }}
        />
      </div>
    </div>
  );
};
