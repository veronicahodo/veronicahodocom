import { useCallback, useEffect, useState } from "react";
import Header from "../widgets/Header";
import PageRoot from "./root/PageRoot";
import { Button, Modal } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import PageSignup from "./signup/PageSignup";
import PageLogin from "./login/PageLogin";
import PageLogout from "./logout/PageLogout";
import NavBar from "../widgets/NavBar";
import PageBlogPost from "./blog/post/PageBlogPost";
import PageBlog from "./blog/PageBlog";

interface PageProps {
    apiUrl: string;
    page: string;
    secure: boolean;
}

const PageContainer = ({ apiUrl, page, secure = false }: PageProps) => {
    const [showError, setShowError] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    const [errorLink, setErrorLink] = useState<string>("");
    const [errorStatus, setErrorStatus] = useState<number>(0);

    const processPage = (pageName: string) => {
        switch (pageName) {
            case "blog":
                return <PageBlog apiUrl={apiUrl} throwError={throwError} />;
            case "blog-post":
                return <PageBlogPost apiUrl={apiUrl} throwError={throwError} />;
            case "login":
                return <PageLogin apiUrl={apiUrl} throwError={throwError} />;
            case "logout":
                return <PageLogout />;
            case "root":
                return <PageRoot apiUrl={apiUrl} throwError={throwError} />;
            case "signup":
                return <PageSignup apiUrl={apiUrl} throwError={throwError} />;
            default:
                return <PageRoot apiUrl={apiUrl} throwError={throwError} />;
        }
    };

    const throwError = useCallback(
        (code: number, message: string, link: string) => {
            setError(message);
            setErrorLink(link);
            setErrorStatus(code);
            setShowError(true);
        },
        []
    );

    const checkToken = useCallback(() => {
        const token = localStorage.getItem("token");
        if (!token || token.length < 1) return false;
        try {
            if (jwtDecode(token).exp ?? 0 < Date.now()) return false;
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    }, []);

    useEffect(() => {
        if (secure && !checkToken)
            throwError(401, "Unauthorized, please log in again", "/login");
        if (localStorage.getItem("theme")) {
            document.documentElement.setAttribute(
                "data-theme",
                localStorage.getItem("theme") ?? "light"
            );
            document.documentElement.setAttribute(
                "data-bs-theme",
                localStorage.getItem("theme") ?? "light"
            );
        } else {
            document.documentElement.setAttribute("data-theme", "light");
        }
    }, [checkToken, secure, throwError]);

    return (
        <>
            <Header />
            <NavBar />
            <div className="pageContainer m-5">{processPage(page)}</div>
            <Modal show={showError}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorStatus} - {error}
                    {errorLink && (
                        <>
                            <br />
                            <a href={errorLink}>Go</a>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowError(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default PageContainer;
