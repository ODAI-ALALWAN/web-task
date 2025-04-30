
import {  useSelector } from 'react-redux';
import Stat from '../Home/Stat';
import { MdOutlineWavingHand } from "react-icons/md";

function Stats({  totalTasks , upcomingTasks, completionRate, overdueTasks}) {




  const { userName,  isLogin } = useSelector(
    (state) => state.auth,
  );

  

  return (
    <div className='card my-5'>
        <div>
          <div className='col-span-3 mb-7'>
              <h2 className='text-l md:text-xl flex items-center gap-2'>Hello <MdOutlineWavingHand className='text-blue-400'/> {isLogin && userName} </h2>
          </div>
        </div>
      <div className='grid grid-rows-4 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-2'>
      <Stat
        title='Total Tasks'
        value={totalTasks}
        color=' bg-[#c4e91c] '
      />
      <Stat
       
        title='Completion Rate'
        value={`${completionRate}%`}
        color=' bg-[#65db15] '
      />
      <Stat
       
        title='Overdue Tasks'
        value={overdueTasks}
        color=' bg-[#fd2a36] '
      />
      <Stat
       
        title='Upcoming Tasks'
        value={upcomingTasks}
        color=' bg-[#158bd0] '
      />

      </div>
      
    </div>
  );
}

export default Stats;
