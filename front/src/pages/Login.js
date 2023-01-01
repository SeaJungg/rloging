import React from "react";
import { Button, Segment, Icon, Image } from "semantic-ui-react";
import useSession from "../hooks/useSession";

function LoginPage() {
    const { onLogin } = useSession();

    return (
        <Segment
            id="home"
            textAlign="center"
            style={{
                minHeight: "100vh",
                maxWidth: "820px",
                margin: "0 auto",
            }}
        >
            <Image
                src={`${process.env.PUBLIC_URL}/logo/2WH.png`}
                style={{
                    margin: "0 auto",
                    paddingTop: "calc(40vh - 35%)",
                    width: "75%",
                }}
            />
            <Button
                color="yellow"
                size="huge"
                style={{ color: "black" }}
                onClick={onLogin}
            >
                <Icon name="facebook messenger" />
                카카오로 로그인하기
            </Button>
        </Segment>
    );
}

export default LoginPage;
