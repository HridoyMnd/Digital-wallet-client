import App from "@/App";
import Home from "@/pages/Home";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import { createBrowserRouter } from "react-router";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                path: "/",
                Component: Home
            }
        ]
    }, 
    {
        path: "/login",
        Component: LoginPage
    },
    {
        path: "/register",
        Component: RegisterPage
    }
])