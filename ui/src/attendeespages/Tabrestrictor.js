import { Navigate } from "react-router";
function Tabrestrictor({children}){
    let isThere = window.localStorage.getItem('auth_2')
    if(!isThere){
        return <Navigate to="/" replace/>
    }else{
        return children
    }
}

export default Tabrestrictor