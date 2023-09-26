import { Navigate } from "react-router";

function Homerestrictor({children}){
  let isOAuthThere = window.localStorage.getItem('Oauth_2') !== null;
  let isAuthThere =    window.localStorage.getItem('auth_2') !== null;
  if(isOAuthThere === false && isAuthThere == false){
   return children
  }

  if(isOAuthThere){
   return <Navigate to="/organizer/dashboard" replace/>
  }
  if(isAuthThere){
    console.log("hello");
  return  <Navigate to="/attendee/tabs" replace/>
  }
  if(isOAuthThere && isAuthThere){
    window.localStorage.clear();
    window.location.reload()
  }
}
export default Homerestrictor