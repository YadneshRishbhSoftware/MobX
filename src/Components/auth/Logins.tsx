import React, { Fragment, useEffect, useState,ChangeEvent } from "react";
import Logo from "../../images/Rishabh-Software-logo.png";
import "../../assets/common/css/main.css";
import { useNavigate, Link } from "react-router-dom";
// import { getToken } from "./authUser";
import SecureLS from "secure-ls";
import { useStore } from "../../Hooks/useStore";
import { observer } from "mobx-react-lite";
const Login = () => {
  const {
    rootStore: { loginStore },
  } = useStore();
  const ls = new SecureLS();
    const userLoginEmail: any = ls.get("userName")?.data;
    const userPassword: any = ls.get("userPassword")?.data;
  const rememberMe: any = ls.get("rememberMe")?.data;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

    const navigate = useNavigate();
    
    useEffect(() => {
      if (rememberMe) {
        setEmail(userLoginEmail);
        setPassword(userPassword);
      } else {
        ls.remove("userEmail");
        ls.remove("userPassword");
        ls.remove("rememberMe");
        localStorage.clear();
      }
    }, []);

  //   useEffect(() => {
  //     document.body.className = "app login_bg";

  //     if (getToken()) {
  //       navigate("/dashboard");
  //     }
  //   }, [navigate, user?.status]);

  // password toggle Handler
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleRememberme = (e: any) => {
    if (e.target.checked) {
      ls.set("userEmail", { data: email });
      ls.set("userPassword", { data: password });
      ls.set("rememberMe", { data: e.target.checked });
    } else {
      ls.removeAll();
    }
  };

  // Login form Submit
  const loginHandle = async (e:any) => {
    e.preventDefault()
    console.log(email,"OOOO")
    await loginStore.fetchUserToken(email, password);
    navigate("/products");
  };

  const onChangeUserName = (event: ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const onChangePassword = (event: ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

 
  return (
    <Fragment>
      <div className="app login_bg">
        <section className="login_wrapper">
          <div className="login_info">
            <div className="login_logo">
              <Link to="#">
                <img src={Logo} alt="Rishabh Software" />
              </Link>
            </div>
            <h1>Welcome back</h1>
            <p>
              Check what's popular on Rishabh and make your project look trendy
              and professional.
            </p>
          </div>

          <div className="login_block">
            <div className="login_content">
              <form onSubmit={loginHandle}>
                <div className="login_head">
                  <h2>Login </h2>
                  <p>Enter your credentials to access your account.</p>
                </div>
                <div className="login_body">
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text text-uppercase">
                        UserName
                      </span>
                    </div>
                    <input
                      required
                      defaultValue={email}
                      onChange={onChangeUserName}
                      aria-label="First name"
                      className="form-control"
                    />
                    {/* <div className="input-group-append">
                      <span className="input-group-text">
                        {/@rishabhsoft.com\s*$/.test(userName.toLowerCase()) ? (
                          <i className="las la-check-circle green "></i>
                        ) : (
                          <i className="las la-check-circle thin"></i>
                        )}
                      </span>
                    </div> */}
                    {/* <div id="#" className="invalid-feedback">
                      {user?.response?.data?.status === false
                        ? user?.response?.data?.message
                        : ""}
                    </div> */}
                  </div>
                  <div className="input-group form-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text text-uppercase">
                        Password
                      </span>
                    </div>
                    <input
                      className="form-control password block mt-1 w-full"
                      id="password"
                      defaultValue={password}
                      required
                      type={passwordShown ? "text" : "password"}
                      name="password"
                      onChange={onChangePassword}
                    />
                    <div className="input-group-append">
                      <span className="input-group-text">
                        <i className="las la-eye" onClick={togglePassword}></i>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="input-group form-group d-flex justify-content-between">
                    <div className="custom-control custom-checkbox mr-sm-2  m-6">
                      <input
                        type="checkbox"
                        onChange={handleRememberme}
                        className="custom-control-input"
                        defaultChecked={rememberMe}
                      />
                      <label
                        className="custom-control-label custom-control-label-valign"
                        htmlFor="customControlAutosizing"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
}

export default observer(Login);
