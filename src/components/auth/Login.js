import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

class Login extends Component {
    constructor() {
        super();
        this.state = {
            mail: "",
            password: "",
            errors: {}
        };
    }

    componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to home
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/home/categorias");
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.auth.isAuthenticated !== this.props.auth.isAuthenticated) {
            this.props.history.push("/home/categorias");
        }

        if (prevProps.errors !== this.props.errors) {
            this.setState({
                errors: this.props.errors
            });
        }
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const userData = {
            mail: this.state.mail,
            password: this.state.password
        };
        this.props.loginUser(userData);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container" style={{
                padding: "2em",
                width: "70%"
            }}>
                <div className="center card shadow-lg o-hidden border-0 my-5" style={{
                    padding: "2em",
                    backgroundColor: "rgb(243, 239, 239)"
                }}>
                    <div className="login row justify-content-center">
                        <div>
                            <div className="col">
                                <div className="col" >
                                    <h3 style={{
                                        color: "black",
                                        marginTop: "1em",
                                        textAlign: "center"
                                    }}>
                                        <b>Login</b>
                                    </h3>
                                </div>
                                <form noValidate onSubmit={this.onSubmit}>
                                    <div className="input-field inputLogin">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.mail}
                                            error={errors.mail}
                                            placeholder="Email"
                                            id="mail"
                                            type="email"
                                            className={classnames("", {
                                                invalid: errors.mail || errors.mailnotfound
                                            })}
                                        />
                                        <span className="red-text">
                                            {errors.email}
                                            {errors.emailnotfound}
                                        </span>
                                    </div>
                                    <div className="input-field inputLogin">
                                        <input
                                            onChange={this.onChange}
                                            value={this.state.password}
                                            error={errors.password}
                                            placeholder="Contraseña"
                                            id="password"
                                            type="password"
                                            className={classnames("", {
                                                invalid: errors.password || errors.passwordincorrect
                                            })}
                                        />
                                        <span className="red-text">
                                            {errors.password}
                                            {errors.passwordincorrect}
                                        </span>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            className="btn botonLogin"
                                        >
                                            Login
                                </button>
                                        <div className="center texto">
                                            <p className="grey-text text-darken-1">
                                                ¿Todavía no tienes una cuenta? <Link style={{ color: 'grey' }} to="/register"
                                                >Regístrate</Link>
                                            </p>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { loginUser }
)(Login);