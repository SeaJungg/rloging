import { Header } from "semantic-ui-react";

const MainHeader = ({ content }) => (
    <Header
        as="h1"
        style={{
            fontSize: "2em",
            fontWeight: "bolder",
            fontStyle: "italic",
            color: "white",
        }}
    >
        {content}
    </Header>
);

export default MainHeader;
