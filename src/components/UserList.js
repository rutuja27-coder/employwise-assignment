// src/components/UserList.js
import React, { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import { Link } from "react-router-dom";

function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const loadUsers = async () => {
    try {
      const res = await fetchUsers(page);
      setUsers(res.data.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      loadUsers();
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.first_name.toLowerCase().includes(search.toLowerCase()) ||
      user.last_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h2>User List</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredUsers.map((user) => (
          <div key={user.id} className="col-md-4">
            <div className="card">
              <img src={user.avatar} className="card-img-top" alt="avatar" />
              <div className="card-body">
                <h5>{user.first_name} {user.last_name}</h5>
                <p>Email: {user.email}</p>
                <Link to={`/edit/${user.id}`} className="btn btn-warning me-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button
          className="btn btn-primary me-2"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className="btn btn-primary" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default UserList;
