import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Dashboard from '../components/dashboard';

export default () => {
    return (
        <Router>
           
            <Route path='/' component={Dashboard}></Route>
        </Router>
    )
}