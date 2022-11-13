import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";

function LoginForm() {
    return (
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Column style={{ maxWidth: 450 }}>
                <Segment style={{ width: "90%", margin: "0 auto" }}>
                    <Header as="h2" color="orange" textAlign="center">
                        Log-in to your account
                    </Header>
                    <Form size="large">
                        <Form.Input
                            fluid
                            icon="user"
                            iconPosition="left"
                            placeholder="이름+전화번호뒤4자리"
                        />
                        <Form.Input
                            fluid
                            icon="lock"
                            iconPosition="left"
                            placeholder="비밀번호"
                            type="password"
                        />

                        <Button color="orange" fluid size="large">
                            Login
                        </Button>
                    </Form>
                    <a href="/signup">
                        <Button
                            fluid
                            size="large"
                            style={{ marginTop: "10px" }}
                        >
                            Sign Up
                        </Button>
                    </a>
                </Segment>
            </Grid.Column>
        </Grid>
    );
}

export default LoginForm;
