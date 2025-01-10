import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Categories />} />
        </Routes>
      </Router>
  )
}

export default App;
