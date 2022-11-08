import React from "react";
import Slick from "react-slick";
import mockData, { Movie } from "../data/mock";
import Poster from "./Poster";
import "../components/Carousel.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface CarouselData {
    title?: string;
    data?: Movie[];
}

const Carousel = ({ title = "Carousel", data = mockData }: CarouselData) => {
    /* Enum são dois ou mais valores que se pode ter para o mesmo element, números marcados, valores como up, dow, left, right */
    enum Direction {
        left,
        right,
    }

    const SlickArrow = ({
        direction,
        onClick,
    }: {
        direction: Direction;
        onClick?: () => {};
    }) => (
        <button
            type="button"
            className={`absolute w-16 h-full top-0 z-10 bg-black bg-opacity-100 ${
                direction ? "right-0" : "left-0"
            }`}
            onClick={onClick}
        >
            <FontAwesomeIcon
                icon={direction ? faChevronRight : faChevronLeft}
                size="2x"
            />
        </button>
    );

    const options = {
        infinite: true,
        slidesToScroll: 6,
        variableWidth: true,
        prevArrow: <SlickArrow direction={Direction.left} />,
        nextArrow: <SlickArrow direction={Direction.right} />,
    };

    return (
        <section className="relative carousel">
            <h2 className="relatie z-10 font-bold text-2xl ml-8">{title}</h2>
            <Slick className="relative mb-6 px-12" {...options}>
                {data.map((movie, index) => Poster(movie, index))}
            </Slick>
        </section>
    );
};

export default Carousel;
