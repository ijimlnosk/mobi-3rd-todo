import { useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import { getSessionToken } from "../auth/storageManager";
import RootLayout from "../../components/layout/layout";

const AdminRoute = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const sessionToken = getSessionToken();

    useEffect(() => {
        if (!sessionToken) {
            navigate("/signin");
        } else {
            if (location.pathname === "/signin") {
                navigate("/");
            }
        }
    }, [navigate, location.pathname, sessionToken]);

    return <RootLayout />;
};
export default AdminRoute;
