import React from "react";
import { Button, Header, Segment, Icon } from "semantic-ui-react";
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
            <Header
                as="h1"
                inverted
                style={{
                    fontSize: "4em",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    marginBottom: 0,
                    paddingTop: "4em",
                }}
            >
                <span style={{ color: "#f2711c" }}>R</span>LOG
            </Header>
            <Header
                as="h2"
                content="RUN Every Thu. 8PM"
                inverted
                style={{
                    fontSize: "1.5em",
                    fontWeight: "normal",
                    marginTop: "0.5em",
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
