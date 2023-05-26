import React from 'react';
import { useNavigate } from 'react-router';
import "../loginSuccess/loginSuccess.css"

export default function OrderSuccess() {
    const navigate = useNavigate();
    return (

        <div className='successWrapper'>
            <h1>&#10004;</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>Ваш заказ успешно зарегистрирован.</h2>
                <p>Теперь вы можете создать свою первую визитную карточку.</p>
                <a onClick={() => navigate("/signin")}>Начать</a>
            </div>
        </div>
    )
}