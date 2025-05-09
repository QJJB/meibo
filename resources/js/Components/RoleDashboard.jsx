import React from 'react'
import ProjectRoleDashboard from './ProjectDashboard/ProjectRoleDashboard'

const RoleDashboard = ({users}) => {
  return (
    <div className='bg-dark-secondary rounded-[20px]'><ProjectRoleDashboard users={users}></ProjectRoleDashboard></div>
  )
}

export default RoleDashboard
