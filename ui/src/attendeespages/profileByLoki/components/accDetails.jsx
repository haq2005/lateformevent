import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";

function AccountDetails({ email, data }) {
    let [oldPassword, setOldPassword] = useState("");
    let [newPassword, setNewPassword] = useState("");
    let [RetypenewPassword, setRetypeNewPassword] = useState("");
    let [disable, setDisable] = useState(false);
    let [newemail, setEmail] = useState();
    let [newName, setNewName] = useState("");
    let [newRecoveryMail, setNewRecoveryMail] = useState("");

    let updateBasicInfo = (eve,val) => {
        eve.preventDefault()
        let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
        //updating mail
        if (val === 1) {
          if (re.test(newemail)) {
            axios
              .post(
                process.env.REACT_APP_BACKEND_URL + "/update/updateAttendeeProfile",
                { id: val, email: email, newEmail: newemail }
              )
              .then((res) => {
                toast.success(res.data);
              })
              .catch((err) => {
                toast.error(err.response.data);
              });
          } else {
            toast.error("mail format is invalid");
          }
        }
        //updating fullName
        
    
        //updating recovery email
    
        if (val === 3) {
          let r = re.test(newRecoveryMail);
          console.log(r);
          console.log(newRecoveryMail);
          if (r === true) {
            axios
              .post(
                process.env.REACT_APP_BACKEND_URL + "/update/updateAttendeeProfile",
                { id: val, email: email, newRecoveryEmail: newRecoveryMail }
              )
              .then((res) => {
                toast.success(res.data);
              })
              .catch((err) => {
                toast.error(err.response.data);
              });
          } else {
            toast.error("new recovery mail input is invalid");
          }
        }
    
        //disabling..
        setTimeout(() => {
          setDisable(false);
        }, 2000);
      };
    


    let updatePassword = (event) => {
        event.preventDefault();
        console.log("hello");
        setDisable(true);
        console.log(newPassword.length);
        if (RetypenewPassword != newPassword) {
            toast.error("Re enter new password correctly")
            return
        } else if (newPassword.length >= 8 && newPassword.length <= 15) {
            alert(email)
            if (oldPassword.length !== 0) {
                axios
                    .post(
                        process.env.REACT_APP_BACKEND_URL + "/update/updateAttendeeProfile",
                        { id: 4, email: email, oldPassword, newPassword }
                    )
                    .then((res) => {
                        console.log(res);
                        console.log(email);
                        toast.success(res.data);
                    })
                    .catch((err) => {
                        toast.error(err.response.data);
                    });
            } else {
                toast.error("give a proper old password input");
            }
        } else {
            toast.error(
                "new password length should be contain minimum 8 letter and maximum 15 letters"
            );
        }
        setTimeout(() => {
            setDisable(false);
        }, 2000);
    };
    return (
        <section className="profile-accDetails">
            <div className="acc-grp">
                <h1>Account details</h1>
                <h6>Handle your notifications from <span>LateForm.</span>  </h6>
            </div>
            <form className="accDet-cen" action="">
                <div className="form-group">

                    <label >Email</label>
                    <div className="pro-acc-det-inp-grp">

                        <input
                            type="email"
                            className="form-control w-75"

                            placeholder={data.email}
                            onChange={(event) => {
                                setEmail(event.target.value);
                            }}
                        />
                        <button onClick={(event) => {

                            updateBasicInfo(event,1)
                        }} className="">update </button>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Recovery Email</label>
                    <div className="pro-acc-det-inp-grp">

                        <input
                            type="email"
                            className="form-control w-75"

                            placeholder={data.recoveryEmail}
                            onChange={(e) => {
                                setNewRecoveryMail(e.target.value);
                            }}
                        />
                        <button onClick={(event) => {

                            updateBasicInfo(event,3)
                        }} className="">update </button>
                    </div>
                </div>
                
                <hr />
                <div className="accDet-cen">
                    <label >Password</label>
                    <input
                        type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        onChange={(e) => {
                            setOldPassword(e.target.value);
                        }}
                        placeholder="Current password"
                    />
                    <input
                        type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        placeholder="New password"
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                        }}
                    />
                    <input
                        // type="password"
                        className="form-control w-75"
                        id="exampleInputPassword1"
                        placeholder="Re-type new password"
                        onChange={(e) => {
                            setRetypeNewPassword(e.target.value);
                        }}
                    />


                </div>
                <div className="close-acc">close account

                </div>
                <button onClick={(event) => {
                    event.preventDefault()
                    updatePassword(event);
                }} className="accDet-save">update password</button>
            </form>
            <ToastContainer />
        </section>)
}

export default AccountDetails;