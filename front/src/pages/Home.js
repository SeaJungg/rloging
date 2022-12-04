import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Segment, List } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";
import { getDateString } from "../utils";
import Layout from "./Layout";
import config from "../config";

const defaultImg = `${process.env.PUBLIC_URL}/background.jpeg`;

const SessionCards = ({ sessions = [] }) => (
    <Card.Group>
        {sessions.map((session) => (
            <Card
                as={Link}
                to={"/session/" + session.session_id}
                key={session.session_id}
                style={{ margin: "1em 0" }}
                fluid
            >
                <Image
                    wrapped
                    ui={false}
                    src={defaultImg}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        height: "40vw",
                        maxHeight: "40vh",
                        overflow: "hidden",
                    }}
                />
                <Card.Content>
                    <Card.Header>{session.name}</Card.Header>
                    <Card.Description>
                        {getDateString(session.launch_date)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Icon name="user" />
                    {session.member_id}
                    <Icon name="money" style={{ marginLeft: "10px" }} />
                    {session.application_fee}
                </Card.Content>
            </Card>
        ))}
    </Card.Group>
);

const SessionList = ({ sessions = [] }) => (
    <Segment>
        <List divided verticalAlign="middle">
            {sessions.map((session) => (
                <List.Item
                    as={Link}
                    to={"/session/" + session.session_id}
                    key={session.session_id}
                >
                    <Image
                        floated="left"
                        size="small"
                        src={defaultImg}
                        style={{
                            height: "100px",
                            objectFit: "cover",
                        }}
                    />
                    <List.Content>
                        <List.Header as="h3">{session.name}</List.Header>
                        <List.Description extra style={{ color: "grey" }}>
                            <div>{getDateString(session.launch_date)}</div>
                            <div>{session.member_id}</div>
                        </List.Description>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    </Segment>
);

function Home() {
    const [sessionList, setSessionList] = useState([]);
    const [finishedList, setFinishedList] = useState([]);

    const fetchSessionList = async () => {
        // TODO: modify json format query
        const res = await axios.get(`${config.endpoint}/session/?format=json`);

        const currentDate = new Date();
        const upcoming = [];
        const finished = [];

        res.data.forEach((session) => {
            session.upcoming = currentDate <= new Date(session.launch_date);
            session.upcoming ? upcoming.push(session) : finished.push(session);
        });

        setSessionList(upcoming);
        setFinishedList(finished);
    };

    useEffect(() => {
        fetchSessionList();
    }, []);

    return (
        <Layout>
            <MainHeader content="Upcoming Sessions" />
            <SessionCards sessions={sessionList} />
            <MainHeader content="Last Sessions" />
            <SessionList sessions={finishedList} />
        </Layout>
    );
}

export default Home;
