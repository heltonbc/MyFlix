import CONST from "../data/constants";
import emitter from "../Utils/eventEmitter";
import Score from "./Score";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import trailerDemo from "../assets/trailer-intro.mp4";

const Modal = ({
    poster_path,
    title,
    original_title,
    name,
    original_name,
    overview,
    vote_average,
    runtime,
    number_of_seasons,
    video,
}: any) => {
    const { IMAGEURL } = CONST;

    const handleClick = () => {
        emitter.emit(CONST.EVENTS.ModalClose);
    };

    return (
        <div className="fixed top-0 left-0 z-10 p-12 w-full h-80 grid place-items-center">
            <article className="w-full h-full grid grid-flow-col  p-8 bg-black shadow-lg">
                <img
                    className="justify-self-center"
                    src={`${IMAGEURL}/w400/${poster_path}`}
                    alt={title ? title : name}
                />
                <div className="p-8 relative">
                    <FontAwesomeIcon
                        className="cursor-pointer absolute top-0 right-0 text-red-600"
                        icon={faTimesCircle}
                        size="2x"
                        onClick={handleClick}
                    />
                    <h2 className="text-3xl font-bold">{title ? title : name}</h2>
                    <h6 className="py-8 font-bold">
                        {original_title ? original_title : original_name}
                    </h6>
                    <p className="my-8 py-8 absolute">{overview}</p>
                    <Score value={vote_average} />
                    <span className="bg-red-600 rounded py-2 px-4 ml-2">
                        {runtime ? `${runtime} min.` : `${number_of_seasons}temporadas`}
                    </span>
                    <span className="bg-red-600 rounded py-2 px-4 ml-2">
                        <button>
                            {" "}
                            <FontAwesomeIcon className="mr-2" icon={faPlay} /> Trailer
                        </button>
                    </span>
                    <div className="absolute bottom-0 left-0">
                        <iframe
                            title="Trailer"
                            width="500"
                            height="230"
                            src={trailerDemo}
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </article>
        </div>
    );
};
export default Modal;
