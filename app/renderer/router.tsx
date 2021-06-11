import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import Home from '@src/container/home';
import Finance from '@src/container/Finance';
import ROUTER from '@common/constants/router';

export default function Router() {
    return (
        <HashRouter>
            <Switch>
                <Route path={ROUTER.root} exact>
                    <Root />
                </Route>
                <Route path={ROUTER.home} exact>
                    <Home />
                </Route>
                <Route path={ROUTER.finance} exact>
                    <Finance />
                </Route>
            </Switch>
            <Redirect to={ROUTER.root} />
        </HashRouter>
    )
}
