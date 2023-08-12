import { Button, Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import "./sidebarSubscription.css"
import Logo from '../../assets/images/logo'
import Avatar from "../../assets/images/Ellipse 22.png"
import Logo_black from '../../assets/images/gold 2.png'
import Logo_original from '../../assets/images/gold 1.png'
import { useLocation, useNavigate } from 'react-router'
import { StateContext } from '../../context/useContext'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

interface MenuState {
    freeMenuOpen?: boolean;
    premiumMenuOpen?: boolean;
    setFreeMenuOpen?: any;
    setPremMenuOpen?: any;
}

export default function SidebarSubscription({ setFreeMenuOpen, setPremMenuOpen }: MenuState) {
    const navigate = useNavigate();
    const location = useLocation();
    const { globalUser } = useContext(StateContext);

    const userSignedIn = Object.keys(globalUser).length !== 0 ? true : false;

    return (
        <Grid item xs={12} md={4} className='sidebarSubscription'>
            <div className="navbar_subscribe d-flex align-center">
                <Logo />
                {
                    userSignedIn &&
                    <div onClick={() => navigate("/profile")} className='d-flex align-center pointer'>
                        {
                            globalUser.profile_img ?
                                <img className='profileImg' src={globalUser.profile_img} alt="" /> :
                                <AccountCircleOutlinedIcon className='profileImg' color="inherit" />
                        }
                        <Typography className='fullname'>
                            {/* {globalUser.full_name} */}
                            {

                                globalUser.full_name.split(" ").length > 1 ?
                                    globalUser.full_name
                                    : globalUser.full_name.length > 11 ?
                                        globalUser.full_name.slice(0, 12) + "."
                                        : globalUser.full_name

                            }
                        </Typography>
                    </div>
                }
            </div>
            <div className="sub_content">
                <div className='shadowBox'>
                    <Grid container className='containerSub' >
                        <Grid onClick={() => {
                            alert("Currently premium subscription is not available!")
                            // navigate("/subscribe_premium")
                            location.pathname.includes("subscribe_premium") && setPremMenuOpen(true)
                        }} item className='item' xs={12}>
                            <div className="d-flex align-center justify-center">
                                <img src={Logo_original} alt="..." />
                                <Button className='pro'>Premuim</Button>
                            </div>
                            <Typography>Эта версия для тех кто хочет на 100% использовать функционал сайта и получить максимум результата</Typography>
                        </Grid>
                        <Grid onClick={() => {
                            navigate("/subscribe_free")
                            location.pathname.includes("subscribe_free") && setFreeMenuOpen(true)
                        }} item className='item' xs={12}>
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
