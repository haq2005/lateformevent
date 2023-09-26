import {Navigate}from 'react-router-dom'
function Forgotpasswordrestrictor({children}){
    let isThere = window.localStorage.getItem('forgotAuth');
    if(!isThere){
        return <Navigate to="/" replace/>
    }else{
return children;
    }
}
export default Forgotpasswordrestrictor