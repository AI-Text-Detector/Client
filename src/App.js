import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import TeachersStudents from './pages/TeachersStudents';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/ai-detector-for-teachers-students-free" element={<TeachersStudents />} />
    </Routes>
  );
};

export default App;
