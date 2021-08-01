import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

import { limpiarMensaje } from '../actions/layout';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LinkSelected: 'home'
        };
    }

    componentDidUpdate() {
        this.props.limpiarMensaje();
    }

    activeLink = (id) => {
        let { LinkSelected } = this.state;
        LinkSelected = id;
        this.setState({ LinkSelected });
    };

    activedLink = (id) => {
        return this.state.LinkSelected === id ? 'active' : '';
    };

    render() {
        if (this.props.mensaje) {
            const { mensaje } = this.props;

            switch (mensaje.get('tipo')) {
                case 'danger':
                    toast.error(mensaje.get('descripcion'), {
                        bodyClassName: 'toastify-content toastify-danger'
                    });
                    break;
                case 'warning':
                    toast.warn(mensaje.get('descripcion'), {
                        bodyClassName: 'toastify-content toastify-warning'
                    });
                    break;
                case 'success':
                    toast.success(mensaje.get('descripcion'), {
                        bodyClassName: 'toastify-content toastify-success'
                    });
                    break;
                default:
                    toast.info(mensaje.get('descripcion'), {
                        bodyClassName: 'toastify-content toastify-info'
                    });
            }
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div className="container-fluid">
                        <span className="brand">CIDENET</span>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div
                            className="collapse navbar-collapse"
                            id="navbarNav"
                        >
                            <ul className="navbar-nav">
                                <li
                                    className="nav-item"
                                    onClick={() => this.activeLink('home')}
                                >
                                    <Link
                                        to="/"
                                        className={`nav-link ${this.activedLink(
                                            'home'
                                        )}`}
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li
                                    className="nav-item"
                                    onClick={() => this.activeLink('registrar')}
                                >
                                    <Link
                                        to="/registrar"
                                        className={`nav-link ${this.activedLink(
                                            'registrar'
                                        )}`}
                                    >
                                        Registrar
                                    </Link>
                                </li>
                                <li
                                    className="nav-item"
                                    onClick={() =>
                                        this.activeLink('actualizar')
                                    }
                                >
                                    <Link
                                        to="/actualizar"
                                        className={`nav-link ${this.activedLink(
                                            'actualizar'
                                        )}`}
                                    >
                                        Actualizar
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <div className="container-fluid mt-3">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        mensaje: state.layout.get('mensaje')
    };
}

function mapDispatchToProps(dispatch) {
    return {
        limpiarMensaje: () => dispatch(limpiarMensaje())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
