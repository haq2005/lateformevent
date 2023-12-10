
import { Doughnut } from "react-chartjs-2";
function EachDonuts(props){
    console.log(props)
      const data = {
          labels: props.eachTicket.map((val)=>{return val.tiketName}),
          datasets: [
            {
              label: '',
              data: props.eachTicket.map((val)=>{return val.sellTicket}),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                '#0D6EFD',
                'lightGreen',
                'violet',
                'yellow',
                'green',
                'lightBlue',
                'grey',
                'rgba(54, 162, 235, 1)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 0.2)',
                  '#0D6EFD',
                  'lightGreen',
                  'violet',
                  'yellow',
                  'green',
                  'lightBlue',
                  'grey',
                  'rgba(54, 162, 235, 1)',
              ],
              borderWidth: 1,
            },
          ],
        };
        
      return (
          <>
  
  <Doughnut data={data}/>
  
     
          </>
      )
  }
  export default EachDonuts