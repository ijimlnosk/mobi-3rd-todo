export const setSessionToken = (token) => {
    return sessionStorage.setItem("accessToken", token);
};

export const getSessionToken = () => {
    return sessionStorage.getItem("accessToken");
};
