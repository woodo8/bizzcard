import React, { useEffect, useState } from 'react'
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
import { useSignupMutation } from '../../services/authApi';
import { validateEmail } from '../../utils/validateEmail';
import CircularProgress from '@mui/material/CircularProgress';
import transition from '../../transition';


const Signup = () => {
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


    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [terms, setTerms] = useState<boolean>(false);

    const [addUser, result] = useSignupMutation();
    const { data, error, isError, isLoading, isSuccess } = result;


    // Create useStates for handling error texts
    const [emailInvalid, setEmailInvalid] = useState<string>("");
    const [nameError, setNameError] = useState<string>("");
    const [serverError, setServerError] = useState<string>("");
    const [passwordNotValid, setPasswordNotValid] = useState<string>("");
    const [passwordNoMatch, setpasswordNoMatch] = useState<string>("");
    const [termsNotChecked, setTermsNotChecked] = useState<string>("")

    const signup = async (e: any) => {

        e.preventDefault();

        // Check terms and conditions checkbox is checked
        if (!terms) {
            return setTermsNotChecked("Поставьте галочку, чтобы продолжить!")
        } else {
            setTermsNotChecked("")
        }

        // Check if the email is valid
        const emailIsValid = validateEmail(email);
        if (!emailIsValid) {
            return setEmailInvalid("Ваш адрес электронной почты недействителен!");
        } else {
            setEmailInvalid("")
        }

        // Full name input is not empty
        if (!fullName) {
            return setNameError("Пожалуйста, введите действительное имя!");
        } else {
            setNameError("");
        }

        // Check password length
        if (password.length < 8) {
            return setPasswordNotValid("Длина пароля должна быть больше 8!");
        } else {
            setPasswordNotValid("");
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return setpasswordNoMatch("Пароли не совпадают!");
        } else {
            setpasswordNoMatch("");
        }

        const user = {
            email: email,
            full_name: fullName,
            password: password,
        };
        await addUser(user);
        // onClose();  
    };
    useEffect(() => {
        if (isError && 'data' in error) {
            if (error.data === "Email is invalid") {
                setEmailInvalid("Ваш адрес электронной почты недействителен!");
            } else if (error.data === "User already exists") {
                setEmailInvalid("Пользователь с таким адресом электронной почты уже зарегистрирован!");
            } else if (error.data === "Internal server error!") {
                setServerError("Внутренняя ошибка сервера! Пожалуйста, повторите попытку позже!")
            } else {
                setServerError("")
                setEmailInvalid("")
            }
        }
    }, [isError])

    return (
        <Grid container className='signin d-block'>
            <NavbarAuth typography={
                <Typography className='navigator'>
                    Уже есть аккаунт ?
                    <a className='pointer' onClick={() => navigate("/signin")} > Войти в существующий </a>
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
            <Grid item xs={12} sm={6} md={5} className="wrapper d-block">
                {!isSuccess ?
                    <form>
                        <Typography className='heading' variant='h4'>Регистрируйся сейчас</Typography>
                        <Typography className='description'>Вводитье свои данные для регистрации аккаунта</Typography>
                        <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                id="email"
                                type="text"
                                className='input'
                                placeholder='E-mail  аддресс'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <EmailGrey />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    emailInvalid && <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            color='error'
                                        >
                                            <ReportGmailerrorredOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        {emailInvalid && <Typography className='errorText'>{emailInvalid}</Typography>}

                        <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                id="full_name"
                                type="text"
                                className='input'
                                placeholder='Ф.И.О'
                                startAdornment={
                                    <InputAdornment position="start">
                                        <ProfileGrey />
                                    </InputAdornment>
                                }
                                endAdornment={
                                    nameError && <InputAdornment position="end">
                                        <IconButton
                                            edge="end"
                                            color='error'
                                        >
                                            <ReportGmailerrorredOutlinedIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </FormControl>
                        {nameError && <Typography className='errorText'>{nameError}</Typography>}

                        <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                id="password"
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
                                        {passwordNotValid && <IconButton
                                            edge="end"
                                            color='error'
                                            sx={{ marginLeft: "10px" }}
                                        >
                                            <ReportGmailerrorredOutlinedIcon />
                                        </IconButton>}
                                    </InputAdornment>
                                }
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                        {passwordNotValid && <Typography className='errorText'>{passwordNotValid}</Typography>}

                        <FormControl className="inputbox" fullWidth sx={{ m: 1 }} variant="outlined">
                            <OutlinedInput
                                id="confirm_password"
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
                                        {
                                            passwordNoMatch && <IconButton
                                                edge="end"
                                                color='error'
                                                sx={{ marginLeft: "10px" }}
                                            >
                                                <ReportGmailerrorredOutlinedIcon />
                                            </IconButton>
                                        }
                                    </InputAdornment>
                                }
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </FormControl>
                        {passwordNoMatch && <Typography className='errorText'>{passwordNoMatch}</Typography>}

                        <FormControlLabel
                            className='checkboxWrapper'
                            control={<Checkbox value={terms}
                                onChange={(e) => setTerms(e.target.checked)} />}
                            label={
                                <Typography>Я принимаю условия <a>оферты</a> и <a>политика конфиденциальности</a></Typography>
                            }

                        />
                        {termsNotChecked && <Typography className='errorText'>{termsNotChecked}</Typography>}
                        {serverError && <Typography className='errorText'>{serverError}</Typography>}


                        <Button disabled={isLoading ? true : false} type="submit" onClick={(e) => signup(e)} fullWidth className="submitBtn">
                            {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                            Регистрироваться сейчас
                        </Button>
                    </form> :
                    <Typography>Пользователь успешно зарегистрирован. Мы отправили вам электронное письмо. Только после подтверждения электронной почты вы сможете войти в систему. <span onClick={() => navigate("/signin")} style={{ color: "blue", textDecoration: "underline" }}>Войти</span></Typography>
                }
            </Grid>
        </Grid >
    )
}
export default transition(Signup);