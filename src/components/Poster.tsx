/* O arquivo poster controla cada card de cada filme */
import React from "react";
import emitter from "../Utils/eventEmitter";

import CONST from "../data/constants";
import { Title, TitleType } from "../App";
import Score from "./Score";
import { Movie } from "../data/mock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import "../components/Poster.css";

const Poster = (
    { cover, poster_path, title, name, vote_average, id }: Movie,
    index: number,
) => {
    const { IMAGEURL } = CONST;
    const handleClick = () => {
        const type = title ? TitleType.Movie : TitleType.Series;

        emitter.emit(CONST.EVENTS.PosterClick, { type, id });
    };
    return (
        <article
            className="relative transition-all duration-500 easy-in-out transform hover:scale-110 hover:z-10"
            key={index}
            onClick={handleClick}
        >
            <img
                src={poster_path ? `${IMAGEURL}/w200/${poster_path}` : cover}
                alt={title ? title : name}
            />
            <div className="poster cursor-pointer absolute inset-0 w-full h-full py-8 px-4 grid place-items-center text-center leading-5 bg-black bg-opacity-75 transition-all duration-500 easy-in-out opacity-0">
                <h2 className="text-2xl">{title ? title : name}</h2>
                <FontAwesomeIcon icon={faPlayCircle} size="5x" />
                <Score value={vote_average} />
            </div>
        </article>
    );
};

export default Poster;
