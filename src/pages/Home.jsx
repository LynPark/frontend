import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/api/users");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    if (window.confirm("fr?")) {
      await axios.delete(`http://localhost:8080/api/users/${id}`);
      loadUsers();
    }
  };
  return (
    <div className="container">
      <table className="table border shadow my-4 text-center">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">UserName</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>
                <Link
                  to={`/viewuser/${user.id}`}
                  className="btn mx-2 btn-outline-secondary"
                >
                  View
                </Link>
                <Link
                  to={`/edituser/${user.id}`}
                  className="btn mx-2 btn-outline-warning"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="btn mx-2 btn-outline-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr></tr>
        </tbody>
      </table>
    </div>
  );
}

export default Home;
