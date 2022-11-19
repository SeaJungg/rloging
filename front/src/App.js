import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Session from "./pages/Session";

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
                <Route path="/session/:id">
                    <Session />
                </Route>
                <Route path="/">
                    {/* TODO: branch by authentication */}
                    <Login />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
