import { useState, useEffect } from "react";
import axios from "axios";

function useSession() {
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        setUserName(sessionStorage.getItem("userName"));
    }, []);

    const onLogin = () => {
        // oauth 요청 URL
        const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=282afdc3c17f8dd495cd16bc34138b34&redirect_uri=http://localhost:3000&response_type=code`
        window.location.href = kakaoURL

        let code = new URL(window.location.href).searchParams.get("code"); //얘가 쿼리스트링을 못가져오는듯

        // 백엔드 서버에 유저 정보 요청
        const userURL = `http://localhost:8000/kakao/code?code=${code}`;
        const user = axios.get(userURL);
        //return looks like : {"success":true,"code":200,"data":{"exists":false,"signup_data":{"oauth_id":2619836036,"email":"skeeper101@naver.com","age_range":"20~29","gender":"female"}}}
        if (user.data.success) {
            if (user.data.data.exists) {
                // 로그인
                sessionStorage.setItem("userName", user.data.data.userName);
                sessionStorage.setItem("token", user.data.data.token);
                window.location.href = process.env.PUBLIC_URL;
            } else {
                // 회원가입
                sessionStorage.setItem("token", user.data.data.token);
                window.location.href = `${process.env.PUBLIC_URL}/signup`;
            }
        }
    };

    const onLogout = () => {
        sessionStorage.clear();
        window.location.href = process.env.PUBLIC_URL;
    };

    return { userName, onLogin, onLogout };
}

export default useSession;
