import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {Login} from "./components/pages/Login";
import {UsersList} from "./components/pages/UsersList";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {setToken} from "./redux/actions";

const App = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const token = useSelector(state => state.token);

    useEffect(() => {
        if (!token) {
            const storageToken = localStorage.getItem('token');
            if (storageToken) {
                dispatch(setToken(storageToken));
                history.push('/users')
            }
        }
    }, []);

    return (
        <Switch>
            <Redirect exact from="/" to="/login"/>
            <Route path="/login" component={Login}/>
            <Route path="/users" component={UsersList}/>
        </Switch>
    );
};

export default App;
