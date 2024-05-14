import React from 'react';
import ReactDOM from 'react-dom/client';
import './output.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Tasks from "./pages/Tasks";
import MyProjects from "./pages/MyProjects";
import ProjectDetails from "./pages/ProjectDetails";
import NewProject from "./pages/NewProject";
import ProjectEditor from "./pages/ProjectEditor";
import Projects from "./pages/Projects";
import ProjectDetailsRestricted from "./pages/ProjectDetailsRestricted";
import FileHandling from "./pages/FileHandling";

const ChooseHomePage = () => {
    const isLoggedIn = localStorage.getItem('loginToken') !== null;
    return isLoggedIn ? <Tasks /> : <Home />;
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
                path: "/projects",
                element: <Projects />
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
                path: "/projects/:id",
                element: <ProjectDetailsRestricted />,
            },
            {
                path: "/my-projects/edit/:id",
                element: <ProjectEditor />,
            },
            {
                path: "/my-projects/new-project",
                element: <NewProject />,
            },
            {
                path: "/my-files",
                element: <FileHandling />,
            },
        ]
    }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div id="root" className="min-h-screen">
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
