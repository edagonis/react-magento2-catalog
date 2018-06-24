import React from 'react';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Catalog from '../components/Catalog';
import Product from '../components/Product';

const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Switch>
                <Route path="/" component={Catalog} exact={true} />
                <Route path="/index.php" component={Catalog} exact={true} />
                <Route path="/product/:id" component={Product} />
            </Switch>
        </div>
    </BrowserRouter>
)

export default AppRouter;