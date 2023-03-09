import { Button, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import SidebarSubscription from '../../components/sidebarSubscription/sidebarSubscription'
import Logo_original from '../../assets/images/gold 1.png'
import TickCircle from '../../assets/images/tick-circle'
import "./subscriptionPrem.css"
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

export default function SubscriptionPrem() {

    const [menuOpen, setMenuOpen] = useState<boolean>(true)

    return (
        <Grid container className='subscriptionPrem'>
            <SidebarSubscription setPremMenuOpen={setMenuOpen} />
            <Grid item xs={12} md={8}>
                <Grid container className={`wrapper ${!menuOpen && "disap"}`}>
                    <Grid item xs={12} md={7}>
                        <div className="heading premium">
                            <HighlightOffRoundedIcon onClick={()=>setMenuOpen(false)} className='closeIcon mobileViewOnly' />
                            <img src={Logo_original} alt="logo" />
                            <div className="preBox">Premium</div>
                        </div>
                        <Typography className='text-center heading mobileViewOnly' variant='h3'>
                            Перейти на BizzCard Premium
                        </Typography>
                        <Typography className='text-center sub mobileViewOnly'>
                            На 100% лучше остальных
                        </Typography>
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
                                    <TickCircle />
                                    <Typography>
                                        E-mail
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <TickCircle />
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
                                    <TickCircle />
                                    <Typography>
                                        Локация
                                        <br />
                                        <span>Вы сможете добавить локацию своего офиса</span>
                                    </Typography>
                                </li>
                                <li className='d-flex align-center'>
                                    <TickCircle />
                                    <Typography>
                                        QR-код
                                    </Typography>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid className='right' xs={12} item md={5}>
                        <Typography className='text-center heading mobileViewNone' variant='h3'>
                            Перейти на BizzCard Premium
                        </Typography>
                        <Typography className='text-center sub mobileViewNone'>
                            На 100% лучше остальных
                        </Typography>

                        <div className="priceBox prem">
                            <Typography variant="h3">
                                99 000 UZS
                            </Typography>
                            <Typography >
                                И бесконечные возможности с вами
                            </Typography>
                        </div>

                        <Button className='prem'>
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
