import { usePage } from '@inertiajs/react';

function TaskCard() {
    const { tasks, projects } = usePage().props;

    return (
        <div>
            {tasks.length === 0 ? (
                <p>Aucune tâche trouvée.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <div key={task.id} className='task-card bg bg-dark-tertiary [width:calc(100%-30px)] mx-auto h-[192px] rounded-[20px]'>

                            <div className="task-card-header flex flex-row items-center justify-between mt-[22px] mx-[15px] w-[calc(100%-30px)]">
                                <div className="task-card-title flex flex-row space-x-[14px] items-center justify-between">
                                    <div className='w-7 h-7 rounded-full overflow-hidden'>
                                        <img
                                            src="/storage/avatars/mushu-avatar.png"
                                            alt="Avatar"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className='text-yellow-meibo font-semibold text-[20px] [letter-spacing:-0.05em]'>{task.title}</h3>
                                </div>
                                <div className="task-card-date flex flex-row space-x-[10px] items-center justify-between">
                                    <p className='text-yellow-meibo font-light text-[17px] [letter-spacing:-0.05em]'>{task.due_date}</p>
                                    {/* icône */}
                                </div>
                            </div>

                            <div className="task-card-container flex items-center justify-between bg-yellow-meibo [width:calc(100%-30px)] h-[55%] mx-[15px] rounded-[20px] mb-[15px] mt-[15px]">
                                <div className="task-card-description flex flex-col w-[224px] space-y-[8px] ml-[24px] mb-[60px]">
                                    <p className='text-dark-primary text-[15px] font-medium [letter-spacing:-0.05em]'>Important!</p>
                                    <p className='text-dark-primary text-[17px] font-medium [letter-spacing:-0.05em] leading-[21px]'>{task.description}</p>
                                </div>
                                <img src="/storage/task-icons/check.svg" alt="" className='w-[50px] h-[50px] mr-[24px]'/>
                            </div>

                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
}
