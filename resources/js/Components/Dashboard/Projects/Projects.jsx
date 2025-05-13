import Card from "./Card";
import CreateProjectButton from "./CreateProjectButton";

function Projects({ projects }) {
    return (
        <div className="bg-dark-secondary rounded-[20px] overflow-auto scrollbar-custom relative">
            {/* Sticky header that sticks at its original position */}
            <div className="z-11 h-[70px] bg-dark-secondary sticky top-0 flex justify-between">
                <div className="header-tasks-dashboard sticky top-[30px] z-10 bg-dark-secondary flex justify-between items-center ml-[30px] w-[256px] pb-[10px]">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Projects
                    </h2>
                </div>
                <CreateProjectButton />
            </div>
            <div className="bg-dark-secondary rounded-[20px] px-4 pb-4">
                <Card projects={projects} />
            </div>
        </div>
    );
}

export default Projects;
