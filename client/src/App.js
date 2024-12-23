import { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [activities, setActivities] = useState([]);

  // Fetch activities from the backend
  /* Fetching the data from the backend and setting the state of activities to the data. */
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/activities`
      );
      const data = await result.json();
      setActivities(data);
    };
    fetchData();
  }, []);

  // Add activity function
  const addActivity = async (event) => {
    event.preventDefault();

    const newActivity = {
      name: event.target.activity.value,
      time: event.target.time.value,
    };

    await fetch(`${process.env.REACT_APP_BACKEND_URL}/activity`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    });

    event.target.activity.value = ""; // Clear input
    event.target.time.value = ""; // Clear input
    window.location.reload(); // Reload the page to reflect the new activity
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Productivity Tracker</h1>

        <form onSubmit={addActivity}>
          <div>
            <label htmlFor="activity">Activity</label>
            <input type="text" id="activity" name="activity" autoComplete="off" />
          </div>

          <div>
            <label htmlFor="time">Time Taken:</label>
            <input type="text" id="time" name="time" autoCapitalize="off" />
          </div>

          <button type="submit">Add</button>
        </form>
      </header>

      <main className="app-main">
        <h2>Today</h2>

        {activities && activities.length > 0 ? (
          <ol>
            {activities.map((activity) => (
              <li key={activity._id}>
                {activity.name} - {activity.time}
              </li>
            ))}
          </ol>
        ) : (
          <p>No activities yet</p>
        )}
      </main>
    </div>
  );
};

export default App;
