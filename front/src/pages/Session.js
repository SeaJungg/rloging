import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
    Button,
    Header,
    Label,
    Segment,
    Statistic,
    Icon,
} from "semantic-ui-react";
import Layout from "./Layout";
import MainHeader from "../components/MainHeader";
import { getDateString } from "../utils";
import config from "../config";

function Session() {
    const { id } = useParams();
    const [sessionDetail, setSessionDetail] = useState();
    const [attendee, setAttendee] = useState(0);
    const [total, setTotal] = useState(0);
    const [isAttend, setIsAttend] = useState(false);

    const fetchSessionDetail = async (id) => {
        // TODO: modify json format query
        const res = await axios.get(
            `${config.endpoint}/session/${id}/?format=json`
        );
        setSessionDetail(res.data);
        setAttendee(res.data?.attendee || 0);
        setTotal(res.data?.total_attendee || 0);
    };

    useEffect(() => {
        fetchSessionDetail(id);
    }, [id]);

    return (
        <Layout>
            <MainHeader content={sessionDetail?.name} />
            <Label.Group color="orange" size="big">
                <Label icon="flag">
                    <Icon name="flag" />
                    장소
                    <Label.Detail>
                        {sessionDetail?.place || "미정"}
                    </Label.Detail>
                </Label>
                <Label>
                    <Icon name="clock" />
                    시간
                    <Label.Detail>
                        {sessionDetail?.launch_date
                            ? getDateString(sessionDetail.launch_date)
                            : "미정"}
                    </Label.Detail>
                </Label>
            </Label.Group>

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
                    size="huge"
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
