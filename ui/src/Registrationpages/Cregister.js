
import '../App.css'
import { useFormik } from 'formik';
import reg from '../image/reg.jpeg'
import * as yup from 'yup'
import axios from 'axios'
import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify'
import { Link,useNavigate } from 'react-router-dom';
import { BriefcaseFill, Building, EnvelopeFill, EnvelopeOpen, LockFill, PersonFill } from 'react-bootstrap-icons';
import speakerSm from '../image/speaker-sm.svg'
function Cregister(){
    let [submit,setSubmit] = useState(false);
    const navigate = useNavigate()
    let formik = useFormik({
        initialValues:{
            fullName:"",
            organizationName:"",
            email:"",
            role:"",
            password:"",
            recoveryEmail:""

        },
        validationSchema: yup.object({
            email:yup.string().email().required('email is required').strict(true).trim('no space is required for email'),
            fullName:yup.string().required('this field is required').min(3,"length of the name should be more than 3 letters").max(30,"length of the name should by less than 30 letters"),
            organizationName:yup.string().required('this field is required'),
            password: yup.string().required('this field is required').min(8,"password should be more than 8 letters").max(15,'password should be less than 15 letters ').strict(true).trim('no space is required'),
            role: yup.string().required('your role is required!'),
            recoveryEmail: yup.string().email().notOneOf([yup.ref('email'),null],"recovery email should be differ from email").required("recovery email should be required")
        }),
        onSubmit: (data)=>{
            setSubmit(true)
           axios.post(process.env.REACT_APP_BACKEND_URL+'/register/organizationRegister',data).then((res)=>{
           toast.success(res.data)
            setSubmit(false)
            navigate('/')
           }).catch(err=>{
            toast.error(err.response.data)
            setSubmit(false)
           })
          
        }
    })
    return(
        <>

<div className="container-fluid" >

<div className='d-flex justify-content-around'>
<div className='registration-form shadow-lg  mt-md-5 mb-5 fw-light' >
<div className='row'>
<div className='col-lg-4 d-none d-lg-block'>
<img src={reg} className="img-fluid"/>
</div>
<div className='col-lg-8'>

<nav className="navbar">
  <span className="navbar-brand fs-2 fw-bold text-primary">Lateform.  <span className='text-secondary fs-6 fw-light'>create a new account</span></span>
 
</nav>
    <p className='text-secondary fw-bolder'>No credit card,no limit,access all the features for free!</p>
   <div>
    <img src={speakerSm} className="img-fluid d-md-none"/>
   </div>
    <form className='reg-form mt-1 p-3' onSubmit={formik.handleSubmit}>
    <div className='form-group'>
    <label className='form-label'><PersonFill className='mb-1 me-1'/>Full name</label>
    <input type="text" placeholder='Full name' className='form-control' name='fullName' onChange={formik.handleChange} value={formik.values.fullName}/>
    {formik.errors.fullName?<p className='text-danger'>{formik.errors.fullName}</p>:null}
</div>
<div className='form-group'>
<label className='form-label'><Building className='mb-1 me-1'/>Organization name</label>
<input type="text" placeholder='Organization name*' className='form-control' name="organizationName" onChange={formik.handleChange} value={formik.values.organizationName}/>
{formik.errors.organizationName?<p className='text-danger'>{formik.errors.organizationName}</p>:null}
</div>
<div className='form-group'>
    <label> <EnvelopeFill className='mb-1 me-1'/> Email</label>
    <input type="email" placeholder='Email*' className='form-control' name='email' onChange={formik.handleChange} value={formik.values.email}/>
    {formik.errors.email?<p className='text-danger'>{formik.errors.email}</p>:null}
</div>
<div className='form-group'>
    <label className='form-label'><LockFill className='mb-1 me-1'/>Password</label>
    <input type="password" placeholder='Password*' className='form-control' name='password' onChange={formik.handleChange} value={formik.values.password}/>
    {formik.errors.password?<p className='text-danger'>{formik.errors.password}</p>:null}
</div>
<div className='form-group'>
    <label className='form-label'><EnvelopeOpen className='mb-1 me-1'/>recovery email</label>
    <input type="email" placeholder='recovery email' className='form-control' name='recoveryEmail' onChange={formik.handleChange} value={formik.values.recoveryEmail}/>
    {formik.errors.recoveryEmail?<p className='text-danger'>{formik.errors.recoveryEmail}</p>:null}
</div>
<div className='form-group'>
    <label className='form-label'>Your role <BriefcaseFill className='mb-1 me-1'/></label>
    <select className='form-select' onChange={formik.handleChange} value={formik.values.role} name="role">
        <option ></option>
        <option value="training admininstration">Training administration</option>
        <option value="management">Management</option>
        <option value="marketing">Marketing</option>
        <option value="sales">Sales</option>
        <option value="finance">Finance</option>
        <option value="it">IT</option>
        <option value="staff">Staff</option>
        <option value="other">Others</option>
    </select>
    {formik.errors.role?<p className='text-danger'>{formik.errors.role}</p>:null}
</div>
{submit?<button className='btn btn-outline-success btn-full' disabled>registering... <div className="spinner-border text-success" role="status"><span className="sr-only"></span></div></button>:<button className='btn btn-dark btn-full'>Register as an Hoster</button>}
<Link to="/organizerLogin" className='mt-5 text-center text-decoration-none text-wrap'>already have a account?login in as an Hoster</Link>

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
export default Cregister;

