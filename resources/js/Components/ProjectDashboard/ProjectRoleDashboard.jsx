import ppKirby from '../../../assets/pp/kirby.jpg';

const ProjectRoleDashboard = () => {
    return (
        <div className="relative agenda bg-dark-secondary rounded-[20px] overflow-auto scrollbar-hide">
            <div className="bg-dark-secondary sticky top-0 head flex justify-between pb-4 px-[30px] py-[30px]">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">Team</h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">4 members</p>
                </div>
                <div className="right ">
                    <button className="today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px]">Manage</button>
                </div>
            </div>

            <div className="block-role h-[140px] pl-8">
            

                <div className="flex items-center gap-[24px] mb-3 mt-8">

                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">Bastien</p>
                    <p className="bg-accent rounded-lg px-3">admin</p>

                </div>
                <div className="flex items-center gap-[24px] mb-3">

                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">Bastien</p>
                    <p className="bg-accent rounded-lg px-3">admin</p>

                </div>
                <div className="flex items-center gap-[24px] mb-3">

                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">Bastien</p>
                    <p className="bg-accent rounded-lg px-3">admin</p>

                </div>
                <div className="flex items-center gap-[24px] mb-3">

                    <div className='w-10 h-10 rounded-full overflow-hidden'>
                        <img
                            src={ppKirby}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">Bastien</p>
                    <p className="bg-accent rounded-lg px-3">admin</p>

                </div>
            </div>

        </div>
    )
}

export default ProjectRoleDashboard
