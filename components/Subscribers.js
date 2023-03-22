import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

export default function Subscribers() {
    const [totalSubscribers, setTotalSubscribers] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/get-stats')
        setTotalSubscribers(result.data.data[11].subscribers) // total subscribers
      }
      fetchData()
    }, [])

    // charts 

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler
      );
    

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Total Subscribers',
          fontFamily: 'Arial',
          font: {
            size: 18
          },
          color: 'black'
        },
      },
    };
    
    
    
  
    const labels = totalSubscribers ? totalSubscribers.map((obj) => {
      // convert date to readable format
      const date = new Date(obj.date)
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      const day = date.getDate()
      return `${month}-${day}-${year}`
     }) : [];
  
    
   const data = {
      labels,
      datasets: [
        {
          fill: true,
          label: 'Dataset 2',
          data: totalSubscribers ? totalSubscribers.map((obj) => obj.count ) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  
  
  return (
    < div className='h-full w-full sm:min-w-[550px] my-5 sm:p-6 sm:ml-2 flex justify-center'>
        { totalSubscribers ? (
            <Line options={options} data={data} />
            ) : (
                <p>Loading chart...</p>
        )}
    </div>
  )
}
