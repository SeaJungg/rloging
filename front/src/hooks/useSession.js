import { useState, useEffect } from "react";

function useSession() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    const onLogin = () => {
        // TODO: login callback logic
        sessionStorage.setItem("userName", "Tester");
        sessionStorage.setItem("sessionId", "test-id");
        window.location.href = process.env.PUBLIC_URL;
    };

    const onLogout = () => {
        sessionStorage.clear();
        window.location.href = process.env.PUBLIC_URL;
    };

    return { userName, onLogin, onLogout };
}

export default useSession;
