import React, { useEffect, useState } from 'react'
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
import { useForgotPasswordMutation } from '../../services/authApi';
import { validateEmail } from "../../utils/validateEmail"
import CircularProgress from '@mui/material/CircularProgress';

export default function RPassword() {

    const navigate = useNavigate();

    // Hook ta handle sending requests to backend
    const [sendEmail, result] = useForgotPasswordMutation();
    const { data, error, isError, isLoading, isSuccess } = result;

    const [email, setEmail] = useState<string>("");

    // usestates to handle errors
    const [emailInvalid, setEmailInvalid] = useState<string>("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Check if the email is valid
        const emailIsValid = validateEmail(email);
        if (!emailIsValid || email.length === 0) {
            return setEmailInvalid("Ваш адрес электронной почты недействителен!");
        } else {
            setEmailInvalid("");
        }

        await sendEmail({ email });
    }

    useEffect(() => {
        if (isError && 'data' in error) {
            console.log(error)
            if (error.data === "User does not exist") {
                setEmailInvalid("Пользователь не существует!");
            } else if (error.data === "Email is invalid") {
                setEmailInvalid("Ваш адрес электронной почты недействителен!");
            } else {
                setEmailInvalid("");
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

            {!isSuccess ?
                (
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
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={isLoading ? true : false}
                            />
                        </FormControl>
                        {emailInvalid && <Typography className='errorText'>{emailInvalid}</Typography>}
                        <Button disabled={isLoading ? true : false} onClick={handleSubmit} fullWidth className="submitBtn">
                            {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                            Получить ссылку для сброса
                        </Button>
                    </Grid>
                ) : (
                    <Grid item xs={12} sm={7} md={6} lg={5} className="wrapper d-block">
                        <Typography className='description'>
                            Мы отправили вам электронное письмо с инструкциями по сбросу пароля!
                        </Typography>
                    </Grid>
                )}
        </Grid>
    )
}
