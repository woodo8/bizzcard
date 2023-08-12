import React, { useEffect, useState } from 'react'
import Logo from '../../assets/images/logo'
import { Grid, FormControl, InputAdornment, OutlinedInput, Typography, Button, IconButton } from '@mui/material'
import "../signIn/signin.css"
import EmailGrey from '../../assets/images/emailGrey';
import Avatar1 from "../../assets/images/Ellipse 17.png"
import Avatar2 from "../../assets/images/Ellipse 16.png"
import Avatar3 from "../../assets/images/Ellipse 20.png"
import Avatar4 from "../../assets/images/Ellipse 21.png"
import Avatar5 from "../../assets/images/Ellipse 18.png"
import Avatar6 from "../../assets/images/Ellipse 19.png"
import NavbarAuth from '../../components/navbarAuth/navbarAuth';
import { useNavigate, useParams } from 'react-router';
import LockGrey from '../../assets/images/lockGrey';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { useResetPasswordMutation } from '../../services/authApi';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';


export default function NewPassword() {
    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    const handleClickShowPassword1 = () => setShowPassword1((show1) => !show1);
    const handleMouseDownPassword1 = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [changePassword, result] = useResetPasswordMutation();
    const { data, isSuccess, isError, error, isLoading } = result;

    // Usestates to store input values
    const [password, setPassword] = useState<string>("");
    const [password1, setPassword1] = useState<string>("");

    // Usestates to handle errors
    const [passwordErorr, setPasswordErorr] = useState<string>("");
    const [confirmPasswordErorr, setConfirmPasswordErorr] = useState<string>("");

    const { token } = useParams();

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (password.length === 0) {
            setPasswordErorr("Password length should be no less than 8");
        } else {
            setPasswordErorr("")
        }

        if (password !== password1) {
            setConfirmPasswordErorr("Passwords do not match");
        } else {
            setConfirmPasswordErorr("")
        }
        try {
            const data = { newPassword: password, confirmPassword: password1 }
            await changePassword({ data, token })
        } catch (error) {
            setConfirmPasswordErorr("Something went wrong, please try again later");
        }

    }
    useEffect(() => {
        if (isError && 'data' in error) {
            console.log(error)
            if (error.data === "Passwords do not match") {
                setConfirmPasswordErorr("Passwords do not match!");
            } else {
                setConfirmPasswordErorr("")
            }
        }
    }, [isLoading])

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
                <img className='img6' src={Avatar6} alt="avatar" />
            </div>
            {!isSuccess ? (
                <Grid item xs={12} sm={7} md={6} lg={5} className="wrapper d-block">
                    <Typography className='heading' variant='h4'>Новый пароль</Typography>
                    <Typography className='description'> Пожалуйста, введите новый пароль и подтвердите его!</Typography>
                    <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            className='input'
                            placeholder='Введите пароль'
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading ? true : false}
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
                            placeholder='Подтвердите пароль (перепишите пароль выше)'
                            onChange={(e) => setPassword1(e.target.value)}
                            disabled={isLoading ? true : false}
                            startAdornment={
                                <InputAdornment position="start">
                                    <LockGrey />
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
                    <Button disabled={isLoading ? true : false} onClick={handleSubmit} fullWidth className="submitBtn">
                        {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}

                        Получить ссылку для сброса
                    </Button>
                </Grid>
            ) : (
                <Grid item xs={12} sm={7} md={6} lg={5} className="wrapper d-block">
                    <Typography className='description'>Ваш пароль обновлен. Теперь вы можете войти с новым паролем. <Link to="/signin">Sign in</Link></Typography>
                </Grid>
            )}
        </Grid>
    )

}
