import React from 'react'
import "./myProfile.css"
import ProfilePhoto from "../../assets/images/profile.png"
import { Button, Grid, Typography } from '@mui/material'
import Car from '../../assets/images/car'
import AccordionProfile from '../../components/accordionProfile/accordionProfile'
import NavbarMain from '../../components/navbarMain/navbarMain'
import Carousel from '../../components/carousel/carousel'
import ProfileForm from '../../components/profileForm/profileForm'
import EditProfile from '../editProfile/editProfile'
import TabsUnstyled from '@mui/base/TabsUnstyled';
import { TabsList, Tab, TabPanel } from './utils'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Footer from '../../components/footer/footer'

export default function MyProfile() {
    return (
        <>
            <NavbarMain />
            <Grid container className='myProfile'>
                <Grid className="wrapper" item xs={12}>
                    <TabsUnstyled defaultValue={0}>
                        <TabsList>
                            <Tab>Мой BizzCard</Tab>
                            <Tab>Изменить BizzCard</Tab>
                        </TabsList>
                        <TabPanel value={0}>

                            <div className='wrapper-child'>
                                <div className="sectionBg"></div>
                                <div className='bg-black'>
                                    <div className="imgBox">
                                        <img src={ProfilePhoto} alt="profileImg" />
                                    </div>
                                    <Typography variant='h3' className='name'>Самадович Акмал Турсунов</Typography>
                                    <Typography variant='h5' className='profession'>Бизнес аналитик</Typography>


                                    {/* MEDIA PART */}
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
                                    <Button className='saveProfile'>
                                        Сохранить профиль
                                    </Button>
                                    <Typography className='aboutMe' variant="h5">
                                        Коротко обо мне
                                    </Typography>
                                    <Typography className='description'>
                                        Джеймс - опытный менеджер по работе с клиентами с четырехлетним опытом предоставления решений разнообразной клиентской базе. Получив степень в области делового администрирования с акцентом на менеджмент, Джеймс может создавать эффективные стратегии для управления и повышения эффективности работы с клиентами. Его ценный опыт, позитивная личность и творческая проницательность сделали его незаменимым членом команды обслуживания клиентов Tennent Industries.
                                    </Typography>

                                    {/* CONTACTS AND SERVICES */}
                                    <AccordionProfile />
                                </div>


                                {/* MY CASES */}
                                <Carousel />

                                {/* FORM */}
                                <ProfileForm />


                                <div className="share">
                                    <Typography variant='h6'>Поделись моей визиткой с друзьями</Typography>
                                    <div className="d-flex align-center justify-center">
                                        <div className="item">
                                            <div className="iconBox orange">
                                                <EmailOutlinedIcon />
                                            </div>
                                            <Typography>SMS</Typography>
                                        </div>
                                        <div className="item">
                                            <div className="iconBox blue">
                                                <FacebookOutlinedIcon />
                                            </div>
                                            <Typography>Facebook</Typography>
                                        </div>
                                        <div className="item">
                                            <div className="iconBox lightBlue">
                                                <TelegramIcon />
                                            </div>
                                            <Typography>Telegram</Typography>
                                        </div>
                                        <div className="item">
                                            <div className="iconBox red">
                                                <AlternateEmailIcon />
                                            </div>
                                            <Typography>E-mail</Typography>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value={1}>
                            <EditProfile />
                        </TabPanel>
                    </TabsUnstyled>

                </Grid>
            </Grid>
            <Footer/>
        </>
    )
}
