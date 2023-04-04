import React, { useState, useEffect, useContext } from 'react'
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
import { useSigninMutation } from '../../services/authApi';
import { validateEmail } from '../../utils/validateEmail';
import CircularProgress from '@mui/material/CircularProgress';
import { StateContext } from '../../context/useContext';

export default function Signin() {

    const { setGlobalUser } = useContext(StateContext);

    // Usestates for password values
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    // Configuring mutation from RTK
    const [sendUser, result] = useSigninMutation();

    const { data, error, isError, isLoading, isSuccess } = result;


    // Usestates to store input values
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    // UseStates to handle errors
    const [emailInvalid, setEmailInvalid] = useState<string>("");
    const [passwordNotValid, setPasswordNotValid] = useState<string>("");
    const [serverError, setServerError] = useState<string>("");


    const navigate = useNavigate();


    // SignIn function
    const handleSignIn = async (e: any) => {
        e.preventDefault();

        // Check if the email is valid
        const emailIsValid = validateEmail(email);
        if (!emailIsValid) {
            return setEmailInvalid("Ваш адрес электронной почты недействителен!");
        } else {
            setEmailInvalid("");
        }

        // Check if the password length is not less than 8
        if (password.length < 8) {
            return setPasswordNotValid("Длина пароля должна быть больше 8!");
        } else {
            setPasswordNotValid("");
        }

        const user = {
            email: email,
            password: password,
        };
        await sendUser(user);
    }

    useEffect(() => {
        if (isError && 'data' in error) {
            if (error.data === "User does not exist") {
                setEmailInvalid("Пользователь не существует!");
            } else if (error.data === "Invalid credentials") {
                setPasswordNotValid("Предоставленные данные (электронная почта или пароль) неверны");
            } else if (error.data === "Internal server error!") {
                setServerError("Внутренняя ошибка сервера! Пожалуйста, повторите попытку позже!");
            } else if (error.data === "Email is not verified") {
                setEmailInvalid("Этот адрес электронной почты не подтвержден. Пожалуйста, подтвердите свой адрес электронной почты или введите другой адрес электронной почты!");
            } else {
                setPasswordNotValid("");
                setServerError("");
                setEmailInvalid("");
            }
        }
        if (isSuccess) {
            localStorage.setItem("user", JSON.stringify(data.result));
            // Update the user in Context
            setGlobalUser(data.result)
            localStorage.setItem("token", data.token);
            navigate("/subscribe_free")
        }

    }, [result])

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
                        onChange={(e) => setEmail(e.target.value)}
                        startAdornment={
                            <InputAdornment position="start">
                                <EmailGrey />
                            </InputAdornment>
                        }

                    />
                </FormControl>
                {emailInvalid && <Typography className='errorText'>{emailInvalid}</Typography>}
                <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        className='input'
                        placeholder='Установите пароль'
                        onChange={(e) => setPassword(e.target.value)}
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
                {passwordNotValid && <Typography className='errorText'>{passwordNotValid}</Typography>}
                {serverError && <Typography className='errorText'>{serverError}</Typography>}
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
                <Button disabled={isLoading ? true : false} onClick={(e) => handleSignIn(e)} fullWidth className="submitBtn">
                    {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                    Войти в аккаунт
                </Button>
            </Grid>
        </Grid>
    )
}
