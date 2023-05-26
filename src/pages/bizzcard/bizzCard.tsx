import React, { useContext, useEffect, useState } from 'react'
import "./myProfile.css"
import { Button, Grid, Typography } from '@mui/material'
import Car from '../../assets/images/car'
import AccordionProfile from '../../components/accordionProfile/accordionProfile'
import NavbarMain from '../../components/navbarMain/navbarMain'
import Carousel from '../../components/carousel/carousel'
import ProfileForm from '../../components/profileForm/profileForm'
import Tabs from '@mui/base/Tabs';
import { StyledTabsList, StyledTab, StyledTabPanel } from './utils'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TelegramIcon from '@mui/icons-material/Telegram';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Footer from '../../components/footer/footer'
import EditCard from '../editCard/editCard'
import Linkedin from '../../assets/images/linkedin'
import Sms from '../../assets/images/sms'
import Telegramcard from '../../assets/images/telegramcard'
import Facebookcard from '../../assets/images/facebookcard'
import PhoneCard from '../../assets/images/phoneCard'
import { useGetCardQuery } from '../../services/cardsApi'
import { useLocation, useParams } from 'react-router'
import { StateContext } from '../../context/useContext'
import { uploadsImg } from '../../utils/uploadsImg'
import { convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { EmailShareButton, FacebookShareButton, TelegramShareButton } from 'react-share'
import { Helmet } from "react-helmet";
import BackgroundImg from "../../assets/images/profileBg.png"
import ProfileDefault from '../../assets/images/profileDefault.png'
import Loader from '../../components/loader/loader'

export default function BizzCard() {

    const { id: id } = useParams();
    const { data: card, error, isLoading, isSuccess, isError, refetch } = useGetCardQuery(id);

    const { globalUser } = useContext(StateContext);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    return (
        <>
            {
                card &&
                <Helmet>
                    <meta name="title" content="Default Title" data-react-helmet="true" />
                    <meta name="og:description"
                        content={`Привет! Я ${card.name}  - ${card.expertise}. Проверьте мою цифровую визитную карточку.`} data-react-helmet="true" />
                    <meta name="og:keywords" content={`${card.name}, ${card.expertise}`} data-react-helmet="true" />
                </Helmet>
            }
            <NavbarMain />
            <Loader className={isLoading ? "active" : "disap"} />
            {
                card &&
                <Grid container className='myProfile'>
                    <Grid className="wrapper" item xs={12}>
                        <Tabs defaultValue={0}>
                            {globalUser.id === card.owner &&
                                <StyledTabsList>
                                    <StyledTab className='headingButtons'>Мой BizzCard</StyledTab>
                                    <StyledTab className='headingButtons'>Изменить BizzCard</StyledTab>
                                </StyledTabsList>
                            }
                            <StyledTabPanel value={0}>
                                <div className='wrapper-child'>
                                    <div style={
                                        card.background_img ? {
                                            background: `url(${uploadsImg(card.background_img)})`
                                        } : {
                                            background: `url(${BackgroundImg})`
                                        }} className="sectionBg"></div>
                                    <div className='bg-black'>
                                        <div className="imgBox">
                                            <img src={card.profile_img ? uploadsImg(card.profile_img) : ProfileDefault} alt="profileImg" />
                                        </div>
                                        <Typography variant='h3' className='name'>{card.name}</Typography>
                                        <Typography variant='h5' className='profession'>{card.expertise}</Typography>

                                        {/* MEDIA PART */}
                                        <ul className='media d-flex justify-center align-center'>
                                            {card.location &&
                                                <li>
                                                    <a target="_blank" href={`http://maps.google.com/maps?q=${card.location}`}>
                                                        <div className="circle">
                                                            <Car />
                                                        </div>
                                                        <Typography>Lokatsiya</Typography>
                                                    </a>
                                                </li>}
                                            {card.instagram &&
                                                < li >
                                                    <a target="_blank" href={card.instagram}>
                                                        <div className="circle">
                                                            <Sms />
                                                        </div>
                                                        <Typography>Instagram</Typography>
                                                    </a>
                                                </li>}
                                            {card.linkedin &&
                                                <li>
                                                    <a target="_blank" href={card.linkedin}>
                                                        <div className="circle">
                                                            <Linkedin />
                                                        </div>
                                                        <Typography>Linkedin</Typography>
                                                    </a>
                                                </li>
                                            }
                                            {card.mobile &&
                                                <li>
                                                    <a href={`sms:+${card.mobile}`}>

                                                        <div className="circle">
                                                            <Sms />
                                                        </div>
                                                        <Typography>Sms</Typography>
                                                    </a>
                                                </li>}
                                            {card.facebook &&
                                                <li>
                                                    <a target="_blank" href={card.facebook}>
                                                        <div className="circle">
                                                            <Facebookcard />
                                                        </div>
                                                        <Typography>Facebook</Typography>
                                                    </a>
                                                </li>
                                            }
                                            {card.telegram &&
                                                <li>
                                                    <a target="_blank" href={card.telegram}>
                                                        <div className="circle">
                                                            <Telegramcard />
                                                        </div>
                                                        <Typography>Telegram</Typography>
                                                    </a>
                                                </li>}
                                            {card.mobile &&
                                                <li>
                                                    <a href={`tel:${card.mobile}`}>
                                                        <div className="circle">
                                                            <PhoneCard />
                                                        </div>
                                                        <Typography>Telefon</Typography>
                                                    </a>
                                                </li>
                                            }
                                        </ul>
                                        {/* <Button className='saveProfile'>
                                            Сохранить профиль
                                        </Button> */}
                                        <Typography style={{ marginTop: "20px" }} className='aboutMe' variant="h5">
                                            Коротко обо мне
                                        </Typography>

                                        <Typography className='description'>
                                            {card.draftContent &&
                                                <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(JSON.parse(card.draftContent))) }}></div>
                                            }
                                        </Typography>
                                        {/* CONTACTS AND SERVICES */}
                                        <AccordionProfile card={card} />
                                    </div>

                                    {/* MY CASES */}
                                    {/* <Carousel /> */}

                                    {/* FORM */}
                                    {/* <ProfileForm /> */}


                                    <div className="share">
                                        <Typography variant='h6'>Поделись моей визиткой с друзьями</Typography>
                                        <div className="d-flex align-center justify-center">
                                            <div onClick={() => alert("The url copied to the clipboard. Now you can open the your desired sms application and paste the url to share it!")} className="item">
                                                <div className="iconBox orange">
                                                    <EmailOutlinedIcon />
                                                </div>
                                                <Typography>SMS</Typography>
                                            </div>
                                            <FacebookShareButton
                                                url={`${process.env.REACT_APP_HOST + location.pathname}`}
                                                quote={`${card.name}, ${card.expertise}: Hello! Now you can check out all the info about my services and contacts in my e-business card!`}
                                                children={
                                                    <div className="item">
                                                        <div className="iconBox blue">
                                                            <FacebookOutlinedIcon />
                                                        </div>
                                                        <Typography>Facebook</Typography>
                                                    </div>}
                                            />
                                            <TelegramShareButton
                                                url={`${process.env.REACT_APP_HOST + location.pathname}`}
                                                title={`${card.name}, ${card.expertise}: Hello! Now you can check out all the info about my services and contacts in my e-business card!`}
                                                children={
                                                    <div className="item">
                                                        <div className="iconBox lightBlue">
                                                            <TelegramIcon />
                                                        </div>
                                                        <Typography>Telegram</Typography>
                                                    </div>}
                                            />
                                            <EmailShareButton
                                                url={`${process.env.REACT_APP_HOST + location.pathname}`}
                                                subject="Let me introduce my E-business card"
                                                body={`${card.name}, ${card.expertise}: Hello! Now you can check out all the info about my services and contacts in my e-business card!`}
                                                children={
                                                    <div className="item">
                                                        <div className="iconBox red">
                                                            <AlternateEmailIcon />
                                                        </div>
                                                        <Typography>E-mail</Typography>
                                                    </div>}

                                            />

                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </StyledTabPanel>
                            <StyledTabPanel value={1}>
                                <EditCard card={card} refetchCard={refetch} />
                            </StyledTabPanel>
                        </Tabs>

                    </Grid>
                </Grid>
            }
            <Footer />
        </>
    )
}
