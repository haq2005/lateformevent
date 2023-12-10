import { AttendeeProfileContext } from "../Profile";
import "./pro_styles.css"
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "react-share";

import { useContext, useState } from "react";
import uploadAttendeeProfilePicServices from "../../../services/attendeeprofile/uploadAttendeeProfilePicService"
import axios from "axios";
import {
    BriefcaseFill,
    PencilFill,
    ClockFill,
    MortarboardFill,
    StarFill,
    Facebook,
} from "react-bootstrap-icons";

import changeInterestApi from "../../../services/attendeeprofile/changeIntrestApi";

import updateAboutYouService from "../../../services/attendeeprofile/updateAboutYouService";

function Pro() {

    let { profilePic, loader, email, name, interest, aboutYou } = useContext(AttendeeProfileContext);
    let [userProfilePic, setUserProfilePic] = profilePic;
    let [loading, setLoading] = loader;
    let [userEmail, setUserEmail] = email;
    let [userName, setUserName] = name;
    const [fData, setFdata] = useState();
    let emitFile = async () => {
        setLoading(true);
        let res = await uploadAttendeeProfilePicServices(fData);
        alert(res);
        setLoading(false);
        // document.getElementById("uploadFile").click();
    };
    let selectFile = async (event) => {
        let file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file);
        formData.append("email", userEmail);

        setFdata(formData);
    };

    let checkUrl = (link) => {
        try {
            return Boolean(new URL(link));
        } catch (err) {
            return false;
        }
    };

    let updateSocialUrl = () => {
        console.log(userEmail);
        let elem = document.getElementsByClassName("socialUrl");
        for (let i = 0; i < elem.length; i++) {
            if (elem[i].value !== "") {
                let isUrl = checkUrl(elem[i].value);
                console.log(elem[i].value);
                if (isUrl) {
                    setLoading(true);
                    // this api request is used fpr update the social url of the users!
                    axios
                        .post(
                            process.env.REACT_APP_BACKEND_URL +
                            "/attendeeProfile/updateSocialUrl",
                            { id: i + 1, email: userEmail, url: elem[i].value }
                        )
                        .then((res) => {
                            setLoading(false);
                            console.log(res.data);
                        })
                        .catch((err) => {
                            setLoading(false);
                            console.log(err);
                        });
                }
                else {
                    alert("wrong")
                }
            }
        }
    };


    //injected code starts here

    //let { loader, interest, aboutYou, email } = useContext(
    //  AttendeeProfileContext
    //);
    //let [loading, setLoading] = loader;
    let [intrest, setIntrest] = interest;
    let [about, setAbout] = aboutYou;
    //let [userEmail, setUserEmail] = email;
    // changeInterest function use to change the intrest of the attendee in profile page.
    let changeInterest = async () => {
        let prompt = window.prompt("Here, You can change your interest!");
        if (prompt !== "" && prompt.length > 5) {
            setLoading(true);

            /* 
            functionName: changeIntrestApi
            functionType: service
            @param1: email of attendee
            @param2: promt (in that prompt user can chage there intrest)
            @return: error or response
            useCase: it helps to change the attendee intrest in server side(database)
            */
            await changeInterestApi(userEmail, prompt);
            setLoading(false);

            alert("successfully changed");
        }
        console.log(prompt);
        setIntrest(prompt);
    };

    // saveChanges function used to chage the attendee's work,passion,qualificationa and skills etc(About you feature)...
    let saveChanges = async () => {
        let _work = document.getElementById("work").value;
        let _passion = document.getElementById("passion").value;
        let _qual = document.getElementById("qualification").value;
        let _skills = document.getElementById("skills").value;
        let obj = {
            work: aboutYou.work,
            passion: aboutYou.passion,
            timeSpends: aboutYou.timeSpends,
            qualification: aboutYou.qualification,
            skills: aboutYou.skills,
        };

        if (_work !== "" && _work.length > 3) {
            setAbout((prev) => {
                return { ...prev, work: _work };
            });
            obj.work = _work;
        }

        if (_passion !== "" && _passion.length > 3) {
            setAbout((prev) => {
                return { ...prev, passion: _passion };
            });
            obj.passion = _passion;
        }

        if (_qual !== "" && _qual.length > 3) {
            setAbout((prev) => {
                return { ...prev, qualification: _qual };
            });

            obj.qualification = _qual;
        }

        if (_skills !== "" && _skills.length > 3) {
            setAbout((prev) => {
                return { ...prev, skills: _skills };
            });
            obj.skills = _skills;
        }

        let timeSpends = document.getElementsByName("timeOptions");
        for (let i = 0; i < timeSpends.length; i++) {
            if (timeSpends[i].checked) {
                setAbout((prev) => {
                    return { ...prev, timeSpends: timeSpends[i].value };
                });
                obj.timeSpends = timeSpends[i].value;
            }
        }

        if (
            obj.passion === aboutYou.passion &&
            obj.qualification === aboutYou.qualification &&
            obj.skills === aboutYou.skills &&
            obj.timeSpends === aboutYou.timeSpends &&
            obj.work === aboutYou.work
        ) {
            alert("made changes in field for save changes");
        } else {
            setLoading(true);

            /*
                                        functionName:updateAboutYouService
                                        @param1: email,
                                        @param2 : object of aboutYou
                                        returnType: responsed data and boolean
                                        useCase: it helps to change the about details of attedee in database
                                        
                                        */
            await updateAboutYouService(userEmail, obj);
            setLoading(false);
        }
    };

    return (
        <section className="profile-pro">
            <h1>Profile</h1>
            <div className="pro-grp1">
                <div className="img-grp">
                    <h6>photo preview</h6>
                    <img
                        width={"100%"}
                        src={
                            userProfilePic === ""
                                ? null
                                : process.env.REACT_APP_BACKEND_URL +
                                "/imageHandler/getImage/" +
                                userProfilePic
                        }
                        alt="your profile"
                    />
                </div>
                <div className="upload-grp">
                    <h6>upload photo</h6>
                    <div class=" input-group">
                        <input
                            type="file"
                            class="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            accept="image/*"
                            id="uploadFile"
                            onChange={(e) => {
                                selectFile(e);
                            }}
                        />
                        <div class="input-group-append">
                            <button
                                onClick={emitFile}
                                class=""
                                type="button"
                            >
                                upload
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="pro-grp2">
                <h3>fundamentals</h3>
                <input class="w-small form-control p-3" type="text" placeholder="Default input" aria-label="default input example"></input>
                <input class="w-small form-control p-3" type="text" placeholder="Default input" aria-label="default input example"></input>
            </div>
            <hr />

            <div className="modal fade" id="aboutYouModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">
                                Here, You can change About you!
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex mt-3  justify-content-between">
                                <span>
                                    <BriefcaseFill size={25} className="mb-1 mt-1" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    id="work"
                                    placeholder="Your work "
                                />
                            </div>

                            <div className="d-flex mt-3  justify-content-between">
                                <span>
                                    <StarFill size={25} className="mb-1 mt-1" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    id="passion"
                                    placeholder="Your Passion"
                                />
                            </div>
                            <div className="mt-3 mb-3 p-1">
                                <span className="d-block text-secondary mt-2">
                                    time that you spends for your passion
                                </span>

                                <div className="d-flex mt-1 justify-content-center">
                                    <div className="text-centers">
                                        <div className="form-check form-check-inline">
                                            <input
                                                className=" form-check-input mt-1"
                                                type="radio"
                                                name="timeOptions"
                                                value="Not yet"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="inlineRadio1"
                                            >
                                                Not yet
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className="form-check-input mt-1"
                                                type="radio"
                                                name="timeOptions"
                                                value="1+ hrs"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="inlineRadio2"
                                            >
                                                1+ hrs
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className=" form-check-input mt-1"
                                                type="radio"
                                                name="timeOptions"
                                                value="5+  hrs"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="inlineRadio3"
                                            >
                                                5+ hrs
                                            </label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input
                                                className=" form-check-input mt-1"
                                                type="radio"
                                                name="timeOptions"
                                                value="10+  hrs"
                                            />
                                            <label
                                                className="form-check-label"
                                                for="inlineRadio3"
                                            >
                                                10+ hrs
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex mt-3 justify-content-between">
                                <span>
                                    <MortarboardFill size={25} className="mb-1 mt-1" />
                                </span>
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    id="qualification"
                                    placeholder="Your qualification"
                                />
                            </div>

                            <div className="d-flex mt-3 justify-content-between">
                                <span className="fs-2">🧠</span>
                                <input
                                    type="text"
                                    className="form-control w-75"
                                    id="skills"
                                    placeholder="Your skill"
                                />
                            </div>
                        </div>
                        <div className="model-footer -top p-2">
                            <button
                                className="btn btn-primary float-right"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={saveChanges}
                            >
                                save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="pro-grp3">

                <div className="pro-grp3-gp1">
                    <span
                        className="nav-item  rounded-circle   bg-light text-dark p-1 text-center cursor-pointer float-right"
                        onClick={changeInterest}
                        style={{ width: "35px", height: "35px" }}
                    >
                        <PencilFill size={25} className="p-1" />{" "}
                    </span>
                    <h5>intrested</h5>
                    <div className="gp-down">
                        <p className="p-2"> {interest}</p>
                        <p onClick={changeInterest}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                            </svg>
                        </p>
                    </div>
                </div>
                <div className="pro-grp3-gp2">
                    <span
                        className="nav-item float-right  rounded-circle   bg-light text-dark p-1 text-center cursor-pointer"
                        data-toggle="modal"
                        data-target="#aboutYouModal"
                        style={{ width: "35px", height: "35px" }}
                    >
                        <PencilFill size={25} className="p-1" />{" "}
                    </span>
                    <h5>about you</h5>
                    <div className="abt-grp">
                        <div className="abt-grp-itm">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#5CC46B" />
                            </svg>
                            <div>{about.work}</div>
                        </div>
                        <div className="abt-grp-itm">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#5CC46B" />
                            </svg>
                            <div> {about.passion}</div>
                        </div>
                        <div className="abt-grp-itm">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#5CC46B" />
                            </svg>
                            <div>{about.timeSpends}</div>
                        </div>
                        <div className="abt-grp-itm">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#5CC46B" />
                            </svg>
                            <div>{about.qualification === undefined ? "Not updated yet" : about.qualification}</div>
                        </div>
                        <div className="abt-grp-itm">

                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.825 22L7.45 14.975L2 10.25L9.2 9.625L12 3L14.8 9.625L22 10.25L16.55 14.975L18.175 22L12 18.275L5.825 22Z" fill="#5CC46B" />
                            </svg>
                            <div>{about.skills}</div>
                        </div>

                    </div>
                </div>

            </div>
            <hr />
            <div className="pro-grp4">
                <h5>links</h5>
                <div className="grid-grps-logo">
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
                                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401m-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4" />
                                </svg>
                            </span>
                        </div>
                        <input
                            placeholder="eg: https://www.linkedin.com/in/benjamin-grant-72381ujy3u"
                            type="text" class="form-control socialUrl" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                                </svg>

                            </span>
                        </div>
                        <input
                            placeholder="eg: Facebook.com/yourname"
                            type="text" class="form-control socialUrl" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                    <div class="input-group input-group-lg">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15" />
                                </svg>
                            </span>
                        </div>
                        <input
                            placeholder="eg: twitter.com/username"
                            type="text" class="form-control socialUrl" aria-label="Large" aria-describedby="inputGroup-sizing-sm" />
                    </div>
                </div>



            </div>

            <button
                onClick={updateSocialUrl}
                className="pro-lst-save-btn" >save</button>
        </section>
    );
}

export default Pro;