import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram,
    faTwitter,
    faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    const today = new Date();
    return (
        <footer className="pt-4 mt-32 px-12 pb-4 text-gray-600 bg-black text-sm">
            <FontAwesomeIcon
                className="mr-4  hover:text-white cursor-pointer"
                icon={faFacebook}
                size="2x"
            />
            <FontAwesomeIcon
                className="mr-4 hover:text-white cursor-pointer"
                icon={faInstagram}
                size="2x"
            />
            <FontAwesomeIcon
                className="mr-4 hover:text-white cursor-pointer"
                icon={faTwitter}
                size="2x"
            />
            <FontAwesomeIcon
                className="mr-4 hover:text-white cursor-pointer"
                icon={faYoutube}
                size="2x"
            />

            <div className="grid grid-cols-4 gap-2 my-8">
                <a className="hover:text-white" href="#">
                    Idiomas e Legendas
                </a>
                <a className="hover:text-white" href="#">
                    Audiodescrição
                </a>
                <a className="hover:text-white" href="#">
                    Centro de Ajuda
                </a>
                <a className="hover:text-white" href="#">
                    Cartão Pré-pago
                </a>
                <a className="hover:text-white" href="#">
                    Impresa
                </a>
                <a className="hover:text-white" href="#">
                    Relação com Investidores
                </a>
                <a className="hover:text-white" href="#">
                    Carreiras
                </a>
                <a className="hover:text-white" href="#">
                    Termos de uso
                </a>
                <a className="hover:text-white" href="#">
                    Privacidade
                </a>
                <a className="hover:text-white cursor-pointer" href="#">
                    Avisos Legais
                </a>
                <a className="hover:text-white cursor-pointer" href="#">
                    Preferências de Cookies
                </a>
                <a className="hover:text-white cursor-pointer" href="#">
                    Informações Corporativas
                </a>
                <a className="hover:text-white cursor-pointer" href="#">
                    Entre em Contato
                </a>
            </div>
            <p className="grid">© 1997 - {today.getFullYear()} Info Films, Inc.</p>
        </footer>
    );
};

export default Footer;
