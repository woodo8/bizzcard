import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import SidebarSubscription from '../../components/sidebarSubscription/sidebarSubscription'
import Logo_original from '../../assets/images/gold 2.png'
import TickCircle from '../../assets/images/tick-circle'
import "../subscriptionPremium/subscriptionPrem.css"
import Lock from '../../assets/images/lock'
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';


export default function SubscriptionFree() {
    const [menuOpen, setMenuOpen] = useState<boolean>(true)
    return (
        <Grid container className='subscriptionPrem'>
            <SidebarSubscription  setFreeMenuOpen={setMenuOpen} />
            <Grid item xs={12} md={8}>

                <Grid container className={`wrapper ${!menuOpen && "disap"}`}>
                    <Grid item xs={12} md={7}>
                        <div className="heading simple">
                            <HighlightOffRoundedIcon onClick={() => setMenuOpen(false)} className='closeIcon mobileViewOnly' />
                            <img src={Logo_original} alt="logo" />
                            <div className="preBox">Бесплатно</div>
                        </div>
                        <div className="personalInfos">
                            <Typography className='heading_personal'>Личные данные</Typography>
                            <ul>
                                <li className='d-flex align-center'>
                                    <TickCircle />
                                    <Typography>
                                        Номер
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <TickCircle />
                                    <Typography>
                                        Telegram
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <TickCircle />
                                    <Typography>
                                        Facebook / Instagram
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <Lock />
                                    <Typography>
                                        E-mail
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <Lock />
                                    <Typography>
                                        Добавить номер <br />
                                        <span>Вы можете добавить другие номера для контакта сами</span>
                                    </Typography>
                                </li>
                            </ul>
                        </div>
                        <div className="personalInfos">
                            <Typography className='heading_personal'>Другие функции</Typography>
                            <ul>
                                <li className='d-flex align-center'>
                                    <TickCircle />
                                    <Typography>
                                        Выбрать фон для карточки
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <Lock />
                                    <Typography>
                                        Локация
                                        <br />
                                        <span>Вы сможете добавить локацию своего офиса</span>
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <Lock />
                                    <Typography>
                                        QR-код
                                    </Typography>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid className='right' xs={12} item md={5}>
                        <Typography className='text-center heading' variant='h3'>
                            Перейти на BizzCard Free
                        </Typography>
                        <Typography className='text-center sub'>
                            Попробуй новое общение
                        </Typography>

                        <div className="priceBox simple">
                            <Typography variant="h3">
                                0.00 UZS
                            </Typography>
                            <Typography >
                                И хорошее бывает бесплатно
                            </Typography>
                        </div>

                        <Button className='simple'>
                            Оформить заказ
                        </Button>
                        <Button className='cancel'>
                            Нет, спасибо
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}
