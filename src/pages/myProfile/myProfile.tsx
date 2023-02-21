import React from 'react'
import "./myProfile.css"
import ProfilePhoto from "../../assets/images/profile.png"
import { Button, Grid, Typography } from '@mui/material'
import Car from '../../assets/images/car'
import AccordionProfile from '../../components/accordionProfile/accordionProfile'
import NavbarMain from '../../components/navbarMain/navbarMain'

export default function MyProfile() {
    return (
        <>
            <NavbarMain />
            <Grid container className='myProfile'>
                <Grid className="wrapper" item xs={12}>
                    <div className='wrapper-child'>

                        <div className="sectionBg"></div>
                        <div className='bg-black'>
                            <div className="imgBox">
                                <img src={ProfilePhoto} alt="profileImg" />
                            </div>
                            <Typography variant='h3' className='name'>Самадович Акмал Турсунов</Typography>
                            <Typography variant='h5' className='profession'>Бизнес аналитик</Typography>
                            <ul className='media d-flex justify-between align-center'>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                                <li>
                                    <div className="circle">
                                        <Car />
                                    </div>
                                    <Typography>Lokatsiya</Typography>
                                </li>
                            </ul>
                            <Button>
                                Сохранить профиль
                            </Button>
                            <Typography variant="h5">
                                Коротко обо мне
                            </Typography>
                            <Typography>
                                Джеймс - опытный менеджер по работе с клиентами с четырехлетним опытом предоставления решений разнообразной клиентской базе. Получив степень в области делового администрирования с акцентом на менеджмент, Джеймс может создавать эффективные стратегии для управления и повышения эффективности работы с клиентами. Его ценный опыт, позитивная личность и творческая проницательность сделали его незаменимым членом команды обслуживания клиентов Tennent Industries.
                            </Typography>

                            <AccordionProfile />
                        </div>
                    </div>
                </Grid>

            </Grid>
        </>
    )
}
