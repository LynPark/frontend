import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function EditUser() {
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

  //"/user/:id" 의 값이 "/user/123" 이면 id의 값으로 123을 받음
  const { id } = useParams();
  //유저 데이터를 가져오는 메서드
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/api/users/${id}`);
    setUser(result.data);
  };
  //페이지 시작 시 유저 데이터를 받아 user에 저장
  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/users/${id}`, user);
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Edit User</h2>
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
                defaultValue={name}
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
                defaultValue={username}
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
                defaultValue={email}
              />
            </div>
            <div className="mb-3 text-center">
              <button
                type="submit"
                className="btn btn-outline-primary px-3 mx-2"
              >
                Save
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

export default EditUser;
