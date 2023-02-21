import React, { useState } from 'react'
import Logo from '../../assets/images/logo'
import { Grid, FormControl, IconButton, InputAdornment, OutlinedInput, Typography, FormControlLabel, Checkbox, Button } from '@mui/material'
import "../signIn/signin.css"
import EmailGrey from '../../assets/images/emailGrey';
import ProfileGrey from '../../assets/images/profileGrey';
import LockGrey from '../../assets/images/lockGrey';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import Avatar1 from "../../assets/images/Ellipse 17.png"
import Avatar2 from "../../assets/images/Ellipse 16.png"
import Avatar3 from "../../assets/images/Ellipse 20.png"
import Avatar4 from "../../assets/images/Ellipse 21.png"
import Avatar5 from "../../assets/images/Ellipse 18.png"
import Avatar6 from "../../assets/images/Ellipse 19.png"
import NavbarAuth from '../../components/navbarAuth/navbarAuth';
import { useNavigate } from 'react-router';

export default function Signup() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <Grid container className='signin d-block'>
            <NavbarAuth typography={
                <Typography className='navigator'>
                    Уже есть аккаунт ?
                    <a className='pointer' onClick={()=>navigate("/signin")} > Войти в существующий </a>
                </Typography>
            } />
            <div className='avs'>
                <img className='img1' src={Avatar1} alt="avatar" />
                <img className='img2' src={Avatar2} alt="avatar" />
                <img className='img3' src={Avatar3} alt="avatar" />
                <img className='img4' src={Avatar4} alt="avatar" />
                <img className='img5' src={Avatar5} alt="avatar" />
                <img className='img6' src={Avatar6} alt="avatar" />
            </div>
            <Grid item xs={4} className="wrapper d-block">
                <Typography className='heading' variant='h4'>Регистрируйся сейчас</Typography>
                <Typography className='description'>Вводитье свои данные для регистрации аккаунта</Typography>
                <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
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
                        type="text"
                        className='input'
                        placeholder='Ф.И.О'
                        startAdornment={
                            <InputAdornment position="start">
                                <ProfileGrey />
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
                <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password1"
                        type={showPassword1 ? 'text' : 'password'}
                        className='input'
                        placeholder='Подтвердите пароль'
                        startAdornment={
                            <InputAdornment position="start">
                                <LockResetOutlinedIcon style={{ color: '#AAAAAA', height: "24px" }} />
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword1}
                                    onMouseDown={handleMouseDownPassword1}
                                    edge="end"
                                >
                                    {showPassword1 ? <VisibilityOffOutlinedIcon style={{ color: "#aaa" }} /> : <VisibilityOutlinedIcon style={{ color: "#aaa" }} />}
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
                <FormControlLabel
                    className='checkboxWrapper'
                    control={<Checkbox defaultChecked />}
                    label={
                        <Typography>Я принимаю условия <a>оферты</a> и <a>политика конфиденциальности</a></Typography>
                    }
                />
                <Button fullWidth className="submitBtn">Регистрироваться сейчас</Button>
            </Grid>
        </Grid>
    )
}
