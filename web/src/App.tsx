import { BrowserRouter, Route, Routes } from "react-router";
import PageContainer from "./pages/PageContainer";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
    const createRoute = (
        route: string,
        page: string,
        secure: boolean = false
    ) => {
        return (
            <Route
                path={route}
                element={
                    <PageContainer
                        apiUrl={apiUrl}
                        page={page}
                        secure={secure}
                    />
                }
            />
        );
    };

    return (
        <>
            <BrowserRouter>
                <Routes>
                    {createRoute("/", "root")}
                    {createRoute("/blog/post", "blog-post", true)}
                    {createRoute("/blog/:post", "blog")}
                    {createRoute("/blog", "blog")}
                    {createRoute("/contact", "contact")}
                    {createRoute("/login", "login")}
                    {createRoute("/logout", "logout")}
                    {createRoute("/signup", "signup")}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
