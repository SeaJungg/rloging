import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
    Button,
    Header,
    Container,
    Icon,
    Menu,
    Segment,
    Sidebar,
} from "semantic-ui-react";

class MainSidebar extends Component {
    state = {};

    handleSidebarHide = () => this.setState({ sidebarOpened: false });

    handleToggle = () => this.setState({ sidebarOpened: true });

    render() {
        const { children } = this.props;
        const { sidebarOpened } = this.state;

        return (
            <Sidebar.Pushable>
                <Sidebar
                    as={Menu}
                    animation="overlay"
                    inverted
                    onHide={this.handleSidebarHide}
                    vertical
                    visible={sidebarOpened}
                >
                    <Menu.Item as="a" active>
                        Home
                    </Menu.Item>
                    <Menu.Item as="a">Log in</Menu.Item>
                    <Menu.Item as="a">Sign Up</Menu.Item>
                </Sidebar>

                <Sidebar.Pusher dimmed={sidebarOpened}>
                    <Segment
                        id="home"
                        inverted
                        textAlign="center"
                        style={{
                            minHeight: "100vh",
                            maxWidth: "820px",
                            margin: "0 auto",
                        }}
                        vertical
                    >
                        <Container>
                            <Menu inverted pointing secondary size="large">
                                <Menu.Item onClick={this.handleToggle}>
                                    <Icon name="sidebar" />
                                </Menu.Item>
                                <Menu.Item position="right">
                                    <div>Hello Yujin</div>
                                </Menu.Item>
                            </Menu>
                        </Container>
                        {children}
                    </Segment>
                </Sidebar.Pusher>
            </Sidebar.Pushable>
        );
    }
}

const Homepage = () => (
    <MainSidebar>
        <Container>
            <Header
                as="h1"
                inverted
                style={{
                    fontSize: "4em",
                    fontWeight: "bolder",
                    fontStyle: "italic",
                    marginBottom: 0,
                    marginTop: "3em",
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
            <Link to="/login">
                <Button color="orange" size="huge">
                    Login
                    <Icon name="right arrow" />
                </Button>
            </Link>
        </Container>
    </MainSidebar>
);

export default Homepage;
