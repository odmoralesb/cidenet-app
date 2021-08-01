import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

// Acciones

class Home extends Component {
    render() {
        return <Fragment>Home funcionando</Fragment>;
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
