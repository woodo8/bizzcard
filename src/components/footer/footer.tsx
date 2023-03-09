import React from 'react'
import Logo from '../../assets/images/logo';
import "./footer.css";
import { Typography, Button } from '@mui/material';
import styled from '@emotion/styled';
import Call from '../../assets/call';
import Email from '../../assets/images/email';
import Web from '../../assets/images/web';
import Instagram from '../../assets/images/instagram';
import Facebook from '../../assets/images/facebook';


const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    padding: '16px 32px',
    border: 'none',
    lineHeight: 1.5,
    backgroundColor: 'white',
    color: "#303030",
    fontSize: "16px",
    fontWeight: "600",
    '&:hover': {
        backgroundColor: "white",
      },
});

export default function Footer() {
    return (
        <section className='footer'>
            <div className="content">
                <Logo />
                <Typography> Возможность самовыражения через визитные карточки, которой раньше просто не существовало. Вы можете наглядно продемонстрировать вашу работу, добавив фотографии, видео и ссылки. </Typography>
                <BootstrapButton>Начать бесплатно</BootstrapButton>
            </div>

            <div className="subs">
                <Typography variant='h5'>Разделы</Typography>
                <ul>
                    <li><a>Кто мы</a></li>
                    <li><a>Функции</a></li>
                    <li><a>Как это работает</a></li>
                    <li><a>F.A.Q.</a></li>
                </ul>
            </div>

            <div className="contacts">
                <Typography variant='h5'>Контактные инфо</Typography>
                <ul>
                    <li><a href="tel:+998991234567" className='d-flex align-center'> <Call /> <span>+998 99 123 45 67</span></a></li>
                    <li><a href="mailto: info@universalbank.uz" className='d-flex align-center'> <Email /> <span>info@universalbank.uz</span></a></li>
                    <li><a href="https://bizzcard.uz/" className='d-flex align-center'> <Web /> <span>bizzcard.uz</span></a></li>
                </ul>
            </div>
            <div className="media">
                <Typography variant='h5'>Социальные сети</Typography>
                <ul>
                    <li><a href="" className='d-flex align-center'> <Instagram /> <span>Instagram</span></a></li>
                    <li><a href="" className='d-flex align-center'> <Facebook /> <span>Facebook</span></a></li>
                    <li><a href="" className='d-flex align-center'> <Web /> <span>Telegram</span></a></li>
                </ul>
            </div>

        </section>
    )
}
