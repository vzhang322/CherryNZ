import React, { Component } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
    };
  }

  userOnLine = () => {
    let storage = window.localStorage;
    axios
      .post("http://206.189.39.185:5031/swagger/api/User/UserLogin", {
        username: this.state.userName,
        password: this.state.password,
      })
      .then((res) => {
        if (res.data.code === "0") {
          window.location.href = "#/admin/home";
        }

        storage.token = res.data.result.token;

        axios.interceptors.request.use(
          function (config) {
            config.withCredentials = true;
            config.headers = {
              token: storage.token,
            };
            return config;
          },
          function (error) {
            return Promise.reject(error);
          }
        );
      });
  };

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
                <MDBInput
                  label="Type your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                />
                <MDBInput
                  label="Type your password"
                  icon="lock"
                  group
                  type="password"
                  validate
                />
              </div>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-control"
                  id="InputPassword"
                  placeholder="Password"
                ></input>
                <label className="form-check-label" for="Check">
                  Remember me
                </label>
              </div>
              <div className="text-center">
                <MDBBtn>Login</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
export default Login;
