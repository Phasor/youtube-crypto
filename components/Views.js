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
  Legend, 
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
        Legend
      );
    
    
     const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Total Views',
        },
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
    <div className='h-[600px] w-[600px]'>
        { totalViews ? (
            <Line options={options} data={data} />
            ) : (
                <p>Loading chart...</p>
        )}
    </div>
  )
}
