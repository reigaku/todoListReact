import React, { useContext } from 'react';
import '../components/styles/app.css';
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import About from "../pages/About"
import PostIdPage from "../pages/PostIdPage"
import Posts from '../pages/Posts'
import Login from "../pages/Login"
import Error from '../pages/Error';
import Loader from './UI/Loader/Loader';
// import {publicRoutes, privateRoutes } from './router';
import { AuthContext } from '../context';


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext)
    console.log(isAuth)

    if (isLoading) {
        return <Loader/>
    }
    return (
        isAuth
            ?
            
            <Routes>
                {/* {privateRoutes.map(route =>
                    <Route
                        component={route.component}
                        path={route.path}
                        exact={route.exact}
                        key={route.path}
                    />
                )} */}
                <Route path='/about' element={<About/>} />
                <Route path='/posts' element={<Posts/>} />
                <Route path='/posts/:id' element={<PostIdPage/>} />
                <Route path="/" element= {<Navigate to="/about" />} />
                <Route path='/*' element={<Error/>} />
            </Routes>
            :
            <Routes>
                {/* {publicRoutes.map(route =>
                    // <Route
                    //     component={route.component}
                    //     path={route.path}
                    //     exact={route.exact}
                    //     key={route.path}
                    // />
                    
                )} */}
                <Route path='/login' element={<Login/>} />
                <Route path="/" element= {<Navigate to="/login" />} />
                <Route path='/*' element={<Login/>} />
            </Routes>

    );
};

export default AppRouter;