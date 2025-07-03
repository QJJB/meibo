import Card from "./Card";
import CreateProjectButton from "./CreateProjectButton";

function Projects({ projects }) {
    return (
        <div className="bg-dark-secondary rounded-[20px] overflow-auto scrollbar-custom relative">

            <div className="h-[70px] bg-dark-secondary z-0 sticky top-0">
                <div className="header-tasks-dashboard bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
                    <div className="head flex justify-between">
                        <div className="left flex gap-5 items-center">
                        <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                            Projects
                        </h2>
                        <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                        <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                            New Project
                        </p>
                        </div>
                        <div className="right">
                            <CreateProjectButton />
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-dark-secondary rounded-[20px] px-4 pb-4">
                <Card projects={projects} />
            </div>
            
        </div>
    );
}

export default Projects;
