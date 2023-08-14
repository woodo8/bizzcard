import React from 'react';
import { Grid, Typography } from '@mui/material';
import NavbarAuth from '../../components/navbarAuth/navbarAuth';
import { useNavigate } from 'react-router';
import "./loginSuccess.css"
import transition from '../../transition';

const LoginSuccess = () => {
    const navigate = useNavigate();
    return (

        <div className='successWrapper'>
            <h1>&#128526;</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>Ваш адрес электронной почты успешно подтвержден.</h2>
                <p> Теперь вы можете войти с помощью кнопки ниже.</p>
                <a onClick={() => navigate("/signin")}>Войти</a>
            </div>
        </div>
    )
}

export default transition(LoginSuccess);