import { useHistory } from "react-router";
import axios from "axios";
import Layout from "./Layout";
import { Form, Button } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";
import useForm from "../hooks/useForm";

function SessionForm() {
    const history = useHistory();

    const initialValues = {
        name: "",
        place: "",
        member_id: "",
        launch_date: new Date().toISOString().slice(0, 16),
        application_fee: 0,
        total_attendee: 0,
    };

    const onSubmit = async (values) => {
        console.log(values);
        const res = await axios.post("/api/v1/session/", values);
        if (res.status < 400 && res.data) {
            history.push("/session/" + res.data.session_id);
        } else {
            alert("다시 시도해주세요");
        }
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "이름을 입력해주세요";
        }

        if (new Date(values.launch_date) < new Date()) {
            errors.launch_date = "시간을 입력해주세요";
        }

        if (values.total_attendee <= 0) {
            errors.total_attendee = "정원을 입력해주세요";
        }

        return errors;
    };

    const { values, errors, submitting, handleChange, handleSubmit } = useForm({
        initialValues,
        onSubmit,
        validate,
    });

    const errorMessage = {
        position: "absolute",
        color: "orange",
        top: 0,
        right: 0,
    };

    return (
        <Layout>
            <MainHeader content="Create Session" />
            <Form inverted>
                <Form.Field>
                    <label>세션이름*</label>
                    <span style={errorMessage}>{errors?.name}</span>
                    <input
                        name="name"
                        placeholder="나의 세션"
                        value={values.name}
                        onChange={handleChange}
                        style={{ backgroundColor: errors?.name && "orange" }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>집결지</label>
                    <span style={errorMessage}>{errors?.place}</span>
                    <input
                        name="place"
                        placeholder="우리집 앞"
                        value={values.place}
                        onChange={handleChange}
                        style={{ backgroundColor: errors?.place && "orange" }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>주최자</label>
                    <span style={errorMessage}>{errors?.member_id}</span>
                    <input
                        name="member_id"
                        value={values.member_id}
                        onChange={handleChange}
                        style={{
                            backgroundColor: errors?.member_id && "orange",
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>집결시간*</label>
                    <span style={errorMessage}>{errors?.launch_date}</span>
                    <input
                        name="launch_date"
                        type="datetime-local"
                        value={values.launch_date}
                        onChange={handleChange}
                        style={{
                            backgroundColor: errors?.launch_date && "orange",
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>정원*</label>
                    <span style={errorMessage}>{errors?.total_attendee}</span>
                    <input
                        name="total_attendee"
                        type="number"
                        value={values.total_attendee}
                        onChange={handleChange}
                        style={{
                            backgroundColor: errors?.total_attendee && "orange",
                        }}
                    />
                </Form.Field>
                <Form.Field>
                    <label>참가비</label>
                    <span style={errorMessage}>{errors?.application_fee}</span>
                    <input
                        name="application_fee"
                        type="number"
                        value={values.application_fee}
                        onChange={handleChange}
                        style={{
                            backgroundColor:
                                errors?.application_fee && "orange",
                        }}
                    />
                </Form.Field>
                <Button
                    color="orange"
                    size="large"
                    style={{ float: "right" }}
                    onClick={handleSubmit}
                    loading={submitting}
                >
                    세션등록
                </Button>
            </Form>
        </Layout>
    );
}

export default SessionForm;
