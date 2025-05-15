import { useDraggable } from "@dnd-kit/core";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import handSVG from "../../../../assets/hand.svg";
import EditTaskButton from "../EditTaskButton";
import dayjs from "dayjs";

function Card({ task, users, roles }) {
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
            <div className="head flex justify-between items-center mb-[8px]">
                <div className="left flex items-center gap-[8px]">
                    <h4 className="text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em]">
                        {task.title}
                    </h4>
                    <div className="priority text-[13px] leading-[13px] [letter-spacing:-0.05em] bg-accent text-yellow-meibo font-semibold px-[12px] pt-[3px] pb-[4px] rounded-[20px] border-gray-title-secondary border-[1px]">
                        {task.priority === 1
                            ? "low"
                            : task.priority === 2
                            ? "medium"
                            : task.priority === 3
                            ? "high"
                            : "Unknown"}
                    </div>
                </div>
                <div className="right flex items-center">
                    <p className="[letter-spacing:-0.05em] text-gray-title-secondary font-semibold">
                        {dayjs(task.due_date).format("MMM D").toLowerCase()}
                    </p>
                </div>
            </div>
            <div className="body min-h-[57px]">
                <p className="text-[15px] leading-[16px] text-yellow-meibo mb-[25px] [letter-spacing:-0.05em] font-[500] line-clamp-2">
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
                <div
                    onPointerDown={e => e.stopPropagation()}
                    onClick={e => e.stopPropagation()}
                >
                <EditTaskButton task={task} users={users} roles={roles} />
                </div>
                <div className="hand w-5 h-5 flex justify-center">
                    <img src={handSVG} alt="Hand icon" />
                </div>
            </div>
        </div>
    );
}

export default Card;
