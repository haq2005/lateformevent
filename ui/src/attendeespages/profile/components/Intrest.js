import { useContext } from 'react';
import { BriefcaseFill, PencilFill,ClockFill, MortarboardFill,  StarFill} from 'react-bootstrap-icons'
import { AttendeeProfileContext } from '../Attendeeprofile';
import changeInterestApi from '../../../services/attendeeprofile/changeIntrestApi';
import updateAboutYouService from '../../../services/attendeeprofile/updateAboutYouService';
function Intrest(){
    let {loader,interest,aboutYou,email} = useContext(AttendeeProfileContext)
    let [loading,setLoading] = loader
    let [intrest,setIntrest] = interest
    let [about,setAbout] = aboutYou
    let[userEmail,setUserEmail] = email
    // changeInterest function use to change the intrest of the attendee in profile page.
    let changeInterest = async()=>{
        let prompt = window.prompt("Here, You can change your interest!");
     if(prompt !== "" && prompt.length > 5){
      setLoading(true)
  
      /* 
      functionName: changeIntrestApi
      functionType: service
      @param1: email of attendee
      @param2: promt (in that prompt user can chage there intrest)
      @return: error or response
      useCase: it helps to change the attendee intrest in server side(database)
      */
  await changeInterestApi(userEmail,prompt)
   setLoading(false)
  
   alert("successfully changed")
     }
     console.log(prompt)
        setIntrest(prompt)
      }
  
  
      // saveChanges function used to chage the attendee's work,passion,qualificationa and skills etc(About you feature)...
   let saveChanges = async()=>{
      let _work = document.getElementById('work').value;
      let _passion = document.getElementById('passion').value;
      let _qual = document.getElementById('qualification').value;
      let _skills = document.getElementById('skills').value;
      let obj = {
          work:aboutYou.work,
          passion:aboutYou.passion,
          timeSpends:aboutYou.timeSpends,
          qualification:aboutYou.qualification,
          skills:aboutYou.skills
      }
  
      if(_work !== "" && _work.length > 3){
  setAbout((prev)=>{
      return {...prev,work:_work}
  })
  obj.work = _work
      }
  
      if(_passion !== "" && _passion.length > 3){
          setAbout((prev)=>{
              return {...prev,passion:_passion}
          })
          obj.passion = _passion
              }
  
              if(_qual !== "" && _qual.length > 3){
                  setAbout((prev)=>{
                      return {...prev,qualification:_qual}
                  })
  
                  obj.qualification = _qual
                      }
  
                      if(_skills !== "" && _skills.length > 3){
                          setAbout((prev)=>{
                              return {...prev,skills:_skills}
                          })
                          obj.skills = _skills
                              }
  
                              let timeSpends = document.getElementsByName('timeOptions');
                              for (let i = 0 ;i<timeSpends.length;i++){
                                  
                                if(timeSpends[i].checked){
  
                                  setAbout((prev)=>{
          
                                      return {...prev,timeSpends:timeSpends[i].value}
                                  })
                                  obj.timeSpends = timeSpends[i].value
                                }
                              }
                           
                              if(obj.passion === aboutYou.passion && obj.qualification === aboutYou.qualification && obj.skills === aboutYou.skills && obj.timeSpends === aboutYou.timeSpends && obj.work === aboutYou.work ){
                                  alert("made changes in field for save changes")
                              }else{
                                  setLoading(true)
  
                                  /*
                                  functionName:updateAboutYouService
                                  @param1: email,
                                  @param2 : object of aboutYou
                                  returnType: responsed data and boolean
                                  useCase: it helps to change the about details of attedee in database
                                  
                                  */
                            await  updateAboutYouService(userEmail,obj)
                             setLoading(false)
                              }
   }

   
    return(
        <>
         <div className='row  mt-4 ' >
    <div className='col-12 p-2 mt-3  border-bottom bg-white h-50' >
    <div className='-bottom d-flex justify-content-between'>
    <b className='fw-bold fs-5 d-block p-1'>About Interest 💡 
    </b>
    <span className="nav-item  rounded-circle   bg-light text-dark p-1 text-center cursor-pointer" onClick={changeInterest} style={{width:"35px",height:"35px"}}><PencilFill size={25} className="p-1"/> </span>
    
    </div>
    <div className='p-2'>
      <p> {interest}</p>
    </div>
    </div>
    <div className='col-12 p-2 mt-3  border-bottom h-50   bg-white'>
    <div className='-bottom d-flex justify-content-between'>
    <b className='fw-bold fs-5 d-block p-1'>About You!</b>
    <span className="nav-item  rounded-circle   bg-light text-dark p-1 text-center cursor-pointer"  data-toggle="modal" data-target="#aboutYouModal" style={{width:"35px",height:"35px"}}><PencilFill size={25} className="p-1"/> </span>
    {/* Modal */}
    
    <div className='modal fade' id='aboutYouModal'>
    <div className='modal-dialog'>
    <div className='modal-content'>
    <div className='modal-header'>
    <h5 className="modal-title" >Here, You can change About you!</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
    
    </div>
    <div className='modal-body'>
    
    
    
    <div className='d-flex mt-3  justify-content-between'>
    <span><BriefcaseFill size={25} className="mb-1 mt-1"/></span>
    <input type="text" className="form-control w-75" id="work" placeholder="Your work "/>
    </div>
    
    <div className='d-flex mt-3  justify-content-between'>
    <span><StarFill size={25} className="mb-1 mt-1"/></span>
    <input type="text" className="form-control w-75" id="passion" placeholder='Your Passion'  />
    </div>
    <div className='mt-3 mb-3 p-1'>
    <span className='d-block text-secondary mt-2'>time that you spends for your passion</span>
    
    <div className='d-flex mt-1 justify-content-center'>
    <div className='text-centers'>
    <div className="form-check form-check-inline">
      <input className=" form-check-input mt-1" type="radio" name="timeOptions"  value="Not yet" />
      <label className="form-check-label" for="inlineRadio1">Not yet</label>
    </div>
    <div className="form-check form-check-inline">
      <input className="form-check-input mt-1" type="radio" name="timeOptions" value="1+ hrs" />
      <label className="form-check-label" for="inlineRadio2">1+ hrs</label>
    </div>
    <div className="form-check form-check-inline">
      <input className=" form-check-input mt-1" type="radio" name="timeOptions"  value="5+  hrs" />
      <label className="form-check-label" for="inlineRadio3">5+  hrs</label>
    </div>
    <div className="form-check form-check-inline">
      <input className=" form-check-input mt-1" type="radio" name="timeOptions"  value="10+  hrs" />
      <label className="form-check-label" for="inlineRadio3">10+  hrs</label>
    </div>
    </div>
    </div>
    </div>
    
    <div className='d-flex mt-3 justify-content-between'>
    <span><MortarboardFill size={25} className="mb-1 mt-1"/></span>
    <input type="text" className="form-control w-75" id="qualification"  placeholder='Your qualification'/>
    </div>
    
    <div className='d-flex mt-3 justify-content-between'>
    <span className='fs-2'>🧠</span>
    <input type="text" className="form-control w-75" id="skills" placeholder='Your skill' />
    </div>
    
    </div>
    <div className='model-footer -top p-2'>
    <button className='btn btn-primary float-right' data-dismiss="modal" aria-label="Close" onClick={saveChanges}>save changes</button>
    </div>
    </div>
    </div>
    </div>
    </div>
    <div className='p-2'>
       <p className='fs-6'><BriefcaseFill className='text-secondary me-1 mb-1'/>: {about.work}</p>
       <p className='fs-6'><StarFill className='text-secondary me-1 mb-1'/>: {about.passion}</p>
       <p className='fs-6'><ClockFill className='text-secondary me-1 mb-1'/>: {about.timeSpends}</p>
       <p className='fs-6'><MortarboardFill className='text-secondary me-1 mb-1'/>: {about.qualification}</p>
       <p className='fs-6'>🧠:  {about.skills}</p>
    </div>
    </div>
    </div>
        </>
    )
}

export default Intrest