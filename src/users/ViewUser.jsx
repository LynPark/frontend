import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ViewUser() {
  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, []);

  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/${id}`);
    setUser(result.data);
  };

  const { name, username, email } = user;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">User Info</h2>

          <div className="card">
            <div className="card-header">
              UserID : {id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: {name}</b>
                </li>
                <li className="list-group-item">
                  <b>UserName: {username}</b>
                </li>
                <li className="list-group-item">
                  <b>Email: {email}</b>
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/"}>
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewUser;
