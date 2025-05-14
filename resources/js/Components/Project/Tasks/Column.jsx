import { useDroppable } from '@dnd-kit/core';
import Card from './Card';

function Column({ id, title, tasks, projectId}) {

    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <>
            <div className="w-full h-full max-h-full overflow-y-auto">
                {/* <h3 className="text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] mb-[32px] px-[10px]">{title}</h3> */}
                <div ref={setNodeRef} className={`${title.split(' ').join('')} w-full px-[6px] flex flex-col flex-1 h-full gap-[10px]`}>
                    {tasks.map(task => (
                        <Card key={task.id} task={task} projectId={projectId}/>
                    ))}

                </div>
            </div>
        </>
    );
}

export default Column;
