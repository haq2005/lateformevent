import { ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="container-fluid">
        <div className="registration-entry mt-5">
          <div className="border p-5 shadow rounded">
            <h6 className="display-6 fw-lighter mb-3">what's your role?</h6>
            <div className="d-flex justify-content-between flex-wrap">
              <Link
                className="text-decoration-none  btn btn-outline-primary ms-2"
                to="/guestRegister"
              >
                I'm Attendee <ArrowRight />
              </Link>
              <Link
                className="text-decoration-none  btn btn-outline-success ms-2"
                to="/organizerRegister"
              >
                I'm Organizer <ArrowRight />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
