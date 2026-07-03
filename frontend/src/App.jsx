import { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editId, setEditId] = useState(null);

  // Read Users
  const loadUsers = async () => {
    const response = await fetch("http://127.0.0.1:5000/users");
    const data = await response.json();
    setUsers(data);
  };

  // Create User
  const saveUser = async () => {
    if (editId === null) {
      // Add New User
      await fetch("http://127.0.0.1:5000/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
        }),
      });
    } else {
      // Update Existing User
      await fetch(`http://127.0.0.1:5000/update/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          age,
        }),
      });

      setEditId(null);
    }

    setName("");
    setAge("");

    loadUsers();
  };

  // Delete User
  const deleteUser = async (id) => {
    await fetch(`http://127.0.0.1:5000/delete/${id}`, {
      method: "DELETE",
    });

    loadUsers();
  };

  const editUser = (user) => {
    setEditId(user.id);
    setName(user.name);
    setAge(user.age);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h1>User Management System</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Enter Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <br />
      <br />

      <button onClick={saveUser}>
  {editId === null ? "Save" : "Update"}
</button>

      <br />
      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>

              <td>
                <button onClick={() => editUser(user)}>Edit</button>

                <button
                  style={{ marginLeft: "10px" }}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
