import React from 'react'
import ProjectCard from './ProjectCard'
import CreateProjectButton from './CreateProjectButton'

function ProjectsDashboard({ projects }) {
    return (
        <div className="bg-dark-secondary rounded-[20px] overflow-auto scrollbar-hide relative">
            {/* Sticky header that sticks at its original position */}
            <div className="z-10 h-[70px] bg-dark-secondary sticky top-0 flex justify-between">
                <div className="header-tasks-dashboard sticky top-[30px] z-10 bg-dark-secondary flex justify-between items-center ml-[30px] w-[256px] pb-[10px]">
                    <h2 className='text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]'>
                        Projects
                    </h2>
                    <div className="header-separation-tasks w-[3px] h-[33px] bg-header-separation rounded-[20px]"></div>
                    <p className='text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]'>
                        Show more
                    </p>
                </div>
                <CreateProjectButton className="" />
            </div>
            <div className="bg-dark-secondary rounded-[20px] px-4 pb-4">
                <ProjectCard projects={projects} />
            </div>
        </div>
    )
}

export default ProjectsDashboard
