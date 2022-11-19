import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Segment, Sidebar, Icon } from "semantic-ui-react";

function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Sidebar.Pushable>
            <Sidebar
                as={Menu}
                animation="overlay"
                inverted
                onHide={() => setIsOpen(false)}
                vertical
                visible={isOpen}
            >
                <Link to="/home">
                    <Menu.Item>Home</Menu.Item>
                </Link>
                <Link to="/home">
                    <Menu.Item>Create Session</Menu.Item>
                </Link>
                <Menu.Item>Logout</Menu.Item>
            </Sidebar>

            <Sidebar.Pusher dimmed={isOpen}>
                <Segment
                    id="home"
                    inverted
                    style={{
                        minHeight: "100vh",
                        maxWidth: "820px",
                        margin: "0 auto",
                    }}
                    vertical
                >
                    <Container>
                        <Menu inverted pointing secondary size="large">
                            <Menu.Item onClick={() => setIsOpen(true)}>
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

export default Layout;
