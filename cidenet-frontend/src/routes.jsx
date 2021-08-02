import React from 'react';
import { Route, Switch } from 'react-router';
import Layout from './containers/Layout';
import Home from './containers/Home';
import Registro from './containers/Registro';
import Actualizacion from './containers/Actualizacion';
import NotFound from './containers/NotFound';

export default (
    <Switch>
        <Layout>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/registrar" component={Registro} />
                <Route exact path="/actualizar/:id" component={Actualizacion} />
                <Route component={NotFound} />
            </Switch>
        </Layout>
    </Switch>
);
