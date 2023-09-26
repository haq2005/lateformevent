import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import {toast,ToastContainer} from 'react-toastify';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import validator from 'validator';
import { ArrowRight,Envelope,Lock } from 'react-bootstrap-icons';
import {Link} from 'react-router-dom'
function Clogin(){
    let [isprocess,setProcess] = useState(false)
    let [loader,setLoader] = useState(false)
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues:{
            email:"",
            password:""
        },
        validationSchema: yup.object({
            email: yup.string().email('invalid email').required('email is required'),
            password: yup.string().required('password is required')
        }),
        onSubmit: (data)=>{
            setProcess(true)
        axios.post(process.env.REACT_APP_BACKEND_URL+'/login/organizerLogin',data).then((res)=>{
           window.localStorage.setItem('Oauth',res.data)
           axios.post(process.env.REACT_APP_BACKEND_URL+'/login/validatingOrganizerUser',data,{headers:{Oauth:window.localStorage.getItem('Oauth')}}).then((res)=>{
            toast.success(res.data)
            setTimeout(()=>{
                navigate('/organizerLoginOtpVerification?email='+data.email)
            },5000)
           }).catch((err)=>{
            setProcess(false)
            toast.error(err.response.data)
           })

            
        }).catch(err=>{
            setProcess(false)
            toast.error(err.response.data)
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
            localStorage.setItem('forgotAuth',res.data.token);
            toast.success(res.data.msg)
          setLoader(false)
         
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
<div className="container-fluid">

<div className='mt-5 d-flex justify-content-center'>
<div>
{loader===false?null:<div className="loader-line"></div>}
<form className=' mt-1' onSubmit={formik.handleSubmit}>

<div>
<div className='form-group'>
    <label><Envelope className='me-1'/>Email</label>
    <input type="email" placeholder='Email*' className='form-control' name='email' onChange={formik.handleChange} value={formik.values.email}/>
{formik.errors.email?<p className='text-danger'>{formik.errors.email}</p>:null}
</div>
<div className='form-group'>
    <label className='form-label'><Lock className='me-1'/> Password</label>
    <input type="password" placeholder='Password*' className='form-control' name='password' onChange={formik.handleChange} value={formik.values.password}/>
    {formik.errors.password?<p className='text-danger'>{formik.errors.password}</p>:null}
        <a className='text-primary text-decoration-none float-right' href='/' onClick={forgotPassword}>forgot password?</a>
</div>
</div>

{isprocess?<button className='btn btn-dark btn-full' disabled>logging... <div class="spinner-border text-success" role="status"> <span class="sr-only"></span></div></button>:<button className='btn btn-dark btn-full'>organizer Login<ArrowRight className='ms-2'/></button>}
    </form>
    <Link to="/organizerRegister" className='mt-5 text-center text-decoration-none'>create a lateform hoster account</Link>
</div>
</div>
<ToastContainer />
</div>
    )
}
export default Clogin;