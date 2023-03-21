import { useEffect, useState } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios'

export default function Videos() {
    const [totalVideos, setTotalVideos] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/get-stats')
        setTotalVideos(result.data.data[11].videos) // total videos
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
          text: 'Total Videos',
          // increase font size
          font: {
            size: 18
          },
          color: 'black'
        },
      },
    };
    
  
    const labels = totalVideos ? totalVideos.map((obj) => {
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
          label: 'Videos',
          // data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
          data: totalVideos ? totalVideos.map((obj) => obj.count ) : [],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  
  
  return (
    <div className='h-full min-w-[550px] my-5 p-2 ml-2'>
        { totalVideos ? (
            <Line options={options} data={data} />
            ) : (
                <p>Loading chart...</p>
        )}
    </div>
  )
}
