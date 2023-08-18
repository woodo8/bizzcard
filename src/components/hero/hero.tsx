import React, { useContext } from 'react'
import { Typography, Button } from "@mui/material"
import "./hero.css"
import { StateContext } from '../../context/useContext'
import { useNavigate } from 'react-router';
import { Reveal } from '../../reveal';
import { useTranslation } from 'react-i18next';
export default function Hero() {
    const { globalUser } = useContext(StateContext);
    const navigate = useNavigate()
    const handleNavigate = (e: any) => {
        e.preventDefault();
        globalUser ? globalUser.subscription === null ?
            navigate("/subscribe_free")
            : navigate("/my_cards")
            : navigate("/signin")
    }
    const { t } = useTranslation();

    return (
        <div className="heroWrapper">
            <div className='hero'>
                <Reveal>
                    <Typography className='typographyhero'>{t("hero-top")}</Typography>
                </Reveal>
                <Reveal>
                    <Typography className='headerHero' variant='h2'>
                        {t("hero-middle")}
                    </Typography>
                    {/* Поднимитесь на новый уровень взаимодействия с клиентами */}
                </Reveal>
                <Reveal>
                    <Typography className='typographyhero'>{t("hero-bottom")}</Typography>
                </Reveal>
                <Button onClick={handleNavigate} className='buttonHero'>{t("hero-button")}</Button>
            </div>
        </div >
    )
}