import React, { useContext, useEffect, useState } from 'react'
import NavbarMain from '../../components/navbarMain/navbarMain'
import Grid from '@mui/material/Grid';
import "./myCards.css"
import { Button, Skeleton, Typography } from '@mui/material';
import { useGetAllCardsQuery, useGetMyCardsQuery } from '../../services/cardsApi';
import { StateContext } from '../../context/useContext';
import moment from 'moment';
import { useNavigate } from 'react-router';
import { uploadsImg } from '../../utils/uploadsImg';
import BackgroundImg from "../../assets/images/profileBg.png";
import ProfileDefault from '../../assets/images/profileDefault.png'
import Car from '../../assets/images/car';
import Sms from '../../assets/images/sms';
import Linkedin from '../../assets/images/linkedin';
import Facebookcard from '../../assets/images/facebookcard';
import Telegramcard from '../../assets/images/telegramcard';
import PhoneCard from '../../assets/images/phoneCard';
import Loader from '../../components/loader/loader';
import transition from '../../transition';

const MyCards = () => {

    let token = localStorage.getItem("token");

    const { globalUser } = useContext(StateContext);

    const navigate = useNavigate();

    const { data: cards, error, isLoading, isSuccess, isError } = useGetMyCardsQuery({ token, id: globalUser.id });


    useEffect(() => {
        console.log(cards)
        if (cards) {
            let newArr = [...cards]
            let sortedArray = newArr.sort(function (a: any, b: any) {
                // @ts-ignore
                return new Date(b.updatedAt) - new Date(a.updatedAt);
            })
            console.log(sortedArray);
        }
    }, [isLoading])


    return (
        <>
            <NavbarMain />
            <Loader className={isLoading ? "active" : "disap"} />
            <Grid container spacing={4} className='myProfile myCards'>
                <Grid item xs={12}>
                    <Typography variant="h5" className='sevtionHeader'>My cards</Typography>
                </Grid>
                <Grid className='card-item bg-main' item xs={6} lg={4}>
                    <Button onClick={() => {
                        navigate("/create_card/0/0")
                    }} className="card-content">
                        +
                    </Button>
                    <h2>Add new card</h2>
                </Grid>
                {
                    cards && cards.length !== 0 && cards.map((card: any) => (
                        <Grid onClick={() => { navigate(`/bizz_card/${card._id}`) }} className='card-item' item xs={6} lg={4}>
                            <div className="card-content">
                                <div style={
                                    card.background_img ? {
                                        background: `url(${card.background_img})`
                                    } : {
                                        background: `url(${BackgroundImg})`
                                    }} className="sectionBg"></div>
                                <div className='bg-black'>
                                    <div className="imgBox">
                                        <img src={card.profile_img ? card.profile_img : ProfileDefault} alt="profileImg" />
                                    </div>
                                    <Typography variant='h3' className='name'>{card.name}</Typography>
                                    <Typography variant='h5' className='profession'>{card.expertise}</Typography>
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
                                    <Skeleton className="skeletons" />
                                    <Skeleton className="skeletons" />
                                    <Skeleton className="skeletons" />
                                    <Skeleton className="skeletons" />
                                    <Skeleton className="skeletons" />
                                    <Skeleton className="skeletons" />
                                </div>
                            </div>
                            <h2>{card.name}</h2>
                            <h3>{card.expertise}</h3>
                            <p>Last updated: {moment(card.updatedAt).locale("uz").format('LLL')}</p>
                        </Grid>
                    ))
                }

            </Grid>
        </>
    )
}

export default transition(MyCards)
