import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../util/APIUtils";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response);
      } catch (error) {
        alert("Oops! Something went wrong.", { type: "error" });
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="home-container">
      <div className="container">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-black-200 dark:text-black-200">
            <thead className="text-xs text-white-300 uppercase bg-white-800 dark:bg-white-800 dark:text-black-800">
              <tr>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr
                  key={user.id}
                  className="bg-white-700  dark:bg-white-800"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-800 whitespace-nowrap dark:text-black"
                  >
                    {user.name}
                  </th>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Users;
