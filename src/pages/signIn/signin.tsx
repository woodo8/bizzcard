import React, { useState } from 'react'
import { Grid, FormControl, IconButton, InputAdornment, OutlinedInput, Typography, FormControlLabel, Checkbox, Button } from '@mui/material'
import "./signin.css"
import EmailGrey from '../../assets/images/emailGrey';
import LockGrey from '../../assets/images/lockGrey';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import Avatar1 from "../../assets/images/Ellipse 17.png"
import Avatar2 from "../../assets/images/Ellipse 16.png"
import Avatar3 from "../../assets/images/Ellipse 20.png"
import Avatar4 from "../../assets/images/Ellipse 21.png"
import Avatar5 from "../../assets/images/Ellipse 18.png"
import Avatar6 from "../../assets/images/Ellipse 19.png"
import NavbarAuth from '../../components/navbarAuth/navbarAuth';
import { useNavigate } from 'react-router';


export default function Signin() {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const navigate = useNavigate()

    return (
        <Grid container className='signin d-block'>
            <NavbarAuth
                typography={
                    <Typography className='navigator'>
                        Нет аккаунта?
                        <a className='pointer' onClick={() => navigate("/signup")} > Регистрация </a>
                    </Typography>}
            />
            <div className='avs'>
                <img className='img1' src={Avatar1} alt="avatar" />
                <img className='img2' src={Avatar2} alt="avatar" />
                <img className='img3' src={Avatar3} alt="avatar" />
                <img className='img4' src={Avatar4} alt="avatar" />
                <img className='img5' src={Avatar5} alt="avatar" />
                <img className='img6' src={Avatar6} alt="avatar" />
            </div>
            <Grid item xs={12} sm={6} md={5} className="wrapper d-block">
                <Typography className='heading' variant='h4'>Войти</Typography>
                <Typography className='description'>Вводите свои данные для входа на аккаунт</Typography>
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
                <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        className='input'
                        placeholder='Установите пароль'
                        startAdornment={
                            <InputAdornment position="start">
                                <LockGrey />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOffOutlinedIcon style={{ color: "#aaa" }} /> : <VisibilityOutlinedIcon style={{ color: "#aaa" }} />}
                                </IconButton>
                                <IconButton
                                    edge="end"
                                    color='error'
                                    sx={{ marginLeft: "10px" }}
                                >
                                    <ReportGmailerrorredOutlinedIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <div className="d-flex align-center justify-between">

                    <FormControlLabel
                        className='checkboxWrapper'
                        control={<Checkbox />}
                        label={
                            <Typography>Запомни меня</Typography>
                        }
                    />
                    <Typography className="pointer" onClick={() => navigate("/forgotpassword")}>Забыл пароль ?</Typography>
                </div>
                <Button fullWidth className="submitBtn">Войти в аккаунт</Button>
            </Grid>
        </Grid>
    )
}
