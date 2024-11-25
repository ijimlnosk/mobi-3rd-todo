import { createBrowserRouter } from "react-router-dom";

import Todo from "../../page/todo";
import Signin from "../../page/signin";
import Signup from "../../page/signup";
import AdminRoute from "./adminRouter";

const ADMIN_ROUTER = {
    element: <AdminRoute />,
    children: [
        {
            path: "/",
            element: <Todo />,
        },
    ],
};

const PUBLIC_ROUTER = [
    {
        path: "/signin",
        element: <Signin />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
];

const router = createBrowserRouter([
    {
        children: [...PUBLIC_ROUTER, ADMIN_ROUTER],
    },
]);
export default router;
