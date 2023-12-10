import { useState } from "react";
import "./homePG.css";
//import Speaker from "../image/home.webp";
import Student from "../../image/students-vector-1.svg";
import BlobImg from "../../image/blob-1.svg";
import Clogin from "./Clogin";
import Glogin from "./Glogin";
function Home() {
  let [isHoster, setHoster] = useState(false);
  return (
    <header className="header_class">
      <nav className="header_nav_class">
        <div className="header_nav_logo_conatiner_class">
          <b className="header_nav_logo_b_class">Lateform.</b>
        </div>
      </nav>
      <div className="header_container_class">
        <div className="header_svg_container_class">
          <img className="header_svg_class_1" src={BlobImg} alt="" />
          <img className="header_svg_class_2" src={Student} alt="" />
        </div>
        <div className="header_content_container_class">
          <h2 className="header_content_h2_class">
            Hi,{" "}
            <span className="header_content_h2_span_class">Welcome back!</span>
          </h2>
          <p className="header_content_p_class">
            Log in to embark on your learning journey and join a vibrant
            community of curious minds!
          </p>
          <div className="header_login-form">
            
            <ul className="nav nav-tabs">
              <li className="log-item">
                <span
                  className={
                    isHoster === false ? "nav-link active" : "nav-link"
                  }
                  type="button"
                  onClick={() => {
                    setHoster(false);
                  }}
                >
                  Attendee
                </span>
              </li>
              <li className="log-item">
                
                <span
                  className={
                    isHoster === false ? "nav-link" : "nav-link active"
                  }
                  type="button"
                  onClick={() => {
                    setHoster(true);
                  }}
                >
                  Hoster
                </span>
              </li>
            </ul>
            {/* tab form */}
           
            <div  >{isHoster === false ? <Glogin /> : <Clogin />}</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Home;
