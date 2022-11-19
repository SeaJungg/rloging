import Layout from "./Layout";
import { useParams } from "react-router-dom";
import { Header } from "semantic-ui-react";
import MainHeader from "../components/MainHeader";

function Session() {
    const { id } = useParams();

    return (
        <Layout>
            <MainHeader content="Sessions Detail" />
            <Header as="h3" inverted>
                {id}
            </Header>
        </Layout>
    );
}

export default Session;
