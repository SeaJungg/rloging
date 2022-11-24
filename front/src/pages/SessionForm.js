import Layout from "./Layout";
import { Form, Button } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";

function SessionForm() {
    return (
        <Layout>
            <MainHeader content="Create Session" />
            <Form inverted>
                <Form.Field>
                    <label>세션이름</label>
                    <input placeholder="나의 세션" />
                </Form.Field>
                <Form.Field>
                    <label>집결지</label>
                    <input placeholder="우리집 앞" />
                </Form.Field>
                <Form.Field>
                    <label>참가비</label>
                    <input placeholder="3000" />
                </Form.Field>
                <Button color="orange" style={{ float: "right" }}>
                    Submit
                </Button>
            </Form>
        </Layout>
    );
}

export default SessionForm;
