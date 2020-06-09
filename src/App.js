import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import {Login} from "./components/pages/Login";
import {UsersList} from "./components/pages/UsersList";

function App() {
    return (
        <Router>
                <Switch>
                    <Redirect exact from="/" to="/login"/>
                    <Route path="/login" component={Login}/>
                    <Route path="/users" component={UsersList}/>
                </Switch>
        </Router>
    );
}

export default App;
