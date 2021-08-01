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
                <div className="contenido">{this.props.children}</div>
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
