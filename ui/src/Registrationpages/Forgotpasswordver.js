import {useFormik} from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react'
function Forgotpasswordver(){
    let navigate = useNavigate()
    let [load,setLoad] = useState(false)
    let formik = useFormik({
        initialValues:{
            email:"",
            newPassword:"",
            otp:""
        },
        validationSchema: yup.object({
            email: yup.string().email().required('email is required'),
            newPassword: yup.string().min(8,'minimum length of the password is 8').max(15,'maximum length of the password is 15').required('this field is required').strict(true).trim('empty space not allowed'),
            otp: yup.number().required('otp is required')
        }),
        onSubmit: (data)=>{
        setLoad(true)
         axios.post(process.env.REACT_APP_BACKEND_URL+'/forgot/forgotPasswordValidation',data,{headers:{forgotAuth:localStorage.getItem('forgotAuth')}}).then(res=>{
          toast.success(res.data)
         localStorage.clear();
         setTimeout(()=>{
navigate('/')
         },2000)
         }).catch(err=>{
            setLoad(false)
          toast.error(err.response.data)
         
         })
        }
    })
    return(
        <>
        <div className="container-md">

<div className="d-flex justify-content-around mt-5">

<div>
    <div>
    <nav className="navbar ">
  <span className="navbar-brand mb-0 h1 fs-1 text-primary ">Lateform.</span>
</nav>
    <p className='text-secondary text-center text-wrap' style={{width:"350px"}}>
To change your password, please enter the One-Time Password (OTP), your email address, and create a new password.
</p>
    </div>
<form className='form ps-5 pe-5' onSubmit={formik.handleSubmit}>

<div className="form-group"> 
<label className="form-label">email</label>
    <input type="email" name="email" className="form-control" value={formik.values.email} onChange={formik.handleChange}/>
    {formik.errors.email?<p className='text-danger'>{formik.errors.email}</p>:null}
</div>
<div className="form-group">
<label className="form-label">new password</label>
<input type="password" className="form-control" name="newPassword" value={formik.values.newPassword} onChange={formik.handleChange}/>
{formik.errors.newPassword?<p className='text-danger'>{formik.errors.newPassword}</p>:null}

</div>
<div className="form-group">
<label className="form-label">otp</label>
<input type="number" className="form-control" name="otp" value={formik.values.otp} onChange={formik.handleChange}/>
{formik.errors.otp?<p className='text-danger'>{formik.errors.otp}</p>:null}

</div>
{load === false?<button className="btn btn-success btn-full">change now</button>:<button className="btn btn-success btn-full" disabled>change...</button>}
</form>
</div>
</div>
        </div>
        <ToastContainer />
        </>
    )
}
export default Forgotpasswordver