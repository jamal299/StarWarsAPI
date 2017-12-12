import React from 'react';
import ReactDOM from 'react-dom';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import LoginPage from './components/LoginPage';
import '../styles/index.scss'
import '../styles/login.scss'
import { Provider } from "react-redux"
import store from "./store"

const container = document.getElementById('container');
ReactDOM.render(<Provider store={store}>
                    <LoginPage />
                </Provider>, container );


