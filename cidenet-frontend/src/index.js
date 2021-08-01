import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ToastContainer } from 'react-toastify';

import history from './utils/history';
import store from './utils/store';

import './css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './css/custom-toastify.css';
import './css/layout.css';

import routes from './routes';

window.root = window.document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Router history={history}>{routes}</Router>
            <ToastContainer toastClassName="toastify" />
        </div>
    </Provider>,
    window.root
);
