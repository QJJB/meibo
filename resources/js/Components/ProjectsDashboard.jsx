import React from 'react'
import ProjectCard from './ProjectCard'

function ProjectsDashboard({projects}) {
  return (
    <div className='bg-dark-secondary rounded-[20px]'>
        <ProjectCard projects={projects}></ProjectCard>
    </div>
  )
}

export default ProjectsDashboard
