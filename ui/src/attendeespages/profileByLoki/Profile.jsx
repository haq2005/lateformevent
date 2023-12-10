import "./style.css"
import { createContext, useEffect, useState } from "react";
import axios from "axios";


import Pro from "./components/pro";
import Activities from "./components/activities";
import Notif from "./components/notif";
import AccountDetails from "./components/accDetails";

export const AttendeeProfileContext = createContext();

function Profile() {
  let [interest, setInterest] = useState("");
  let [aboutYou, setAboutYou] = useState({
    work: "You still Not Updated!",
    passion: "You still Not Updated!",
    timeSpends: "You still Not Updated!",
    qualification: "You still Not Updated!",
    skills: "You still Not Updated!",
  });
  let [profile, setProfile] = useState(null);
  let [name, setName] = useState("");
  let [email, setEmail] = useState();
  let [attendeeData, setAttendeeData] = useState();
  let [profilePic, setProfilePic] = useState("");
  let [loader, setLoader] = useState(false);
  useEffect(() => {
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/login/attendeeEnv",
        { data: { id: localStorage.getItem("id") } },
        { headers: { auth_2: localStorage.getItem("auth_2") } }
      )
      .then((res) => {
        setEmail(res.data.email);
        setProfilePic(res.data.profilePic);
        setName(res.data.fullName);
        setAttendeeData(res.data)
        axios
          .post(
            process.env.REACT_APP_BACKEND_URL +
            "/attendeeProfile/getAttendeeProfile",
            { email: res.data.email }
          )
          .then((res) => {
            setInterest(res.data.aboutInterest);
            setAboutYou((prev) => {
              return {
                ...prev,
                work: res.data.aboutYou.work,
                passion: res.data.aboutYou.passion,
                timeSpends: res.data.aboutYou.timeSpends,
                qualification: res.data.aboutYou.qualification,
                skills: res.data.aboutYou.skills,
              };
            });
            setProfile(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  }, []);

  console.log(profile);
  const [renderId, setRenderId] = useState(0)
  const renderElem = () => {
    switch (renderId) {
      case 0:
        return <Pro />
      case 1:
        return <Activities />
      case 2:
        return <Notif />
      case 3:
        return <AccountDetails email={email} data={attendeeData} />
    }
  }

  let logout = () => {
    let isConfirm = window.confirm("are you sure to logout from your account?");
    if (isConfirm === true) {
      window.localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <AttendeeProfileContext.Provider
      value={{
        interest: [interest, setInterest],
        aboutYou: [aboutYou, setAboutYou],
        profilePic: [profilePic, setProfilePic],
        profile: [profile, setProfile],
        name: [name, setName],
        email: [email, setEmail],
        loader: [loader, setLoader],
      }}
    >
      <section className="profile-pg">
        <nav
          class=" navbar navbar-expand-lg navbar-light  
            alter-nav
            "
        >
          <a class="title-head " href="#">
            LateForm.
          </a>
          <div className="gapper">
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>

            <div className="gibrish">
              <button
                class="btn  btn-outline-secondary border-left-0 border"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item  font-1-2-r">
                <a className="nav-link font-1-2-r" href="/blogs">
                  Blog <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="nav-item font-1-2-r">
                <a className="nav-link" href="/forum">
                  Forum
                </a>
              </li>
              <li className="nav-item font-1-2-r">
                <a className="nav-link" href="/courses">
                  Courses
                </a>
              </li>
              <li className="nav-item font-1-2-r">
                <a className="nav-link" href="/events">
                  Events
                </a>
              </li>
              <li className="small-cnt nav-item font-1-2-r">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_780_1753)">
                    <circle cx="15" cy="15" r="15" fill="#DAE3EA" />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.8571 12.1428C17.8571 13.7214 16.5785 14.9999 14.9999 14.9999C13.4214 14.9999 12.1428 13.7214 12.1428 12.1428C12.1428 10.5642 13.4214 9.28564 14.9999 9.28564C16.5785 9.28564 17.8571 10.5642 17.8571 12.1428ZM9.28564 19.2856C9.28564 17.3856 13.0928 16.4285 14.9999 16.4285C16.9071 16.4285 20.7142 17.3856 20.7142 19.2856V19.9999C20.7142 20.3928 20.3928 20.7142 19.9999 20.7142H9.99993C9.60707 20.7142 9.28564 20.3928 9.28564 19.9999V19.2856Z"
                      fill="#94A3B1"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_780_1753">
                      <rect width="30" height="30" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <a className="nav-link" href="/events">
                  Your account
                </a>
              </li>
              <li className="small-cnt nav-item font-1-2-r">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 30 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.25 27.25C5.5625 27.25 4.97375 27.005 4.48375 26.515C3.99375 26.025 3.74917 25.4367 3.75 24.75V7.25C3.75 6.5625 3.995 5.97375 4.485 5.48375C4.975 4.99375 5.56334 4.74917 6.25 4.75H15V7.25H6.25V24.75H15V27.25H6.25ZM20 22.25L18.2813 20.4375L21.4688 17.25H11.25V14.75H21.4688L18.2813 11.5625L20 9.75L26.25 16L20 22.25Z"
                    fill="black"
                  />
                </svg>

                <a className="nav-link" href="/events">
                  Log out
                </a>
              </li>
              <li className="small-cnt nav-item font-1-2-r">
                <div class="dropdown">
                  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Choose Tab
                  </button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <div class="dropdown-item"
                      onClick={() => setRenderId(0)}
                    >Profile</div>
                    <div class="dropdown-item"
                      onClick={() => setRenderId(1)}
                    >Activity</div>
                    <div class="dropdown-item"
                      onClick={() => setRenderId(2)}
                    >Notifications</div>
                    <div class="dropdown-item"
                      onClick={() => setRenderId(3)}
                    >Account Details</div>
                    <div class="dropdown-item"
                      onClick={() => {

                        logout()
                      }}
                    >Logout</div>
                  </div>
                </div>
              </li>
            </ul>

            <div className="nav-right-content">
              <h4>Categories</h4>
              <div class="nav-inp input-group col-md-4">
                <input
                  class="gibrish-inverse form-control py-2 border-right-0 border"
                  type="search"
                  placeholder="search"
                  id="example-search-input"
                />
                <span class="input-group-append">
                  <button
                    class="btn btn-outline-secondary border-left-0 border"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      class="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                    </svg>
                  </button>
                </span>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_936_71)">
                  <path
                    d="M22.3125 6.375H18.5625V2.625C18.5625 2.12772 18.365 1.65081 18.0133 1.29917C17.6617 0.947544 17.1848 0.75 16.6875 0.75H1.6875C1.19022 0.75 0.713305 0.947544 0.361675 1.29917C0.010044 1.65081 -0.1875 2.12772 -0.1875 2.625V17.625C-0.18695 17.8014 -0.136656 17.974 -0.0423961 18.1231C0.0518635 18.2722 0.186265 18.3916 0.345368 18.4678C0.504471 18.5439 0.681821 18.5736 0.857044 18.5534C1.03227 18.5333 1.19825 18.4641 1.33594 18.3539L5.4375 15.0469V18.5625C5.4375 19.0598 5.63504 19.5367 5.98668 19.8883C6.33831 20.24 6.81522 20.4375 7.3125 20.4375H18.2801L22.6641 23.9789C22.8299 24.1131 23.0366 24.1867 23.25 24.1875C23.4986 24.1875 23.7371 24.0887 23.9129 23.9129C24.0887 23.7371 24.1875 23.4986 24.1875 23.25V8.25C24.1875 7.75272 23.99 7.27581 23.6383 6.92418C23.2867 6.57254 22.8098 6.375 22.3125 6.375ZM4.79883 13.1461L1.6875 15.6621V2.625H16.6875V12.9375H5.38828C5.17372 12.9375 4.96565 13.0112 4.79883 13.1461ZM22.3125 21.2871L19.2012 18.7711C19.0353 18.6369 18.8286 18.5633 18.6152 18.5625H7.3125V14.8125H16.6875C17.1848 14.8125 17.6617 14.615 18.0133 14.2633C18.365 13.9117 18.5625 13.4348 18.5625 12.9375V8.25H22.3125V21.2871Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_936_71">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <svg
                width="40"
                height="39"
                viewBox="0 0 40 39"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_936_74)">
                  <ellipse
                    cx="20.1002"
                    cy="19.5"
                    rx="19.3214"
                    ry="19.5"
                    fill="#DAE3EA"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M23.7805 15.7858C23.7805 17.838 22.1336 19.5001 20.1003 19.5001C18.0669 19.5001 16.42 17.838 16.42 15.7858C16.42 13.7337 18.0669 12.0715 20.1003 12.0715C22.1336 12.0715 23.7805 13.7337 23.7805 15.7858ZM12.7397 25.0715C12.7397 22.6015 17.6437 21.3572 20.1003 21.3572C22.5568 21.3572 27.4608 22.6015 27.4608 25.0715V26.0001C27.4608 26.5108 27.0467 26.9287 26.5407 26.9287H13.6598C13.1538 26.9287 12.7397 26.5108 12.7397 26.0001V25.0715Z"
                    fill="#94A3B1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_936_74">
                    <rect
                      width="38.6427"
                      height="39"
                      fill="white"
                      transform="translate(0.778809)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

        </nav>
        <section className="container profile-pg-inner">
          <div className="profile-lft">
            <div className="pro-lft-inner">
              <p className="profile-head">PROFILE</p>
              <div className="profile-side-bar">
                <h3
                  onClick={() => setRenderId(0)}
                >Profile</h3>
                <h3
                  onClick={() => setRenderId(1)}
                >activity</h3>
                <h3
                  onClick={() => setRenderId(2)}
                >notifications</h3>
                <h3
                  onClick={() => setRenderId(3)}
                >account details</h3>
                <h3
                  onClick={() => {

                    logout()
                  }}
                >log out</h3>
              </div>
            </div>
          </div>

          <div className="profile-content-section">
            {/* <Pro /> */}
            {
              renderElem()
            }
          </div>
        </section>
        <footer className="footer_class  " id="footer_id">
          <div
            className="footer_container_class container "
            id="footer_container_id"
          >
            <div className="footer_content_1_class" id="footer_content_1_id">
              <div
                className="footer_sub_content_1_class"
                id="footer_sub_content_1_id"
              >
                <h1
                  className="footer_content_1_h1_class"
                  id="footer_content_1_h1_id"
                >
                  <span
                    className="footer_content_1_h1_span_class "
                    style={{ color: "#5dbe66" }}
                    id="footer_content_1_h1_span_id"
                  >
                    LateForm.
                  </span>
                </h1>
                <p
                  className="footer_content_1_p_class"
                  id="footer_content_1_p_id"
                >
                  Where Learning & Fun Knows
                  <br /> No Bounds
                </p>
              </div>
              <h5
                className="footer_content_1_h5_class"
                id="footer_content_1_h5_id"
              >
                © Copyright LateForm 2023
              </h5>
            </div>
            <div className="sep">
              <div className="footer_content_2_class" id="footer_content_2_id">
                <h3
                  className="footer_content_2_h3_class"
                  id="footer_content_2_h3_id"
                >
                  Links
                </h3>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Home
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Forum
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Blog
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Events
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Courses
                  </p>
                </a>
              </div>
              <div className="footer_content_2_class" id="footer_content_2_id">
                <h3
                  className="footer_content_2_h3_class"
                  id="footer_content_2_h3_id"
                >
                  Platform
                </h3>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    About us
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Privacy policy
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Refund policy
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    Terms {"&"} conditions
                  </p>
                </a>
                <a
                  href=""
                  className="footer_content_2_a_class"
                  id="footer_content_2_a_id"
                >
                  <p
                    className="footer_content_2_a_p_class"
                    id="footer_content_2_a_p_id"
                  >
                    FAQs
                  </p>
                </a>
              </div>
            </div>

            <div className="footer_content_4_class" id="footer_content_4_id">
              <h3
                className="footer_content_4_h3_class"
                id="footer_content_4_h3_id"
              >
                Contact us
              </h3>
              <div
                className="footer_sub_content_4_class"
                id="footer_sub_content_4_id"
              >
                <p
                  className="footer_content_4_p_class"
                  id="footer_content_4_p_id"
                >
                  support@lateform.com
                </p>

                <a
                  href=""
                  className="footer_content_4_email_arrow_a_class"
                  id="footer_content_4_email_a_arrow_id"
                ></a>
              </div>
              <div
                className="footer_content_4_social_class"
                id="footer_sub_content_4_social_id"
              >
                <a
                  href=""
                  className="footer_content_4_social_a_class"
                  id="footer_sub_content_4_social_a_id"
                >
                  <svg
                    className="footer_content_4_social_a_icon_class"
                    id="footer_sub_content_4_social_a_icon_id"
                    viewBox="0 0 27 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.1903 13.2286C26.1903 5.98192 20.3237 0.100586 13.0952 0.100586C5.86663 0.100586 0 5.98192 0 13.2286C0 19.5825 4.50473 24.8731 10.4761 26.094V17.167H7.85709V13.2286H10.4761V9.94657C10.4761 7.41287 12.5321 5.35178 15.0594 5.35178H18.3332V9.29017H15.7142C14.994 9.29017 14.4047 9.88093 14.4047 10.603V13.2286H18.3332V17.167H14.4047V26.2909C21.0177 25.6345 26.1903 20.042 26.1903 13.2286Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href=""
                  className="footer_content_4_social_a_class"
                  id="footer_sub_content_4_social_a_id"
                >
                  <svg
                    className="footer_content_4_social_a_icon_class"
                    id="footer_sub_content_4_social_a_icon_id"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20.6549 0.132812C21.3335 0.132813 21.9843 0.402402 22.4642 0.882274C22.9441 1.36215 23.2137 2.01299 23.2137 2.69164V20.6034C23.2137 21.282 22.9441 21.9329 22.4642 22.4128C21.9843 22.8926 21.3335 23.1622 20.6549 23.1622H2.74309C2.06445 23.1622 1.4136 22.8926 0.933727 22.4128C0.453855 21.9329 0.184265 21.282 0.184265 20.6034V2.69164C0.184265 2.01299 0.453855 1.36215 0.933727 0.882274C1.4136 0.402402 2.06445 0.132813 2.74309 0.132812H20.6549ZM20.0151 19.9637V13.1828C20.0151 12.0766 19.5757 11.0157 18.7935 10.2336C18.0113 9.45136 16.9505 9.01193 15.8443 9.01193C14.7568 9.01193 13.4901 9.67722 12.876 10.6752V9.25502H9.30647V19.9637H12.876V13.6562C12.876 12.671 13.6693 11.865 14.6544 11.865C15.1295 11.865 15.5851 12.0537 15.921 12.3896C16.2569 12.7256 16.4456 13.1811 16.4456 13.6562V19.9637H20.0151ZM5.14838 7.24634C5.71844 7.24634 6.26515 7.01989 6.66825 6.61679C7.07134 6.2137 7.2978 5.66699 7.2978 5.09693C7.2978 3.90708 6.33824 2.93472 5.14838 2.93472C4.57493 2.93472 4.02496 3.16253 3.61947 3.56802C3.21398 3.97351 2.98618 4.52348 2.98618 5.09693C2.98618 6.28678 3.95853 7.24634 5.14838 7.24634ZM6.92677 19.9637V9.25502H3.38279V19.9637H6.92677Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href=""
                  className="footer_content_4_social_a_class"
                  id="footer_sub_content_4_social_a_id"
                >
                  <svg
                    className="footer_content_4_social_a_icon_class"
                    id="footer_sub_content_4_social_a_icon_id"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6586 11.0345C13.7006 11.0345 12.7817 11.4151 12.1043 12.0926C11.4268 12.7701 11.0462 13.6889 11.0462 14.647C11.0462 15.6051 11.4268 16.5239 12.1043 17.2014C12.7817 17.8789 13.7006 18.2594 14.6586 18.2594C15.6167 18.2594 16.5356 17.8789 17.213 17.2014C17.8905 16.5239 18.2711 15.6051 18.2711 14.647C18.2711 13.6889 17.8905 12.7701 17.213 12.0926C16.5356 11.4151 15.6167 11.0345 14.6586 11.0345ZM14.6586 8.62623C16.2555 8.62623 17.7869 9.26056 18.916 10.3897C20.0451 11.5188 20.6794 13.0502 20.6794 14.647C20.6794 16.2438 20.0451 17.7752 18.916 18.9043C17.7869 20.0334 16.2555 20.6678 14.6586 20.6678C13.0618 20.6678 11.5304 20.0334 10.4013 18.9043C9.27222 17.7752 8.63789 16.2438 8.63789 14.647C8.63789 13.0502 9.27222 11.5188 10.4013 10.3897C11.5304 9.26056 13.0618 8.62623 14.6586 8.62623ZM22.4856 8.32519C22.4856 8.72439 22.3271 9.10724 22.0448 9.38952C21.7625 9.6718 21.3797 9.83038 20.9804 9.83038C20.5812 9.83038 20.1984 9.6718 19.9161 9.38952C19.6338 9.10724 19.4753 8.72439 19.4753 8.32519C19.4753 7.92599 19.6338 7.54314 19.9161 7.26086C20.1984 6.97858 20.5812 6.82 20.9804 6.82C21.3797 6.82 21.7625 6.97858 22.0448 7.26086C22.3271 7.54314 22.4856 7.92599 22.4856 8.32519ZM14.6586 5.01377C11.6796 5.01377 11.1931 5.0222 9.80712 5.08361C8.86306 5.12817 8.22968 5.2546 7.64205 5.48339C7.1503 5.66394 6.70572 5.95333 6.34157 6.32991C5.96468 6.69405 5.67489 7.1386 5.49385 7.6304C5.26506 8.22043 5.13862 8.85261 5.09527 9.79546C5.03266 11.1248 5.02423 11.5896 5.02423 14.647C5.02423 17.6273 5.03266 18.1125 5.09407 19.4985C5.13862 20.4414 5.26506 21.076 5.49264 21.6624C5.69735 22.1862 5.93818 22.5631 6.33796 22.9629C6.74376 23.3675 7.12066 23.6095 7.63844 23.8094C8.23329 24.0394 8.86668 24.167 9.80592 24.2104C11.1353 24.273 11.6001 24.2802 14.6574 24.2802C17.6377 24.2802 18.123 24.2718 19.509 24.2104C20.4506 24.1658 21.084 24.0394 21.6728 23.8118C22.1641 23.6304 22.6085 23.3411 22.9733 22.9653C23.3791 22.5607 23.6212 22.1838 23.821 21.6648C24.0498 21.0723 24.1775 20.439 24.2208 19.4973C24.2834 18.1691 24.2907 17.7031 24.2907 14.647C24.2907 11.6679 24.2822 11.1814 24.2208 9.79546C24.1763 8.85382 24.0486 8.21802 23.821 7.6304C23.6395 7.13912 23.3503 6.69475 22.9745 6.32991C22.6105 5.95283 22.1659 5.66301 21.674 5.48219C21.084 5.2534 20.4506 5.12696 19.509 5.08361C18.1808 5.021 17.7172 5.01377 14.6586 5.01377ZM14.6586 2.60547C17.9303 2.60547 18.3385 2.61751 19.6234 2.67772C20.9046 2.73793 21.7788 2.93902 22.5458 3.23765C23.3406 3.5435 24.0101 3.95773 24.6796 4.62604C25.2919 5.22799 25.7657 5.95613 26.068 6.75979C26.3654 7.52684 26.5677 8.40105 26.6279 9.68348C26.6845 10.9671 26.7002 11.3753 26.7002 14.647C26.7002 17.9187 26.6881 18.3269 26.6279 19.6105C26.5677 20.8929 26.3654 21.7659 26.068 22.5342C25.7665 23.3383 25.2926 24.0666 24.6796 24.6679C24.0775 25.28 23.3494 25.7538 22.5458 26.0563C21.7788 26.3538 20.9046 26.5561 19.6234 26.6163C18.3385 26.6729 17.9303 26.6885 14.6586 26.6885C11.387 26.6885 10.9788 26.6765 9.69393 26.6163C8.41271 26.5561 7.5397 26.3538 6.77145 26.0563C5.96747 25.7547 5.2392 25.2808 4.63769 24.6679C4.0253 24.0661 3.5515 23.3379 3.24931 22.5342C2.95068 21.7671 2.74958 20.8929 2.68938 19.6105C2.63158 18.3269 2.61713 17.9187 2.61713 14.647C2.61713 11.3753 2.62917 10.9671 2.68938 9.68348C2.74958 8.39985 2.95068 7.52804 3.24931 6.75979C3.55063 5.95564 4.02454 5.22729 4.63769 4.62604C5.23937 4.0134 5.96759 3.53956 6.77145 3.23765C7.5385 2.93902 8.41151 2.73793 9.69393 2.67772C10.9788 2.62112 11.387 2.60547 14.6586 2.60547Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href=""
                  className="footer_content_4_social_a_class"
                  id="footer_sub_content_4_social_a_id"
                >
                  <svg
                    className="footer_content_4_social_a_icon_class"
                    id="footer_sub_content_4_social_a_icon_id"
                    viewBox="0 0 26 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13.0999 0.777344C6.23901 0.777344 0.682039 6.33432 0.682039 13.1952C0.680544 15.8019 1.49988 18.3428 3.0238 20.4577C4.54773 22.5725 6.69889 24.1538 9.1721 24.9772C9.79299 25.0852 10.0264 24.7127 10.0264 24.3861C10.0264 24.0918 10.0103 23.1145 10.0103 22.0739C6.89095 22.6488 6.08379 21.3139 5.83543 20.6148C5.69511 20.2572 5.09037 19.1557 4.56261 18.8602C4.12798 18.628 3.50709 18.053 4.54647 18.0381C5.52499 18.022 6.22287 18.9384 6.45633 19.3109C7.57393 21.1885 9.35837 20.6608 10.0724 20.3354C10.1817 19.5283 10.507 18.9856 10.8647 18.6751C8.10169 18.3647 5.21454 17.293 5.21454 12.5432C5.21454 11.1922 5.69511 10.0758 6.48737 9.20532C6.36319 8.89487 5.92857 7.62205 6.61155 5.9146C6.61155 5.9146 7.65092 5.58925 10.0264 7.18866C11.0373 6.9081 12.0818 6.76688 13.1309 6.76894C14.1864 6.76894 15.2419 6.90802 16.2354 7.18742C18.6109 5.57311 19.6503 5.91584 19.6503 5.91584C20.3332 7.62329 19.8986 8.89611 19.7744 9.20656C20.5655 10.0758 21.0473 11.1773 21.0473 12.5432C21.0473 17.3092 18.1452 18.3647 15.381 18.6751C15.8318 19.0626 16.2205 19.8077 16.2205 20.9724C16.2205 22.6327 16.2043 23.9676 16.2043 24.3873C16.2043 24.7127 16.4378 25.1001 17.0587 24.9759C19.5234 24.1435 21.6651 22.5591 23.1823 20.4458C24.6995 18.3325 25.5158 15.7967 25.5164 13.1952C25.5164 6.33432 19.9595 0.777344 13.0986 0.777344H13.0999Z"
                      fill="black"
                    />
                  </svg>
                </a>
                <a
                  href=""
                  className="footer_content_4_social_a_class"
                  id="footer_sub_content_4_social_a_id"
                >
                  <svg
                    className="footer_content_4_social_a_icon_class"
                    id="footer_sub_content_4_social_a_icon_id"
                    viewBox="0 0 26 21"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M25.2034 3.00033C24.305 3.40866 23.3367 3.67699 22.3334 3.80533C23.36 3.18699 24.1534 2.20699 24.5267 1.02866C23.5584 1.61199 22.485 2.02033 21.3534 2.25366C20.4317 1.25033 19.1367 0.666992 17.6667 0.666992C14.925 0.666992 12.685 2.90699 12.685 5.67199C12.685 6.06866 12.7317 6.45366 12.8134 6.81533C8.66003 6.60533 4.96169 4.61033 2.50003 1.58866C2.06836 2.32366 1.82336 3.18699 1.82336 4.09699C1.82336 5.83533 2.69836 7.37533 4.05169 8.25033C3.22336 8.25033 2.45336 8.01699 1.77669 7.66699V7.70199C1.77669 10.1287 3.50336 12.1587 5.79003 12.6137C5.05587 12.8146 4.28514 12.8425 3.53836 12.6953C3.85523 13.6899 4.47582 14.5601 5.31288 15.1837C6.14994 15.8074 7.16138 16.153 8.20502 16.172C6.43593 17.5725 4.24302 18.3295 1.98669 18.3187C1.59003 18.3187 1.19336 18.2953 0.796692 18.2487C3.01336 19.672 5.65002 20.5003 8.47336 20.5003C17.6667 20.5003 22.7184 12.8703 22.7184 6.25533C22.7184 6.03366 22.7184 5.82366 22.7067 5.60199C23.6867 4.90199 24.5267 4.01533 25.2034 3.00033Z"
                      fill="black"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </AttendeeProfileContext.Provider>
  );
}
export default Profile;
