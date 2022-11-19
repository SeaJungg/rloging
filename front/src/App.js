import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import useSession from "./hooks/useSession";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Session from "./pages/Session";
import SessionForm from "./pages/SessionForm";

function App() {
    const { userName } = useSession();
    return (
        <Router>
            <Switch>
                <Route path="/session/register">
                    <SessionForm />
                </Route>
                <Route path="/session/:id">
                    <Session />
                </Route>
                <Route path="/">{userName ? <Home /> : <Login />}</Route>
            </Switch>
        </Router>
    );
}

export default App;
