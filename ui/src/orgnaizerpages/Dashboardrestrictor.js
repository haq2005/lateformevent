import { Navigate } from "react-router";


function Dashboardrestrictor({children}){
let isThere = window.localStorage.getItem('Oauth_2');
if(!isThere){
    return <Navigate to="/" replace/>
}else{
    return children
}
}
export default Dashboardrestrictor