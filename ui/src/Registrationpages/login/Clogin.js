import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import { useState } from "react";
import validator from "validator";
import { ArrowRight, Envelope, Lock } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
function Clogin() {
  let [isprocess, setProcess] = useState(false);
  let [loader, setLoader] = useState(false);
  let navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().email("invalid email").required("email is required"),
      password: yup.string().required("password is required"),
    }),
    onSubmit: (data) => {
      setProcess(true);
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/login/organizerLogin", data)
        .then((res) => {
          window.localStorage.setItem("Oauth", res.data);
          axios
            .post(
              process.env.REACT_APP_BACKEND_URL +
                "/login/validatingOrganizerUser",
              data,
              { headers: { Oauth: window.localStorage.getItem("Oauth") } }
            )
            .then((res) => {
              toast.success(res.data);
              setTimeout(() => {
                navigate("/organizerLoginOtpVerification?email=" + data.email);
              }, 5000);
            })
            .catch((err) => {
              setProcess(false);
              toast.error(err.response.data);
            });
        })
        .catch((err) => {
          setProcess(false);
          toast.error(err.response.data);
        });
    },
  });
  //forgot password
  let forgotPassword = (event) => {
    event.preventDefault();
    let mail = window.prompt("type your email", "");
    if (!mail) {
      toast.warn("give your email to change your password");
    } else {
      if (validator.isEmail(mail)) {
        setLoader(true);
        axios
          .post(process.env.REACT_APP_BACKEND_URL + "/forgot/forgotPassword", {
            email: mail,
          })
          .then((res) => {
            localStorage.setItem("forgotAuth", res.data.token);
            toast.success(res.data.msg);
            setLoader(false);

            setTimeout(() => {
              navigate("/forgot/forgotPassword");
            }, 5000);
          })
          .catch((err) => {
            toast.error(err.response.data);
            setLoader(false);
          });
      } else {
        window.alert("give proper email");
      }
    }
  };

  return (
    <div className="container-fluid">
      {/* <a href="" class="header_login_input_google_class">
        {" "}
        <svg
          class="header_login_input_google_svg_class"
          viewBox="0 0 30 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28.2569 12.5519H27.25V12.5H16V17.5H23.0644C22.0338 20.4106 19.2644 22.5 16 22.5C11.8581 22.5 8.5 19.1419 8.5 15C8.5 10.8581 11.8581 7.5 16 7.5C17.9119 7.5 19.6513 8.22125 20.9756 9.39937L24.5112 5.86375C22.2787 3.78312 19.2925 2.5 16 2.5C9.09688 2.5 3.5 8.09688 3.5 15C3.5 21.9031 9.09688 27.5 16 27.5C22.9031 27.5 28.5 21.9031 28.5 15C28.5 14.1619 28.4137 13.3438 28.2569 12.5519Z"
            fill="#FFC107"
          />
          <path
            d="M4.94141 9.18188L9.04828 12.1938C10.1595 9.4425 12.8508 7.5 16.0002 7.5C17.912 7.5 19.6514 8.22125 20.9758 9.39937L24.5114 5.86375C22.2789 3.78312 19.2927 2.5 16.0002 2.5C11.1989 2.5 7.03516 5.21062 4.94141 9.18188Z"
            fill="#FF3D00"
          />
          <path
            d="M16.0002 27.4999C19.2289 27.4999 22.1627 26.2643 24.3808 24.2549L20.5121 20.9812C19.2149 21.9677 17.6299 22.5012 16.0002 22.4999C12.7489 22.4999 9.98832 20.4268 8.94832 17.5337L4.87207 20.6743C6.94082 24.7224 11.1421 27.4999 16.0002 27.4999Z"
            fill="#4CAF50"
          />
          <path
            d="M28.2569 12.5519H27.25V12.5H16V17.5H23.0644C22.5714 18.8853 21.6833 20.0957 20.51 20.9819L20.5119 20.9806L24.3806 24.2544C24.1069 24.5031 28.5 21.25 28.5 15C28.5 14.1619 28.4137 13.3438 28.2569 12.5519Z"
            fill="#1976D2"
          />
        </svg>
        Google
      </a>
      <hr className="mt-4 login-hr"/> */}
      <div className="full mt-5 d-flex justify-content-center">
        <div className="full">
          {loader === false ? null : <div className="loader-line"></div>}
          <form className=" mt-1" onSubmit={formik.handleSubmit}>
            <div>
              <div className="form-group">
               
                <input
                  type="email"
                  placeholder="Email*"
                  className="loginPg-input-field"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <p className="p-2 h5 text-danger">{formik.errors.email}</p>
                ) : null}
              </div>
              <div className="full form-group">
            
                <input
                  type="password"
                  placeholder="Password*"
                  className="loginPg-input-field"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <p className="p-2 h5 text-danger">{formik.errors.password}</p>
                ) : null}
                <a
                style={{color:"#5dbe66",textTransform:"capitalize",fontSize:"1.2rem",padding:".5rem 0",fontWeight:"600",}}
                  className="text-decoration-none float-right"
                  href="/"
                  onClick={forgotPassword}
                >
                  forgot password?
                </a>
              </div>
            </div>

            {isprocess ? (
              <button className="btn btn-dark btn-full" disabled>
                logging...{" "}
                <div class="spinner-border text-success" role="status">
                  {" "}
                  <span class="sr-only"></span>
                </div>
              </button>
            ) : (
              <button className="loging-pg-btn">
                organizer Login
                <ArrowRight className="ms-2" />
              </button>
            )}
          </form>
          <Link
            to="/organizerRegister"
            className=" login-norm-text float-right  text-center text-decoration-none"
          >
            create a lateform hoster account
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
export default Clogin;
