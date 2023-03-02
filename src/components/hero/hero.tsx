import React from 'react'
import { Typography, Button } from "@mui/material"
import "./hero.css"

export default function Hero() {
    return (
        <div className="heroWrapper">
            <div className='hero'>
                <Typography className='typographyhero'>BIZCARD - это новый взгляд на “умных” визитных карточек</Typography>
                <Typography className='headerHero' variant='h2'>Поднимитесь на новый уровень взаимодействия с клиентами</Typography>
                <Typography className='typographyhero'>Попробуйте прямо сейчас создать визитку. Мы предлагаем красивый и понятный дизайн и классное взаимодействие. Это наш главный ключ к успеху!</Typography>
                <Button className='buttonHero'>Создать бесплатную визитку</Button>
            </div>
        </div>
    )
}
