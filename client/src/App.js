import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { DataProvider } from "./DataContext";
import UserDashboard from "./UserDashboard";
import UserDetailsPage from "./UserDetailsPage";

const App = () => {
  return (
    <Router>
      <DataProvider>
        <Routes>
          <Route path="/" element={<UserDashboard />} />
          <Route path="/user/:id" element={<UserDetailsPage/>} />
        </Routes>
      </DataProvider>
    </Router>
  );
};

export default App;
