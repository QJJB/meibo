import { useDroppable } from '@dnd-kit/core';
import Card from './Card';

function Column({ id, title, tasks, projectId, users, roles }) {

    const { setNodeRef } = useDroppable({
        id: id,
    });

    return (
        <div className="w-full">
            <h3 className="text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] mb-[32px] px-[10px]">{title}</h3>

            <div ref={setNodeRef} className={`${title.split(' ').join('')} w-full px-[6px] grid gap-[10px]`}>

                {/* Map ici */}
                {tasks.map(task => (
                    <Card key={task.id} task={task} projectId={projectId} users={users} roles={roles}/>
                ))}

            </div>
        </div>
    );
}

export default Column;
