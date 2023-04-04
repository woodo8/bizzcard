
export const tokenMiddleware = (status: any, errorData: any,) => {
    if (status === 401 && errorData === "invalid signature" || errorData === "jwt expired" || errorData === "jwt malformed") {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.location.reload();
    }
}