import Card from './Card';

function Column({title, tasks}) {

    return (
        <div className="w-full">
            <h3 className="text-[18px] text-gray-title-secondary leading-[18px] font-semibold [letter-spacing:-0.05em] mb-[32px] px-[10px]">{title}</h3>

            <div className={`${title.split(' ').join('')} w-full px-[6px] grid gap-[10px]`}>

                {/* Map ici */}
                {tasks.map(task => (
                    <Card key={task.id} task={task}/>
                ))}

            </div>
        </div>
    );
}

export default Column;
