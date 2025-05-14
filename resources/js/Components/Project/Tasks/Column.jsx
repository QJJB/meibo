import { useDroppable } from '@dnd-kit/core';

function Column(props) {

    const { id } = props;

    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="w-full h-full max-h-full overflow-x-hidden overflow-y-auto scrollbar-hide">
            <div ref={setNodeRef} className="w-full px-[6px] flex flex-col flex-1 h-full gap-[10px]">
                {props.children}
            </div>
        </div>
    );
}

export default Column;
