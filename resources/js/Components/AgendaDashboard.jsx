import ppKirby from '../../assets/pp/kirby.jpg'

const AgendaDashboard = () => {
  return (
    <div className="agenda bg-dark-secondary rounded-[20px] px-[30px] py-[30px]">
      <div className="head flex justify-between">
        <div className="left flex gap-5 items-center">
          <h2 className="text-white-title text-[30px] leading-[30px] font-semibold [letter-spacing:-0.05em]">Agenda</h2>
          <div className="separator w-[3px] h-[33px] bg-header-separation rounded-[3px]"></div>
          <p className="text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em]">Sep 23, 2025</p> 
        </div>
        <div className="right ">
          <button className="today text-[20px] leading-[20px] [letter-spacing:-0.05em] font-[500] text-yellow-meibo border-2 px-[20px] py-[5px] rounded-[20px]">Today</button>
        </div>
      </div>

      <div className="body flex justify-between h-full py-[30px]">
        <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

        <div className="day w-full px-[10px] flex flex-col gap-[10px]">
          <h3 className="prev text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">22</h3>

          <div className="task bg-yellow-meibo rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
            <div className="left flex items-center">
            <div className='w-7 h-7 rounded-full overflow-hidden mr-[10px]'>
              <img
                src={ppKirby}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p className='text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]'>Garden plants</p>
            </div>
            <div className="detail flex gap-[3px] mr-[10px]">
              <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
              <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
            </div>
          </div>

          <div className="task bg-yellow-meibo rounded-[15px] h-[45px] flex items-center justify-between px-[10px]">
            <div className="left flex items-center">
            <div className='w-7 h-7 rounded-full overflow-hidden mr-[10px]'>
              <img
                src={ppKirby}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <p className='text-dark-primary text-[20px] leading-[20px] font-semibold [letter-spacing:-0.05em]'>Garden plants</p>
            </div>
            <div className="detail flex gap-[3px] mr-[10px]">
              <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
              <div className="dot w-[6px] h-[6px] bg-dark-primary rounded-full"></div>
            </div>
          </div>

        </div>
        

        <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

        <div className="day w-full px-[15px]">
          <h3 className="active text-white-title text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">23</h3>
        </div>

        <div className="separator w-[3px] self-stretch bg-header-separation rounded-[3px]"></div>

        <div className="day w-full px-[15px]">
          <h3 className="next text-gray-title-secondary text-[23px] leading-[23px] font-semibold [letter-spacing:-0.05em] text-center mb-[15px]">24</h3>
        </div>

        <div className="sepaseparator w-[3px] self-stretch bg-header-separation rounded-[3px]rator"></div>
      </div>
    </div>
  )
}

export default AgendaDashboard