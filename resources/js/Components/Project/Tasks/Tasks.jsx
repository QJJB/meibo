import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Column from "./Column";
import Separator from "./Separator";
dayjs.extend(customParseFormat);

function Tasks({tasksTodo, tasksInProgress, tasksDone}) {
    const todayFormatted = dayjs().format("MMM, YYYY");
    return (
        <div className="tasks bg-dark-secondary rounded-[20px] px-[30px] py-[30px] overflow-auto ">
            <div className="head flex justify-between">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Tasks
                    </h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                        {todayFormatted}
                    </p>
                </div>
            </div>
            <div className="body flex justify-between h-full py-[30px]">
                <Separator />
                <Column title={"todos"} tasks={tasksTodo}/>
                <Separator />
                <Column title={"in progress"} tasks={tasksInProgress}/>
                <Separator />
                <Column title={"complete"} tasks={tasksDone}/>
                <Separator />
            </div>
        </div>
    );
}

export default Tasks;