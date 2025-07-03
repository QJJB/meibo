import Card from "./Card";

function Tasks({ tasks, projects, users, projectId}) {
    return (
        <div className="z-0 bg-dark-secondary rounded-[20px] overflow-auto scrollbar-custom relative row-span-2">
            <div className="h-[70px] bg-dark-secondary z-0 sticky top-0">
                <div className="header-tasks-dashboard sticky top-[30px] z-10 bg-dark-secondary flex justify-between items-center ml-[30px] w-[256px] pb-[10px]">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Tasks
                    </h2>
                    <div className="header-separation-tasks w-[3px] h-[33px] bg-header-separation rounded-[20px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                        Go to Archives
                    </p>
                </div>
            </div>

            {/* Scrollable content starts after header */}
            <div className="flex flex-col task-cards mt-[35px] space-y-[20px] overflow-hidden pb-[30px]">
                <Card tasks={tasks} projects={projects} />
            </div>
        </div>
    );
}

export default Tasks;
