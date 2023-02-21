import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import "./sidebarSubscription.css"
import Logo from '../../assets/images/logo'
import Avatar from "../../assets/images/Ellipse 22.png"
import Logo_black from '../../assets/images/gold 2.png'
import Logo_original from '../../assets/images/gold 1.png'
import { useNavigate } from 'react-router'

export default function SidebarSubscription() {
    const navigate = useNavigate()
    return (
        <Grid item xs={4} className='sidebarSubscription'>
            <div className="navbar_subscribe d-flex align-center">
                <Logo />
                <img className='profileImg' src={Avatar} alt="" />
                <Typography className='fullname'>
                    Abdusamad Abdurakhmonov
                </Typography>
            </div>
            <div className="sub_content">
                <div className='shadowBox'>
                    <Grid container className='containerSub' >
                        <Grid onClick={() => navigate("/subscribe_premium")} item className='item' xs={12}>
                            <div className="d-flex align-center justify-center">
                                <img src={Logo_original} alt="..." />
                                <Button className='pro'>Premuim</Button>
                            </div>
                            <Typography>Эта версия для тех кто хочет на 100% использовать функционал сайта и получить максимум результата</Typography>
                        </Grid>
                        <Grid onClick={() => navigate("/subscribe_free")} item className='item' xs={12}>
                            <div className="d-flex align-center justify-center">
                                <img src={Logo_black} alt="..." />
                                <Button className='simple'>Бесплатно</Button>
                            </div>
                            <Typography>Это версия для тех кто хочет попробовать функционал нашего сайта</Typography>
                        </Grid>
                    </Grid>
                </div>
            </div>

        </Grid>
    )
}
