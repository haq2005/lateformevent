import { Bar } from 'react-chartjs-2';

function Eachsale(props){

    const options = {
      indexAxis: 'y' ,
      elements: {
        bar: {
          borderWidth:2,
        },
       
        
      },
      
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom' ,
        },
        title: {
          display: true,
          text: 'analyze each tickets',
        },
      },
    };
  let labels = props.eachTicket.map((val)=>{return val.tiketName})
    const data = {
      labels,
      datasets: [
        {
          label: 'balance tickets',
          data: props.eachTicket.map((val,index)=>{console.log(val);return val.balTicket}),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'sold tickets',
          data:props.eachTicket.map((val,index)=>{console.log(val.sellTicket); return val.sellTicket}),
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
    
    return(
      <>
   <Bar options={options} data={data} />
      </>
    )
  }
  export default Eachsale