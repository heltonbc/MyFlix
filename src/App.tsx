import React, { useState, useEffect } from "react";
import emitter from "./Utils/eventEmitter";
import CONST from "./data/constants";

import Loading from "./components/Loading";
import Hero from "./components/Hero";
import NavBar from "./components/NavBar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export enum TitleType {
    Movie = "movie",
    Series = "tv",
}

export interface Title {
    type: TitleType;
    id: number | string;
}

const App = () => {
    const { URL, APISTRING } = CONST;

    const [movies, setMovies] = useState<any>();
    const [series, setSeries] = useState<any>();
    const [title, setTitle] = useState<any>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        movies && console.log(movies);
    }, [movies]);

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

            setLoading(false);
        };
        fetchData();
        //return emitter.removeAllListeners();
        // eslint-disable-next-line
    }, []);

    useEffect(() => title && console.log(title), [title]);

    return (
        <div className="m-auto antialised font-sans bg-black text-white">
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
                    <Carousel title="Filmes Populares no momento" data={getMovieList()} />
                    <Carousel title="Séries Populares" data={series?.results} />
                </>
            )}
            <Footer />
            {!loading && title && <Modal {...title} />}
        </div>
    );
};

export default App;

/*
Possíveis melhorias no projeto, o botão search na API do TMDB tem a opção find.
search, da pra fazer um search com keyword.
da para implementar uma requisição de generos, pelo discover movie with_genres.
*/
