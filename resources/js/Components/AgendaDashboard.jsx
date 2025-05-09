import { useState } from "react";
import ppKirby from "../../assets/pp/kirby.jpg";
import sunSVG from "../../assets/sun.svg";
import moreSVG from "../../assets/more.svg";
import leftSVG from "../../assets/left.svg";
import rightSVG from "../../assets/right.svg";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

const AgendaDashboard = ({ tasks, projects }) => {
    const [activeDay, setActiveDay] = useState(dayjs());
    const previousDay = activeDay.subtract(1, "day");
    const nextDay = activeDay.add(1, "day");

    const [leftHover, setLeftHover] = useState(false);
    const [rightHover, setRightHover] = useState(false);

    function goLeft() {
        setActiveDay((prev) => prev.subtract(1, "day"));
    }

    function goRight() {
        setActiveDay((prev) => prev.add(1, "day"));
    }

    dayjs.extend(customParseFormat);
    const todayFormatted = dayjs().format("MMM D, YYYY");

    function goLeft() {
        setActiveDay((prev) => prev.subtract(1, "day"));
    }

    function goRight() {
        setActiveDay((prev) => prev.add(1, "day"));
    }

    const deadLines = tasks.map(task => {
      const project = projects.find(p => p.id === task.project_id);
      return {
        projectName: project?.name || null,
        taskDueDate: task.due_date
      };
    });
    

    tasks.map((task) => (
      console.log("TASK", task)
    ));

    projects.map((project) => (
      console.log("PROJECT", project)
    ));

    deadLines.map((deadLine) => (
      console.log("DEADLINE", deadLine)
    ));

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
                <div className="right ">
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
                <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div
                    className="day prev w-full px-[10px] flex flex-col gap-[10px]"
                    onMouseEnter={() => setLeftHover(true)}
                    onMouseLeave={() => setLeftHover(false)}
                >
                    <h3 className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">
                        {leftHover ? (
                            <div
                                className="left-arrow flex h-[23px] w-[23px] m-auto justify-center items-center bg-dark-tertiary rounded-full hover:cursor-pointer"
                                onClick={goLeft}
                            >
                                <img src={leftSVG} alt="Left arrow" />
                            </div>
                        ) : (
                            previousDay.date()
                        )}
                    </h3>

                    <div className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
                        <div className="left flex items-center">
                            <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                <img
                                    src={ppKirby}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                Garden plants
                            </p>
                        </div>
                        <div className="detail flex gap-[3px] mr-[10px]">
                            <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                            <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                        </div>
                    </div>

                    <div className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
                        <div className="left flex items-center">
                            <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                <img
                                    src={ppKirby}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                                Garden plants
                            </p>
                        </div>
                        <div className="detail flex gap-[3px] mr-[10px]">
                            <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                            <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
                        </div>
                    </div>

                    <div className="task h-[45px] flex items-center justify-center gap-[10px] px-[10px]">
                        <p className="text-gray-title-secondary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                            Show more
                        </p>{" "}
                        <img src={moreSVG} alt="" />
                    </div>
                </div>

                <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div className="day active w-full px-[15px]">
                    <h3 className="text-white-title text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">
                        {activeDay.date()}
                    </h3>
                    <div className="empty w-full h-full flex items-center justify-center">
                        <img src={sunSVG} alt="sun" />
                    </div>
                </div>

                <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

                <div
                    className="day next w-full px-[15px]"
                    onMouseEnter={() => setRightHover(true)}
                    onMouseLeave={() => setRightHover(false)}
                >
                    <h3 className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">
                        {rightHover ? (
                            <div
                                className="left-arrow flex h-[23px] w-[23px] m-auto justify-center items-center bg-dark-tertiary rounded-full hover:cursor-pointer"
                                onClick={goRight}
                            >
                                <img src={rightSVG} alt="Left arrow" />
                            </div>
                        ) : (
                            nextDay.date()
                        )}
                    </h3>
                </div>

                <div className="sepaseparator w-[3px] self-stretch bg-header-separation rounded-[3px]rator"></div>
            </div>
        </div>
    );
};

export default AgendaDashboard;
