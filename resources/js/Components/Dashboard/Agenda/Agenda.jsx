import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import { useState } from "react";
import leftSVG from "../../../../assets/left.svg";
import rightSVG from "../../../../assets/right.svg";

import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";

import Column from "./Column";
import Separator from "./Separator";

const Agenda = ({ projects, auth }) => {
    const [activeDay, setActiveDay] = useState(dayjs());
    const previousDay = dayjs(activeDay).subtract(1, "day");
    const nextDay = dayjs(activeDay).add(1, "day");

    function goLeft() {
        setActiveDay((prev) => prev.subtract(1, "day"));
    }

    function goRight() {
        setActiveDay((prev) => prev.add(1, "day"));
    }

    const profilePhotoName = auth.user?.profile_photo
        ? auth.user.profile_photo.split('/').pop()
        : "default-avatar";

    const photoMap = {
        starfire: ppStarfire,
        beastboy: ppBeastboy,
        cyborg: ppCyborg,
        raven: ppRaven,
        kirby: ppKirby,
        robin: ppRobin,
    };

    const profilePhotoPath = photoMap[profilePhotoName] || "/default-avatar.png";

    const myTasks = projects.flatMap((project) =>
        project.tasks
            .filter((task) => task.created_by === auth.user.id)
            .map((task) => ({
                projectId: project.id,
                projectName: project.name,
                profilePicture: project.users.profile_picture_path,
                dueDate: dayjs(task.due_date),
            }))
    );

    const tasksPreviousDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(previousDay, "day")
    );

    const tasksActiveDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(activeDay, "day")
    );

    const tasksNextDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(nextDay, "day")
    );

    const displayPreviousDay = getLimitedTasks(tasksPreviousDay);
    const displayActiveDay = getLimitedTasks(tasksActiveDay);
    const displayNextDay = getLimitedTasks(tasksNextDay);

    function getLimitedTasks(tasks, maxTasks = 3) {
        return tasks.slice(
            0,
            tasks.length > maxTasks ? maxTasks - 1 : maxTasks
        );
    }

    console.log("myTasks", myTasks);
    console.log("activeDay", activeDay.format("YYYY-MM-DD"));

    return (
        <div className="agenda bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
            <div className="head flex justify-between">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Agenda
                    </h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                        {activeDay.format("MMM, YYYY")}
                    </p>
                </div>
                <div className="right flex">
                    <div className="arrows flex gap-[8px] pr-[20px]">
                        <div
                            className="arrow-left flex h-[30px] w-[30px] m-auto justify-center items-center bg-dark-tertiary rounded-full hover:cursor-pointer"
                            onClick={goLeft}
                        >
                            <img src={leftSVG} alt="Left arrow" />
                        </div>
                        <div
                            className="arrow-right flex h-[30px] w-[30px] m-auto justify-center items-center bg-dark-tertiary rounded-full hover:cursor-pointer"
                            onClick={goRight}
                        >
                            <img src={rightSVG} alt="Left arrow" />
                        </div>
                    </div>
                    <button
                        className={`today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] border-2 px-[25px] py-[5px] rounded-[20px] hover:cursor-pointer
                        ${
                            activeDay.isSame(dayjs(), "day")
                                ? "text-yellow-meibo"
                                : "text-gray-title-secondary hover:text-yellow-meibo"
                        }`}
                        onClick={() => setActiveDay(dayjs())}
                    >
                        Today
                    </button>
                </div>
            </div>

            <div className="body flex justify-between h-full py-[30px]">
                <Column day={previousDay} tasks={tasksPreviousDay} display={displayPreviousDay} pp={profilePhotoPath} />
                <Column day={activeDay} tasks={tasksActiveDay} display={displayActiveDay} pp={profilePhotoPath} />
                <Column day={nextDay} tasks={tasksNextDay} display={displayNextDay} pp={profilePhotoPath} />
                <Separator />
            </div>
        </div>
    );
};

export default Agenda;
