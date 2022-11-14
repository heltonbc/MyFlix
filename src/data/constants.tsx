const URL = "https://api.themoviedb.org/3";
const IMAGEURL = "https://image.tmdb.org/t/p";
const APIKEY = "442c6c0255a1cb2887abf537cd81f70c";
const APISTRING = `?api_key=${APIKEY}&language=pt-BR`;

const EVENTS = {
    PosterClick: "PosterClick",
    ModalClose: "ModalClose",
};

export default { URL, IMAGEURL, APIKEY, APISTRING, EVENTS };
