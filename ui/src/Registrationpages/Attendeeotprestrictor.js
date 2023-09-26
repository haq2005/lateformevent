import { Navigate } from "react-router-dom"

function Attendeeotprestrictor({children}){
    let isAllowed = window.localStorage.getItem('auth')!==null
if(isAllowed){
    return children
}else{
   return <Navigate to="/" replace/>
}
}
export default Attendeeotprestrictor