import 'react-router-dom'
import { Navigate} from 'react-router-dom'
function Restrictor({children}){
 let allowed = window.localStorage.getItem('Oauth') !== null
if(allowed === true){
    return children
}else{
return <Navigate to="/" replace/>
}
}
export default Restrictor