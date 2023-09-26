import axios from 'axios'
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import * as yup from 'yup'
import validator from 'validator';
import { useNavigate } from 'react-router';
import otp from '../image/otp.svg'

function Organizerloginotp(){
    let [resend,setResend] = useState(false);
    let [load,setLoad] = useState(false)
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues:{
            otp:null
        },
        validationSchema: yup.object({
            otp: yup.number().required('otp is required')
        }),
        onSubmit: data=>{
            let query = window.location.href;
            //let urlString = query.replace('#/','');
            let param = new URL(query);
           let email = {
            email: param.searchParams.get('email')
           }
           setLoad(true)
            axios.post(process.env.REACT_APP_BACKEND_URL+'/login/validateOrganizerOtp',{
                email:email.email,
                otp:data.otp
            }).then(res=>{
                window.localStorage.setItem('Oauth_2',res.data.token);
                window.localStorage.setItem('id',res.data.id)
                window.sessionStorage.clear()
                window.localStorage.removeItem('Oauth')
                navigate('/organizer/dashboard')
            }).catch(err=>{
                 setLoad(false)
                toast.error(err.response.data)
            })
        }
    })
    let resendOtp = (event)=>{
        event.preventDefault()
        setResend(true)
        let query = window.location.href;
       // let urlString = query.replace('#/','');
        let param = new URL(query);
       let data = {
        email: param.searchParams.get('email')
       }
     if(validator.isEmail(data.email)){
        axios.post(process.env.REACT_APP_BACKEND_URL+'/forgot/forgotOtp',data).then(res=>{
            toast.success(res.data)
            setResend(false)
           }).catch((err)=>{
            toast.error(err.response.data)
            setResend(false)
           })
     }else{
        alert('invalid param')
     }

    }
    return(

        <>
        <div className="container-md">
        <nav className="navbar">
  <span className="navbar-brand mb-0 h1 fs-1 text-primary">Lateform</span>
</nav>
<div className="d-flex justify-content-center mt-5">
<div>
<div>
    <img src={otp} style={{width:"300px",height:"200px"}} />
</div>
<form className="form" onSubmit={formik.handleSubmit}>
<div className="form-group">
<label className="form-label">otp was sent your registered email</label>
<input type="number" className="form-control" placeholder="_ _ _ _ _ _" name="otp" value={formik.values.otp} onChange={formik.handleChange}/>
{formik.errors.otp?<p className='text-danger'>{formik.errors.otp}</p>:null}
</div>
{load||resend?<a className='text-secondary'href='/' onClick={(e)=>{e.preventDefault()}}>resend otp</a>:<a type="button" href="/" onClick={resendOtp} className="m-1">resend otp</a>}
{load === false? <button className="btn btn-success btn-full">Verify otp</button>: <button className="btn btn-success btn-full" disabled={true}>Verifying...</button>}
</form>
</div>
</div>
        </div>
        <ToastContainer />
        </>
    )
}
export default Organizerloginotp