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
        window.location.href = "/";
    };

    const onLogout = () => {
        sessionStorage.clear();
        window.location.href = "/";
    };

    return { userName, onLogin, onLogout };
}

export default useSession;
