import { Routes, Route } from "react-router-dom";

import './App.css';

import HomePage from './components/HomePage/HomePage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import LoginForm from "./components/LoginForm/LoginForm";
import RegisterForm from "./components/RegisterForm/RegisterForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/home" element={<h1>Home Page Content</h1>} />
        <Route path="/about" element={<h1>About Page Content</h1>} />
        <Route path="/contact" element={<h1>Contact Page Content</h1>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/register" element={<RegisterForm/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </>
  )
}

export default App
