import React from 'react';
import { useContext } from 'react';
import { BrowserRouter, Link, Route, Routes, } from "react-router-dom";
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext)
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth')
    }
    return (
        <div className="navbar">
            <MyButton onClick={() => setIsAuth(false)}>Выйти</MyButton>
            <div className="navbar__links">
                <Link to="/about">О сайте</Link>
                <Link to="/posts">Список постов</Link>
            </div>
      </div>
    );
};

export default Navbar;