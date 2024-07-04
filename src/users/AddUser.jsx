import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
  });

  //유저객체 안의 변수를 구조분해
  const { name, username, email } = user;

  const onInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/users", user);
    navigate("/"); //홈으로
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Register</h2>
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder="Enter name"
                name="name"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                UserName
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Enter username"
                name="username"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="text"
                id="email"
                className="form-control"
                placeholder="Enter email"
                name="email"
                onChange={onInputChange}
              />
            </div>
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                Register
              </button>
              <Link to="/" className="btn btn-outline-danger px-3 mx-2">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddUser;

/*
[]대괄호 사용 이유 => 객체안에 변수로 키값을 넣기 위함

const name = 'myKey';
const object = {
  [name] : 'value'
};

//결과 값
{
  'myKey' : 'value'
}
*/
