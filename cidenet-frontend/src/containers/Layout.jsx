import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { limpiarMensaje } from '../actions/layout';

class Layout extends Component {
    componentDidUpdate() {
        this.props.limpiarMensaje();
    }

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
                <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                    <div class="container-fluid">
                        <a class="navbar-brand" href="#">
                            CIDENET
                        </a>
                        <button
                            class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarNav">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        aria-current="page"
                                        href="#"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        Registtrar
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="#">
                                        Actualizar
                                    </a>
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
