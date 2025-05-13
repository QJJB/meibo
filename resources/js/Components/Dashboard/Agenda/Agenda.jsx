import { useState } from "react";
import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";
import { usePage } from '@inertiajs/react';

import sunSVG from "../../../../assets/sun.svg";
import moreSVG from "../../../../assets/more.svg";

import leftSVG from "../../../../assets/left.svg";
import rightSVG from "../../../../assets/right.svg";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

const Agenda = ({ projects, auth }) => {
    const profilePhotoName = auth.user?.profile_photo
    ? auth.user.profile_photo.split('/').pop() // Récupère la dernière partie de l'URL
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

    const [activeDay, setActiveDay] = useState(dayjs());
    const previousDay = dayjs(activeDay).subtract(1, "day");
    const nextDay = dayjs(activeDay).add(1, "day");

    function goLeft() {
        setActiveDay((prev) => prev.subtract(1, "day"));
    }

    function goRight() {
        setActiveDay((prev) => prev.add(1, "day"));
    }

    const todayFormatted = activeDay.format("MMM, YYYY");

    const myTasks = projects.flatMap((project) =>
        project.tasks
            .filter((task) => task.created_by === auth.user.id)
            .map((task) => ({
                projectId: project.id,
                projectName: project.name,
                profilePicture: project.users.profile_picture_path,
                dueDate: dayjs(task.due_date, "YYYY-MM-DD HH:mm:ss"),
            }))
    );

    const tasksPreviousDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(previousDay, "day")
    );

    const showPreviousDay = tasksPreviousDay.slice(
        0,
        tasksPreviousDay.length > 3 ? 2 : 3
    );

    const tasksActiveDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(activeDay, "day")
    );

    const showActiveDay = tasksActiveDay.slice(
        0,
        tasksActiveDay.length > 3 ? 2 : 3
    );

    const tasksNextDay = myTasks.filter((task) =>
        dayjs(task.dueDate).isSame(nextDay, "day")
    );

    const showNextDay = tasksNextDay.slice(0, tasksNextDay.length > 3 ? 2 : 3);

    // console.log(JSON.stringify(myTasks, null, 2));

    return (
        <div className="agenda bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
            <div className="head flex justify-between">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">
                        Agenda
                    </h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">
                        {todayFormatted}
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
                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div className="day prev w-full px-[10px] grid grid-rows-4 min-h-[200px]">
                    <h3
                        className={`text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px] ${
                            previousDay.isSame(dayjs(), "day")
                                ? "text-white-title"
                                : "text-gray-title-secondary"
                        }`}
                    >
                        {previousDay.date()}
                    </h3>

                    {showPreviousDay.length === 0 ? (
                        <div className="empty w-full h-full flex items-center justify-center">
                            <img src={sunSVG} alt="sun" />
                        </div>
                    ) : (
                        <>
                            {showPreviousDay.map((task, index) => (
                                <div className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
                                    <div className="left flex items-center">
                                        <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                            <img
                                                src={profilePhotoPath}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                            {task.projectName}
                                        </p>
                                    </div>
                                    <div className="detail flex gap-[3px] mr-[10px]">
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                    </div>
                                </div>
                            ))}

                            {tasksPreviousDay.length > 3 && (
                                <div className="showmore task h-[45px] flex items-center justify-center gap-[10px] px-[10px]">
                                    <p className="text-gray-title-secondary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                        Show more
                                    </p>
                                    <img src={moreSVG} alt="" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div className="day active w-full px-[10px] grid grid-rows-4 min-h-[120px]">
                    <h3
                        className={`text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px] ${
                            activeDay.isSame(dayjs(), "day")
                                ? "text-white-title"
                                : "text-gray-title-secondary"
                        }`}
                    >
                        {activeDay.date()}
                    </h3>
                    {showActiveDay.length === 0 ? (
                        <div className="empty w-full h-full flex items-center justify-center">
                            <img src={sunSVG} alt="sun" />
                        </div>
                    ) : (
                        <>
                            {showActiveDay.map((task, index) => (
                                <div className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
                                    <div className="left flex items-center">
                                        <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                            <img
                                                src={profilePhotoPath}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                            {task.projectName}
                                        </p>
                                    </div>
                                    <div className="detail flex gap-[3px] mr-[10px]">
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                    </div>
                                </div>
                            ))}

                            {tasksActiveDay.length > 3 && (
                                <div className="showmore task h-[45px] flex items-center justify-center gap-[10px] px-[10px]">
                                    <p className="text-gray-title-secondary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                        Show more
                                    </p>
                                    <img src={moreSVG} alt="" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div className="day next w-full px-[10px] grid grid-rows-4 min-h-[120px]">
                    <h3
                        className={`text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px] ${
                            nextDay.isSame(dayjs(), "day")
                                ? "text-white-title"
                                : "text-gray-title-secondary"
                        }`}
                    >
                        {nextDay.date()}
                    </h3>
                    {showNextDay.length === 0 ? (
                        <div className="empty w-full h-full flex items-center justify-center">
                            <img src={sunSVG} alt="sun" />
                        </div>
                    ) : (
                        <>
                            {showNextDay.map((task, index) => (
                                <div className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
                                    <div className="left flex items-center">
                                        <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                            <img
                                                src={profilePhotoPath}
                                                alt="Avatar"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <p className="text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                            {task.projectName}
                                        </p>
                                    </div>
                                    <div className="detail flex gap-[3px] mr-[10px]">
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                        <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                                    </div>
                                </div>
                            ))}

                            {tasksNextDay.length > 3 && (
                                <div className="showmore task h-[45px] flex items-center justify-center gap-[10px] px-[10px]">
                                    <p className="text-gray-title-secondary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                        Show more
                                    </p>
                                    <img src={moreSVG} alt="" />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="sepaseparator min-w-[3px] self-stretch bg-header-separation rounded-[3px]rator"></div>
            </div>
        </div>
    );
};

export default Agenda;
