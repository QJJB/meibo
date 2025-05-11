import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

function Tasks() {
    const todayFormatted = dayjs().format("MMM, YYYY");
    return (
        <div className="tasks bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
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
                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px] mt-[50px]"></div>

                <div className="todos next w-full px-[10px] grid grid-rows-4 min-h-[120px]">
                    <h3
                        className='text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em]'
                    >
                        todos
                    </h3>
                </div>

                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px] mt-[50px]"></div>

                <div className="inprogress next w-full px-[10px] grid grid-rows-4 min-h-[120px]">
                    <h3
                        className='text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em]'
                    >
                        in progress
                    </h3>
                </div>

                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px] mt-[50px]"></div>

                <div className="complete next w-full px-[10px] grid grid-rows-4 min-h-[120px]">
                    <h3
                        className='text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em]'
                    >
                        complete
                    </h3>
                </div>

                <div className="separator min-w-[3px] self-stretch bg-header-separation rounded-[3px] mt-[50px]"></div>
            </div>
        </div>
    );
}

export default Tasks;