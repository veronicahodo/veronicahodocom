const PageLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
    return <></>;
};

export default PageLogout;
