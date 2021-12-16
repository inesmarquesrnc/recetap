import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import propTypes from "prop-types";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import 'bootstrap/dist/css/bootstrap.min.css';
import './register.css'

class Register extends Component {

    constructor() {
        super();
        this.state = {
            nombre: "",
            apellidos: "",
            mail: "",
            password: "",
            password_confirmation: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home");
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentRow !== state.lastRow) {
            return {
                isScrollingDown: props.currentRow > state.lastRow,
                lastRow: props.currentRow,
            };
        }

        // Return null to indicate no change to state.
        return null;
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            nombre: this.state.nombre,
            apellidos: this.state.apellidos,
            mail: this.state.mail,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={{padding: "2em", width: "70%"}}>
                <div className="card shadow-lg o-hidden border-0 my-5" >
                    <div className="registro container row">
                        <div className="col" style={{
                            color: "white"
                        }}>
                            <h2 style={{ color: "black" }}>Bienvenido a RecetApp</h2>
                            <p style={{ color: "black" }}>
                                ¿Ya tienes una cuenta? <Link to="/login" style={{
                                    color: "rgb(70, 102, 56",
                                    fontWeight: "bold"
                                }}>Log in</Link>
                            </p>
                        </div>
                        <div className="col">
                            <div style={{
                                marginTop: "1em",
                                marginLeft: "1em"
                            }}>
                                <h3 style={{textAlign: "center"}}>
                                    <b>Registro</b>
                                </h3>
                            </div>
                            <form className="formulario" style={{padding: "1em"}} noValidate onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-xs-4 col-sm-4 col-md-4">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.nombre}
                                            error={errors.nombre}
                                            placeholder="Nombre"
                                            id="nombre"
                                            type="text"
                                            className={classnames("", {
                                                invalid: errors.nombre
                                            })}
                                            required="required"
                                        />
                                        <span className="red-text">{errors.nombre}</span>
                                    </div>
                                    <div
                                        className="col-xs-8 col-sm-8 col-md-8"
                                    >
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.apellidos}
                                            error={errors.apellidos}
                                            placeholder="Apellidos"
                                            id="apellidos"
                                            type="text"
                                            className={classnames("", {
                                                invalid: errors.apellidos
                                            })}
                                            required="required"
                                        />
                                        <span className="red-text">{errors.apellidos}</span>
                                    </div>
                                </div>
                                <div style={{
                                    marginTop: "3px",
                                }}>
                                    <input
                                        onChange={this.onChange}
                                        value={this.state.mail}
                                        error={errors.mail}
                                        placeholder="Email"
                                        id="mail"
                                        type="mail"
                                        className={classnames("", {
                                            invalid: errors.mail
                                        })}
                                        required="required"
                                    />
                                    <span className="red-text">{errors.mail}</span>
                                </div>
                                <div className="row" style={{
                                    marginTop: "3px",
                                    marginBottom: "3px"
                                }}>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            error={errors.password}
                                            placeholder="Contraseña"
                                            id="password"
                                            type="password"
                                            className={classnames("", {
                                                invalid: errors.password
                                            })}
                                            required="required"
                                        />
                                        <span className="red-text">{errors.password}</span>
                                    </div>
                                    <div className="col-xs-6 col-sm-6 col-md-6">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password_confirmation}
                                            error={errors.password_confirmation}
                                            placeholder="Repite tu contraseña"
                                            id="password_confirmation"
                                            type="password"
                                            className={classnames("", {
                                                invalid: errors.password_confirmation
                                            })}
                                            required="required"
                                        />
                                        <span className="red-text">{errors.password_confirmation}</span>
                                    </div>
                                </div>
                                <div className="divBoton">
                                    <button
                                        type="submit"
                                        className="botonFormulario btn btn-info btn-block"
                                    >
                                        Sign up
                                </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { registerUser }
)(withRouter(Register));