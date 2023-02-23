import React from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image, ImageWithZoom, ButtonFirst } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./carousel.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Typography } from '@mui/material';
import Case from "../../assets/images/case.png"

export default function Carousel() {
    return (
        <div className="carouselWrapper">
            <Typography className='heading' variant='h5'>
                Мои кейсы
            </Typography>
            <div className='carousel-main'>
                <CarouselProvider
                    naturalSlideWidth={100}
                    naturalSlideHeight={100}
                    totalSlides={4}
                    infinite={true}
                    isPlaying={true}
                    interval={3000}
                    lockOnWindowScroll={true}
                >
                    <Slider>
                        <Slide index={0}><Image hasMasterSpinner={true} src={Case} /></Slide>
                        <Slide index={1}><Image hasMasterSpinner={true} src={Case} /></Slide>
                        <Slide index={2}><Image hasMasterSpinner={true} src={Case} /></Slide>
                        <Slide index={3}><Image hasMasterSpinner={true} src={Case} /></Slide>
                    </Slider>
                    <ButtonBack><ArrowBackIosNewIcon /></ButtonBack>
                    <ButtonNext><ArrowForwardIosIcon /></ButtonNext>
                    <DotGroup />
                </CarouselProvider>

            </div>
        </div>
    )
}
