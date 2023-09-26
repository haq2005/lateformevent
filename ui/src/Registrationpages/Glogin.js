import  { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';
import {useNavigate}from'react-router-dom'
import validator from 'validator'
import { useState } from 'react';
import { ArrowRight, Envelope, Lock } from 'react-bootstrap-icons';
import {Link}from 'react-router-dom'
function Glogin(){
    let navigate = useNavigate();
    let [loader,setLoader] = useState(false)
    let formik = useFormik({
      
        initialValues:{
            email:"",
            password:""
        },
        validationSchema : yup.object({
            email : yup.string().email('invalid email').required('email is required').strict(true).trim('no space'),
            password : yup.string().required('password is required')
        }),
        onSubmit: (data)=>{
          setLoader(true)
          axios.post(process.env.REACT_APP_BACKEND_URL+'/login/attendeeLogin',data).then(res=>{
          window.localStorage.setItem('auth',res.data);
          axios.post(process.env.REACT_APP_BACKEND_URL+'/login/validatingAttendeeUser',data,{headers:{auth:window.localStorage.getItem('auth')}}).then(res=>{
           setLoader(false)
            toast.success(res.data)
            navigate('/attendeeLoginOtpVerification?email='+data.email)
          }).catch(err=>{
            toast.error(err.response.data)
            setLoader(false)
          })
          }).catch(err=>{
            toast.error(err.response.data)
            setLoader(false)
          })
        }
    })
    //forgot password
    let forgotPassword = (event)=>{
event.preventDefault();
let mail = window.prompt('type your email',"")
if(!mail){
  toast.warn('give your email to change your password')
}else{
if(validator.isEmail(mail)){
setLoader(true)
axios.post(process.env.REACT_APP_BACKEND_URL+'/forgot/forgotPassword',{email:mail}).then((res)=>{
  toast.success(res.data.msg)
  setLoader(false)
  localStorage.setItem('forgotAuth',res.data.token);
  setTimeout(()=>{
navigate('/forgot/forgotPassword')
  },5000)
}).catch(err=>{
  toast.error(err.response.data)
  setLoader(false)
})
}else{
  window.alert('give proper email')
}
}
    }
    return(
    <>
<div className="container-fluid">

<div className='d-flex justify-content-center mt-5'>
<div>
  {/*loading */}

 {loader === false?null: <div className="loader-line"></div>}
{/*loading */}
  
    <form className='mt-1' onSubmit={formik.handleSubmit}>

<div className='form-group'>
    <label><Envelope className='me-1'/> Email</label>
    <input type="email" placeholder='Email*' className='form-control' name="email" value={formik.values.email} onChange={formik.handleChange}/>
{formik.errors.email?<p className='text-danger'>{formik.errors.email}</p>:null}
</div>
<div className='form-group'>
    <label className='form-label'><Lock className='me-1'/> Password</label>
    <input type="password" placeholder='Password*' className='form-control' name="password" value={formik.values.password} onChange={formik.handleChange}/>
    {formik.errors.password?<p className='text-danger'>{formik.errors.password}</p>:null}
    <a className='text-primary text-decoration-none float-right m-1' href='/' onClick={forgotPassword}>forgot password?</a>
</div>
{loader === false?<button className='btn btn-dark btn-full'>attendee Login <ArrowRight className='ms-2'/></button>:<button className='btn btn-dark' disabled="true">loading...</button>}

    </form>
    <Link to="/guestRegister" className='mt-5 text-center text-decoration-none'>create a lateform attendee account</Link>
</div>
</div>

</div>
<ToastContainer />
    </>
    )
}
export default Glogin;