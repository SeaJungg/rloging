import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { Button, Header, Segment, Statistic } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";
import { useState } from "react";

function Session() {
    const { id } = useParams();
    const [attendee, setAttendee] = useState(Math.floor(Math.random() * 50));
    const [isAttend, setIsAttend] = useState(false);
    const total = 40;

    return (
        <Layout>
            <MainHeader content="Sessions Detail" />
            <Header as="h3" inverted>
                {id}
            </Header>
            <Segment circular color="orange" inverted>
                <Header as="h2">
                    <Header.Subheader>장소</Header.Subheader>
                    서울색공원
                </Header>
            </Segment>
            <Segment circular>
                <Header as="h2">
                    <Header.Subheader inverted>집결시간</Header.Subheader>
                    2022-11-10 19:50
                </Header>
            </Segment>
            <Segment style={{ overflow: "hidden" }}>
                <Header>참가신청자</Header>
                <Statistic.Group
                    size="small"
                    color={attendee < total ? "orange" : "red"}
                >
                    <Statistic>
                        <Statistic.Value>{attendee}</Statistic.Value>
                        <Statistic.Label>신청</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>{total}</Statistic.Value>
                        <Statistic.Label>정원</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
                <Button
                    onClick={() => {
                        alert("Show me the money!!!");
                        setAttendee(attendee + 1);
                        setIsAttend(true);
                    }}
                    disabled={isAttend || attendee >= total}
                    color="orange"
                    floated="right"
                >
                    {isAttend
                        ? "신청완료"
                        : attendee < total
                        ? "참가하기"
                        : "정원만료"}
                </Button>
            </Segment>
        </Layout>
    );
}

export default Session;
