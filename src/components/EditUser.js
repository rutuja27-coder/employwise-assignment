// src/components/EditUser.js
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser, fetchUsers } from "../services/api";

function EditUser() {
  const { id } = useParams();
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetchUsers(1);
      const userData = res.data.data.find((u) => u.id === parseInt(id));
      if (userData) setUser(userData);
    };
    loadUser();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateUser(id, user);
    navigate("/users");
  };

  return (
    <div className="container">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label>First Name</label>
          <input
            type="text"
            className="form-control"
            value={user.first_name}
            onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Last Name</label>
          <input
            type="text"
            className="form-control"
            value={user.last_name}
            onChange={(e) => setUser({ ...user, last_name: e.target.value })}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditUser;
