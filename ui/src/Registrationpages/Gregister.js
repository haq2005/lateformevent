import '../App.css'
import {useFormik} from 'formik';
import axios from 'axios';
import * as yup from 'yup'
import reg from '../image/connect.webp'
import cnt from '../image/connect.svg'
import { toast,ToastContainer } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';
import { EnvelopeFill, EnvelopeOpenFill, HeartFill, LockFill, PersonFill, PersonPlus } from 'react-bootstrap-icons';
import { useState } from 'react';
function Guestregister(){
    let [submit,setSubmit] = useState(false)
    let navigate= useNavigate()
    let formik = useFormik({
        initialValues:{
            email:"",
            password:"",
            fullName:"",
            recoveryEmail: ""
        },
        validationSchema : yup.object({
            email: yup.string().email().required('email is required').strict(true).trim('no space is allowed'),
            password: yup.string().required('this field is required').min(8,"password should be more than 8 letters").max(15,'password should be less than 15 letters ').strict(true).trim('no space is required'),
            fullName:yup.string().required('this field is required').min(3,"length of the name should be more than 3 letters").max(30,"length of the name should by less than 30 letters"),
            aboutInterest :yup.string().required("you should mention your interest"),
            recoveryEmail: yup.string().email().notOneOf([yup.ref('email'),null],"recovery email should be differ from email").required("recovery email should be required")          
        }),
        onSubmit : data =>{
            setSubmit(true)
            axios.post(process.env.REACT_APP_BACKEND_URL+'/register/attendeeRegister',data).then(res=>{
toast.success(res.data)
navigate('/')
            }).catch(err=>{
                setSubmit(false)
                toast.error(err.response.data)
            })
        }
    })
    return(
        <>
<div className="container-fluid">
<div className='d-flex justify-content-around'>
<div className='registration-form shadow-lg  mt-md-5 fw-light'>
<div className='row'>
<div className='col-lg-4 d-none d-lg-block'>
<img src={reg} className="img-fluid"/>
</div>
<div className='col-lg-8'>

<nav className="navbar">
  <span className="navbar-brand fs-2 fw-bold text-primary">Lateform.  <span className='text-secondary fs-6 fw-light'>create a new account</span></span>
 </nav> <p className='text-secondary'>mingle offline and create meaningful connections that transcend screens</p>

 <div>
    <img src={cnt} className="img-fluid d-md-none"/>
   </div>
    <form className='reg-form p-3' onSubmit={formik.handleSubmit}>
    <div className='form-group'>
    <label className='form-label'><PersonFill className='mb-1 me-1'/>Full name</label>
    <input type="text" placeholder='Full name' className='form-control' name="fullName" value={formik.values.fullName} onChange={formik.handleChange}/>
    {formik.errors.fullName? <p className='text-danger'>{formik.errors.fullName}</p>:null}

</div>

<div className='form-group'>
    <label><EnvelopeFill className='mb-1 me-1'/> Email</label>
    <input type="email" placeholder='Email*' className='form-control' name="email" value={formik.values.email} onChange={formik.handleChange}/>
{formik.errors.email? <p className='text-danger'>{formik.errors.email}</p>:null}
</div>



<div className='form-group'>
    <label className='form-label'><LockFill className='mb-1 me-1'/> Password</label>
    <input type="password" placeholder='Password*' className='form-control' name="password" value={formik.values.password} onChange={formik.handleChange}/>
    {formik.errors.password? <p className='text-danger'>{formik.errors.password}</p>:null}

</div>

<div className='form-group'>
    <label className='form-label'><HeartFill /> Interested in? </label>
    <input type="text" placeholder='I am interested in ...' className='form-control' name="aboutInterest" value={formik.values.aboutInterest} onChange={formik.handleChange}/>
    {formik.errors.aboutInterest? <p className='text-danger'>{formik.errors.aboutInterest}</p>:null}

</div>

<div className='form-group'>
    <label className='form-label'><EnvelopeOpenFill className='mb-1 me-1'/> Recovery email</label>
    <input type="email" placeholder='recovery email' className='form-control' name="recoveryEmail" value={formik.values.recoveryEmail} onChange={formik.handleChange}/>
    {formik.errors.recoveryEmail? <p className='text-danger'>{formik.errors.recoveryEmail}</p>:null}

</div>
{submit === false?<button className='btn btn-dark btn-full'>Register as an Attendee <PersonPlus className='mb-1 ms-1'/></button>:<button className='btn btn-black btn-full'>loading...</button>}
<Link to="/organizerLogin" className='mt-5 text-center text-decoration-none text-wrap'>already have a account?login in as an Attendee</Link>

    </form>


</div>
</div>
</div>
</div>
</div>
<ToastContainer />
        </>
    )
}
export default Guestregister