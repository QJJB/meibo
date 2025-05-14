import { useDraggable } from "@dnd-kit/core";

import ppKirby from "../../../../assets/pp/kirby.jpg";
import handSVG from "../../../../assets/hand.svg";

import dayjs from "dayjs";

function Card({ task }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });

    const style = transform
        ? {
              transform: `translate(${transform.x}px, ${transform.y}px)`,
          }
        : undefined;

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            className="task cursor-grab bg-dark-tertiary rounded-[8px] py-[10px] px-[12px]"
            style={style}
        >
            <div className="head flex justify-between items-center mb-[5px]">
                <div className="left flex items-center gap-[10px]">
                    <h4 className="text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em]">
                        {task.title}
                    </h4>
                    <div className="role">front</div>
                </div>
                <div className="right flex items-center">
                    <p className="[letter-spacing:-0.05em]">
                        {dayjs(task.due_date).format("MMM D").toLowerCase()}
                    </p>
                </div>
            </div>
            <div className="body min-h-[57px]">
                <p className="text-[15px] leading-[16px] text-yellow-meibo mb-[25px] [letter-spacing:-0.05em] line-clamp-2">
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
