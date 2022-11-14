// ###################################################
import React, { useState, useEffect } from "react";
import emitter from "./Utils/eventEmitter";
import CONST from "./data/constants";

import Loading from "./components/Loading";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

/* import para adicionar a nova categoria */
import { GenreAction } from "./data/genreaction";
import { GenreComedy } from "./data/genrecomedy";
import { GenreHorror } from "./data/genrehorror";
/*  */

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// ###################################################

export enum TitleType {
    Movie = "movie",
    Series = "tv",
}

export interface Title {
    type: TitleType;
    id: number | string;
}

// ###################################################
const App = () => {
    const { URL, APISTRING } = CONST;

    const [movies, setMovies] = useState<any>();
    const [series, setSeries] = useState<any>();
    const [title, setTitle] = useState<any>();
    const [loading, setLoading] = useState(true);

    /* Seção para adicionar novas categorias // Section to add new categories */
    const [action, setGenreAction] = useState<GenreAction>({} as GenreAction);
    const [comedy, setGenreComedy] = useState<GenreComedy>({} as GenreComedy);
    const [horror, setGenreHorror] = useState<GenreHorror>({} as GenreHorror);
    /*  */

    useEffect(() => {
        movies && console.log(movies);
    }, [movies]);

    /* Seção para adicionar novas categorias // Section to add new categories */
    const getFeaturedAction = () => action && action?.results;
    const getFeaturedComedy = () => comedy && comedy?.results;
    const getFeaturedHorror = () => horror && horror?.results;
    /*  */

    const getFeaturedMovie = () => movies?.results[0];

    const getMovieList = () => {
        if (movies) {
            // eslint-disable-next-line
            const [featured, ...movieList] = movies?.results;
            return movieList;
        }
        return [];
    };

    const getTitle = async ({ type, id }: Title) => {
        setLoading(true);
        const title = await fetch(`${URL}/${type}/${id}${APISTRING}`);
        const titleData = await title.json();
        setTitle(titleData);
        setLoading(false);
    };

    useEffect(() => {
        emitter.addListener(CONST.EVENTS.PosterClick, getTitle);
        emitter.addListener(CONST.EVENTS.ModalClose, () => setTitle(undefined));

        const fetchData = async () => {
            const movies = await fetch(
                `${URL}/discover/movie${APISTRING}&sort_by=popularity.desc`,
            );
            const moviesData = await movies.json();
            setMovies(moviesData);

            const series = await fetch(
                `${URL}/discover/tv${APISTRING}&sort_by=popularity.desc`,
            );
            const seriesData = await series.json();
            setSeries(seriesData);
            /* ************************************************************** */
            /* Seção para adicionar novas categorias // Section to add new categories */

            const action = await fetch(
                `${URL}/discover/tv${APISTRING}&sort_by=popularity.desc&with_genres=10759`,
            );
            const actionData = await action.json();
            setGenreAction(actionData);
            /* ******************************* */

            const comedy = await fetch(
                `${URL}/discover/tv${APISTRING}&sort_by=popularity.desc&with_genres=35,18`,
            );
            const comedyData = await comedy.json();
            setGenreComedy(comedyData);
            /* ******************************* */

            const horror = await fetch(
                `${URL}/discover/movie${APISTRING}&sort_by=popularity.desc&with_genres=27`,
            );
            const horrorData = await horror.json();
            setGenreHorror(horrorData);
            /* ************************************************************** */

            setLoading(false);
        };
        fetchData();
        //return emitter.removeAllListeners();
        // eslint-disable-next-line
    }, []);

    useEffect(() => title && console.log(title), [title]);

    // ###################################################
    return (
        <div className="m-auto antialised font-sans bg-black text-white">
            <>
                {loading && (
                    <>
                        <Loading />
                        <NavBar />
                    </>
                )}
                {!loading && (
                    <>
                        <Hero {...getFeaturedMovie()} />
                        <NavBar />
                        <Carousel
                            title="Filmes Populares no momento"
                            data={getMovieList()}
                        />
                        <Carousel title="Séries Populares" data={series?.results} />
                        {/* ************************************************************** */}
                        {/* a div abaixo pertence a categoria de ação // the div below belongs to the action category */}

                        <div className="relative z-0 section__home2">
                            <Carousel
                                title="Séries de ação e aventura"
                                data={getFeaturedAction()}
                            />
                        </div>
                        <div className="relative z-0 section__home4">
                            <Carousel
                                title="Séries de comédia e drama"
                                data={getFeaturedComedy()}
                            />
                        </div>
                        <div className="relative z-10 section__home3">
                            <Carousel
                                title="Filmes de terror"
                                data={getFeaturedHorror()}
                            />
                        </div>
                        {/* ************************************************************** */}
                    </>
                )}
                <Footer />
                {!loading && title && <Modal {...title} />}
            </>
        </div>
    );
};

export default App;
