import React from 'react'
import TaskCard from './TaskCard'

function TasksDashboard() {
  return (
    <div className='bg-dark-secondary rounded-[20px]'>
      <div className="header-tasks-dashboard flex justify-between items-center mt-[30px] ml-[30px] w-[256px]">
        <h2 className='text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]'>Tasks</h2>
        <div className="header-separation-tasks w-[3px] h-[33px] bg-header-separation round-[20px]"></div>
        <p className='text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]'>Go to Archives</p>  
      </div>
      <div className="flex flex-col task-cards mt-[35px] space-y-[20px]">
        <TaskCard></TaskCard>
        <TaskCard></TaskCard>
      </div> 
    </div>
  )
}

export default TasksDashboard