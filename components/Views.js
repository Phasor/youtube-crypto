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

export default function Views() {
    const [totalViews, setTotalViews] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/get-stats')
        setTotalViews(result.data.data[11].views) // total views
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
        Filler,
      );
    
    
     const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Total Views',
          font: {
            size: 18
          },
          color: 'black'
        },
        legend: {
          display: false
        }
      },
    };
    
  
    const labels = totalViews ? totalViews.map((obj) => {
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
          label: 'Views',
          // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          data: totalViews ? totalViews.map((obj) => obj.count ) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  
  
  return (
    <div className='h-full min-w-[550px] my-5 p-2 ml-2'>
        { totalViews ? (
            <Line options={options} data={data} />
            ) : (
                <p>Loading chart...</p>
        )}
    </div>
  )
}
