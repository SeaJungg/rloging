import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, Image, Icon, Segment, List } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";
import { getDateString } from "../utils";
import Layout from "./Layout";

const defaultImg = "/background.jpeg";

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

    useEffect(() => {
        // TODO: change dummy data
        const res = [
            {
                session_id: "3a71fa3c-e800-426d-ab91-8f9332494f09",
                name: "나의세션",
                member_id: "정유진4427",
                launch_date: "2022-11-16T20:36:00+09:00",
                application_fee: "0",
                create_date: "2022-11-09T20:36:48.085459+09:00",
                update_date: "2022-11-09T20:36:48.085481+09:00",
            },
            {
                session_id: "e057e6eb-30a8-49db-8034-2f723f4e5f57",
                name: "두번째세션",
                member_id: "정유진4427",
                launch_date: "2022-11-24T12:35:00+09:00",
                application_fee: "3000",
                create_date: "2022-11-19T12:35:54.683618+09:00",
                update_date: "2022-11-19T12:35:54.683638+09:00",
            },
        ];

        const currentDate = new Date();

        const upcoming = [];
        const finished = [];

        res.forEach((session) => {
            session.upcoming = currentDate <= new Date(session.launch_date);
            session.upcoming ? upcoming.push(session) : finished.push(session);
        });

        setSessionList(upcoming);
        setFinishedList(finished);
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
