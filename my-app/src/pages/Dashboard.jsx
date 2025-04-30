
import SynchronizedLineChart from '../components/charts/SynchronizedLineChart'
import PieChartWithPaddingAngle from '../components/charts/PieChartWithPaddingAngle'
import TinyBarChart from '../components/charts/TinyBarChart'
import Stats from '../components/Home/Stats'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { dashboardSummary } from '../rtk/slices/statistics-slice'
import { DotLoader } from 'react-spinners'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { data , loader } = useSelector( (state) => state.statistic)



  useEffect(() => {
    dispatch(dashboardSummary())
  },[])
  
    if(loader){
      return <div className='flex  justify-center items-center min-h-screen'><DotLoader  color="#1b7ad9" size={70} /></div>
    }


  const { 
    totalTasks , 
    upcomingTasks,
    completionRate,
    overdueTasks,
    statusData,
    priorityData

  } = data

  return (
    <div className="py-1.5">
        <Stats totalTasks={totalTasks}  upcomingTasks={upcomingTasks} completionRate={completionRate} overdueTasks={overdueTasks}/> 
        <div className='grid md:grid-cols-[1fr_1fr] md:gap-10 grid-rows-[1fr_1fr] gap-1 justify-center md:h-[200px] mb-10  '>
          <PieChartWithPaddingAngle priorityData={priorityData} />
          <TinyBarChart statusData={statusData}/>
        </div>
        <SynchronizedLineChart/>
    </div>
  )
}
