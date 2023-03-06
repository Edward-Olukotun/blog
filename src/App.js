import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Createpost from './pages/Createpost';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase-config';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/login"
    })
  }

  return (
    <Router>
      <nav className='flex justify-evenly font-bold bg-teal-600 text-white'>
        <Link to="/">Home</Link>
        {!isAuth ? <Link to="/login">Login</Link> : <>
          <Link to="/createpost">Create Post</Link>
          <button onClick={signUserOut}>SignOut</button></>}
      </nav>
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth} />} ></Route>
        <Route path='/createpost' element={<Createpost isAuth={isAuth} />} ></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
