import axios from "axios";
import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { setUserSession } from "../utils/Common";
import AuthContext from "../context/AuthContext";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Image from "next/image";

const schema = yup.object().shape({
  username: yup.string().required("Please enter your username"),
  password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [auth, setAuth] = useContext(AuthContext);

  const handleLogin = () => {
    setLoginError(null);
    setSubmitting(true);
    setLoading(true);
    axios
      .post("https://holidaze-strapi-api.herokuapp.com/auth/local", {
        identifier: username,
        password: password,
      })
      .then((response) => {
        setLoading(false);
        setUserSession(response.data.jwt, response.data.user);
        console.log(response);
        setAuth(response);
        router.push("/dashboard");
      })
      .catch((error) => {
        setLoading(false);
        setLoginError(error.toString());
      });
  };

  return (
    <>
      <div className="container__login">
        <div className="login-header">
          <h1>Login</h1>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <fieldset>
            <div>
              <input
                name="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
				
              />
            </div>
            <div>
              {errors.username && (
                <div className="form__error">{errors.username.message}</div>
              )}
            </div>

            <div>
              <input
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
			
              />
            </div>
            <div>
              {errors.password && (
                <div className="form__error">{errors.password.message}</div>
              )}
            </div>
            <div className="container__btn">
              <button
                className="btn cta"
                type="submit"
                value={loading ? "Loading.." : "Login"}
                disabled={loading}
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </fieldset>
        </form>
        <div className="container__illustration__icon big">
          <Image src="/fourth.svg" height={300} width={480} />
        </div>
      </div>
    </>
  );
}
