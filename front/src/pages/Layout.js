import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Menu, Segment, Sidebar, Icon } from "semantic-ui-react";
import useSession from "../hooks/useSession";

function Layout({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const { userName, onLogout } = useSession();

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
                <Menu.Item as={Link} to="/">
                    Home
                </Menu.Item>
                <Menu.Item as={Link} to="/session/register">
                    Create Session
                </Menu.Item>
                <Menu.Item onClick={onLogout}>Logout</Menu.Item>
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
                                <div>Hello {userName}</div>
                            </Menu.Item>
                        </Menu>
                    </Container>
                    <div style={{ maxWidth: "90%", margin: "2em auto" }}>
                        {children}
                    </div>
                </Segment>
            </Sidebar.Pusher>
        </Sidebar.Pushable>
    );
}

export default Layout;
