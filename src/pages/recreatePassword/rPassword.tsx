import React, { useState } from 'react'
import Logo from '../../assets/images/logo'
import { Grid, FormControl, InputAdornment, OutlinedInput, Typography, Button } from '@mui/material'
import "../signIn/signin.css"
import EmailGrey from '../../assets/images/emailGrey';
import Avatar1 from "../../assets/images/Ellipse 17.png"
import Avatar2 from "../../assets/images/Ellipse 16.png"
import Avatar3 from "../../assets/images/Ellipse 20.png"
import Avatar4 from "../../assets/images/Ellipse 21.png"
import Avatar5 from "../../assets/images/Ellipse 18.png"
import Avatar6 from "../../assets/images/Ellipse 19.png"
import NavbarAuth from '../../components/navbarAuth/navbarAuth';
import { useNavigate } from 'react-router';


export default function RPassword() {

    const navigate = useNavigate()

    return (
        <Grid container className='signin d-block'>
            <NavbarAuth typography={
                <Typography className='navigator'>
                    Вспомнили свой пароль ?
                    <a className='pointer' onClick={() => navigate("/signin")} > Войдите в систему прямо сейчас!  </a>
                </Typography>
            } />
            <div className='avs'>
                <img className='img1' src={Avatar1} alt="avatar" />
                <img className='img2' src={Avatar2} alt="avatar" />
                <img className='img3' src={Avatar3} alt="avatar" />
                <img className='img4' src={Avatar4} alt="avatar" />
                <img className='img5' src={Avatar5} alt="avatar" />
                <img className='img6' src={Avatar6} alt="avatar" />А
            </div>
            <Grid item xs={12} sm={7} md={6} lg={5} className="wrapper d-block">
                <Typography className='heading' variant='h4'>Сброс пароля</Typography>
                <Typography className='description'> мы вышлем вам электронное письмо  со ссылкой для сброса пароля к вашей учётной записи</Typography>
                <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-email"
                        type="text"
                        className='input'
                        placeholder='E-mail  аддресс'
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailGrey />
                            </InputAdornment>
                        }

                    />
                </FormControl>
                <Button fullWidth className="submitBtn">Получить ссылку для сброса</Button>
            </Grid>
        </Grid>
    )
}
