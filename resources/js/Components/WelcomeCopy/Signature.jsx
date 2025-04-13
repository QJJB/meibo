import meiboSVG from "../../../assets/meibo.svg";

function Signature() {
  return (
    <div className="hero-footer flex flex-col">
      <div className="hero-footer-top flex justify-between items-end">
        <div className="hero-footer-top-left flex font-medium text-xl tracking-tight">
          <div className="lang flex">
            <div className="en">en</div>
            <span className="mx-1">-</span>
            <div className="fr text-gray-600">fr</div>
          </div>
          <div className="year ml-5">2025</div>
        </div>
        <div className="hero-footer-top-right">
          <div className="catchphrase text-right text-5xl leading-15 tracking-tight">
            Streamline — your workflow,
            <br />
            delegate, and keep everyone on the same page
          </div>
        </div>
      </div>
      <div className="hero-footer-bottom flex justify-end">
        <img src={meiboSVG} alt="Handwritten signature of Meibo" />
      </div>
    </div>
  );
}

export default Signature;
