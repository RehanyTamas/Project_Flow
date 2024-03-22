import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HomeLoggedIn from "./pages/HomeLoggedIn";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import NewProject from "./pages/NewProject";

const ChooseHomePage = () => {
    const isLoggedIn = localStorage.getItem('loginToken') !== null;
    return isLoggedIn ? <HomeLoggedIn /> : <Home />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element:<Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <ChooseHomePage />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/my-projects",
                element: <MyProjects />
            },
            {
                path: "/my-projects/:id",
                element: <ProjectDetails />,
            },
            {
                path: "/my-projects/new-project",
                element: <NewProject />,
            },
        ]
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
