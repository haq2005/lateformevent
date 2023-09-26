import axios from 'axios'

let joinGroupService = async(communityId,email)=>{
    
    let response  = axios.post(process.env.REACT_APP_BACKEND_URL+"/community/joinCommunity",{id:communityId,email}).then(res=>{
      console.log(res)
     return res
    }).catch((err)=>{
      console.log(err)
      return err
    })

    return response
    }

    export default joinGroupService