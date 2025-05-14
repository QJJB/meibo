import Separator from "./Separator";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import moreSVG from "../../../../assets/more.svg";
import sunSVG from "../../../../assets/sun.svg";


const Column = ({ day, display, tasks, pp }) => {
    console.log("Display length", display.length);

    return (
        <>
            <Separator />
            <div className="day w-full px-[10px] grid grid-rows-4 min-h-[200px]">
                <h3
                    className={`text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px] ${
                        day.isSame(dayjs(), "day")
                            ? "text-white-title"
                            : "text-gray-title-secondary"
                    }`}
                >
                    {day.date()}
                </h3>

                {display.length === 0 ? (
                    <div className="empty w-full h-full flex items-center justify-center">
                        <img src={sunSVG} alt="sun" />
                    </div>
                ) : (
                    <>
                        {display.map((task, index) => {
                            console.log(task);

                            return (
                                <div
                                    key={index}
                                    className="task bg-yellow-meibo border-[2px] border-gray-title-secondary rounded-[15px] h-[45px] flex items-center justify-between px-[10px]"
                                >
                                    <div className="left flex items-center">
                                        <div className="w-7 h-7 rounded-full overflow-hidden mr-[10px]">
                                            <img
                                                src={pp}
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
                            );
                        })}

                        {tasks.length > 3 && (
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
        </>
    );
};

export default Column;
