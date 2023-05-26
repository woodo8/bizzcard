import React, { useContext } from 'react'
import { Typography, Button } from "@mui/material"
import "./hero.css"
import { StateContext } from '../../context/useContext'
import { useNavigate } from 'react-router';

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
    return (
        <div className="heroWrapper">
            <div className='hero'>
                <Typography className='typographyhero'>BIZCARD - это новый взгляд на “умных” визитных карточек</Typography>
                <Typography className='headerHero' variant='h2'>Поднимитесь на новый уровень взаимодействия с клиентами</Typography>
                <Typography className='typographyhero'>Попробуйте прямо сейчас создать визитку. Мы предлагаем красивый и понятный дизайн и классное взаимодействие. Это наш главный ключ к успеху!</Typography>
                <Button onClick={handleNavigate} className='buttonHero'>Создать бесплатную визитку</Button>
            </div>
        </div>
    )
}
