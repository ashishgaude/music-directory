import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";

class Login extends Component {
  state = {
    username: "admin",
    password: "!/V7Sw/4>h^#'<~}",
  };

  onClickLogin = async () => {
    const a = toast.info("logging in...");
    try {
      const response = await axios.request({
        method: "POST",
        baseURL: "http://localhost:4000",
        url: `/accounts/authenticate`,
        data: this.state,
      });
      toast.dismiss(a);
      localStorage.setItem("auth.token", "tokenvaluehere");
      this.props.history.push("/songs");
    } catch (error) {
      toast.dismiss(a);
      toast.error(error.message);
    }
  };

  onUsername = (e) => {
    this.setState({ username: e.target.value });
  };

  onPassword = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="d-flex flex-column login-container">
        <div className="p-3 welcome">Welcome to Music Directory</div>
        <div className="p-3 login-description" style={{ marginBottom: "2vh" }}>
          Login to get started!
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "1vh" }}>
            <input
              className="login-box"
              type="text"
              placeholder="username"
              name="username"
              id="username"
              onChange={this.onUsername}
              value={this.state.username}
            />
          </div>
          <div>
            <input
              className="login-box"
              type="password"
              placeholder="password"
              name="passowrd"
              id="password"
              onChange={this.onPassword}
              value={this.state.password}
            />
          </div>
          <button
            type="button"
            className="login-button"
            onClick={() => this.onClickLogin()}
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

export default Login;
