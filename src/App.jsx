import React, { useState, useEffect } from "react";

function App() {
  // State to store API data
  const [users, setUsers] = useState([]);

  // Fetch data function
  const fetchUsers = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={8}&lon={lon}&exclude={part}&appid={f1c4ce8dc052cb6cf9dc9de9c185692c}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  // useEffect runs when component loads
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>User List</h1>

      {users.map((user) => (
        <div key={user.id} style={{ border: "1px solid gray", margin: "10px", padding: "10px" }}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
          <p>{user.city}</p>
        </div>
      ))}
    </div>
  );
}

export default App;