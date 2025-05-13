import arrowSVG from '../../../../assets/arrow.svg';
import EditProjectButton from '../EditProjectButton';
import ppStarfire from "../../../../assets/pp/starfire.png";
import ppBeastboy from "../../../../assets/pp/beastboy.png";
import ppCyborg from "../../../../assets/pp/cyborg.png";
import ppRaven from "../../../../assets/pp/raven.png";
import ppKirby from "../../../../assets/pp/kirby.jpg";
import ppRobin from "../../../../assets/pp/robin.png";
import { usePage } from '@inertiajs/react';

const Description = ({projects, roles, users}) => {

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

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: '2-digit' };
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString('en-US', options).toUpperCase();

        // Séparer le jour du reste de la date
        const [month, day, year] = formattedDate.split(' ');
        return (
            <>
                {month} <span className="text-[#F7D539]">{day}</span> {year}
            </>
        );
    }

    function showAdmin() {
        // Filtrer les utilisateurs qui ont le rôle "admin"
        const admins = users.filter(user =>
            user.roles.some(role => role.name === "admin")
        );

        // S'il y en a, retourner leur(s) info(s), sinon un message
        if (admins.length > 0) {
            return admins.map(admin => (
                <div key={admin.id} className="flex align-center mb-2">
                    <div className="w-5 h-5 rounded-full overflow-hidden mr-[10px]">
                        <img
                            src={profilePhotoPath}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <p className="text-gray-title-secondary text-[22px] leading-[22px] font-medium [letter-spacing:-0.05em]">
                        {admin.name.toLowerCase()}
                    </p>
                </div>
            ));
        } else {
            return <p>No admin found</p>;
        }
    }


    console.log("Coucou reçus :", users);
    console.log("type: ", typeof(projects));
    return (
        <>
        <div className="project bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
                <div className="head flex justify-between pb-4">
                <div className="left flex gap-5 items-center">
                    <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">Project</h2>
                    <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
                    <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">{projects.name}</p>
                </div>
                <div className="right ">
                    <EditProjectButton project={projects} />
                </div>
            </div>
            <div className="head flex justify-between mb-6">
                <div className="left flex gap-6">
                    <div>

                        <h2 className="text-[#46484C] text-[35px] leading-[30px] font-semibold [letter-spacing:-0.05em]">{formatDate(projects.start_date)}</h2>
                        <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em]">start date</p>
                    </div>
                    <div className="arrow h-[30px] w-[30px]">
                        <img src={arrowSVG} alt="arrow" className="h-full w-full"/>
                    </div>
                    <div>
                        <h2 className="text-[#46484C] text-[35px] leading-[30px] font-semibold [letter-spacing:-0.05em]">{formatDate(projects.end_date)}</h2>
                        <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em]">end date</p>
                    </div>
                </div>
            </div>
            <div className="head flex justify-between">
                <p className="text-gray-title-secondary text-[18px] leading-[23px] font-semibold [letter-spacing:-0.05em] w-sm">
                    {projects.description}
                </p>
                <div className="owner flex  overflow-auto scrollbar-hide">
                    <p className="flex text-gray-title-secondary text-[18px] leading-[18px] font-semibold [letter-spacing:-0.05em] mr-2">owner: </p>
                    <div className='h-[80px]'>
                        {showAdmin()}
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Description
