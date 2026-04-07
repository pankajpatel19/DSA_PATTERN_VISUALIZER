import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import PatternRouter from "./components/PatternRouter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default to Binary Search */}
          <Route index element={<Navigate to="/pattern/binary-search" replace />} />
          <Route path="pattern/:patternId" element={<PatternRouter />} />
        </Route>
        
        {/* Wildcard 404 handler */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
