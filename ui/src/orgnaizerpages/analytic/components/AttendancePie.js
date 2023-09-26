import { Pie } from "react-chartjs-2";
function AttendancePie(props){
    const data = {
        labels: ['total present','total absent'],
        datasets: [
          {
            label: '',
            data: [props.attendeeAttendance.attendParticipants, props.attendeeAttendance.totalParticipants],
            backgroundColor: [
              
              '#0D6EFD',
              'rgba(255, 99, 132, 0.2)'
           
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
       
            ],
            borderWidth: 1,
          },
        ],
      };
      
    return (
        <>

<Pie data={data} />

   
        </>
    )
}
export default AttendancePie