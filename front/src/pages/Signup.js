import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';

const SignUpPage = ({location}) => {
    const [username, setUserName] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async () => {
        const token = location.state.token;

        const response = await axios.post(`${process.env.PUBLIC_URL}/signup`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                username,
                phone
            },
        });
    };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>이름(실명으로 작성해주세요)</label>
        <input placeholder='Username' value={username} onChange={e => setUsername(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>전화번호</label>
        <input placeholder='Phone' value={phone} onChange={e => setPhone(e.target.value)}/>
      </Form.Field>
      <Button type='submit'>Submit</Button>
    </Form>
  );
};

export default SignUpPage;