import ppKirby from '../../../../assets/pp/kirby.jpg';
import handSVG from '../../../../assets/hand.svg';

import dayjs from "dayjs";
// import customParseFormat from "dayjs/plugin/customParseFormat";
// dayjs.extend(customParseFormat);

function Card({task}) {
    console.log("BIEN",task)
    return (
        <div className="task cursor-grab bg-header-separation rounded-[15px] py-[18px] px-[15px]">
            <div className="head flex justify-between items-center mb-[5px]">
                <div className="left flex items-center gap-[10px]">
                    <h4 className="text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]">
                        {task.title}
                    </h4>
                    <div className="role">front</div>
                </div>
                <div className="right flex items-center">
                    <p className="[letter-spacing:-0.05em]">
                        {dayjs(task.due_date).format('MMM D')}
                    </p>
                </div>
            </div>
            <div className="body min-h-[57px]">
                <p className="text-[16px] leading-[16px] text-yellow-meibo mb-[25px] [letter-spacing:-0.05em]">
                    {task.description}
                </p>
            </div>
            <div className="foot flex justify-between items-center">
                <div className="profile w-5 h-5 rounded-full overflow-hidden">
                    <img
                        src={ppKirby}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="hand w-5 h-5 flex justify-center">
                    <img src={handSVG} alt="Hand icon" />
                </div>
            </div>
        </div>
    );
}

export default Card;
