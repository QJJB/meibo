import arrowSVG from '../../../../assets/arrow.svg';
import EditProjectButton from '../EditProjectButton';
import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";
import { usePage } from '@inertiajs/react';

const Team = ({users}) => {
    const { auth } = usePage().props; // Récupère les données utilisateur
    const profilePhotoName = auth.user?.profile_photo
    ? auth.user.profile_photo.split('/').pop() // Récupère la dernière partie de l'URL
    : "default-avatar";

    const photoMap = {
        starfire: ppStarfire,
        beastboy: ppBeastboy,
        cyborg: ppCyborg,
        raven: ppRaven,
        kirby: ppKirby,
        robin: ppRobin,
    };

    const profilePhotoPath = photoMap[profilePhotoName] || "/default-avatar.png";

    return (
        <div className="relative agenda bg-dark-secondary rounded-[20px] overflow-auto scrollbar-hide row-span-2">
            <div className="bg-dark-secondary sticky top-0 head flex justify-between pb-4 px-[30px] py-[30px]">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">Team</h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">{users.length} {users.length > 1 ? 'members' : 'member'}</p>
                </div>
                <div className="right ">
                    <button className="today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px]">Manage</button>
                </div>
            </div>

            <div className="block-role h-[140px] pl-8 mt-5">
            
                {users.map(user => (
                    <div className="flex justify-between w-full gap-[24px] mb-3">

                        <div className="flex items-center gap-3">
                            <div className='w-10 h-10 rounded-full overflow-hidden'>
                                <img
                                    src={profilePhotoPath}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">{user.name}</p>
                        </div>
   
                        <div className="gap-2 flex items-center flex-row-reverse pr-[30px]">
                            {user.roles.map(role=>(
                                <p className="bg-accent rounded-lg px-3">{role.name}</p>
                            ))}   
                        </div>

                    </div>
                ))}
                
                
            </div>

        </div>
    )
}

export default Team
