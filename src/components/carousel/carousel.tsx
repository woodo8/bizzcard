import React, { useEffect, useState } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image, ImageWithZoom, ButtonFirst } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import "./carousel.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Dialog, DialogTitle, Typography } from '@mui/material';
import Case from "../../assets/images/case.png"
import { useGetAllPortfoliosQuery } from '../../services/cardsApi';
import { useParams } from 'react-router';

export default function Carousel(props: any) {
    const { id: cardId } = useParams();
    const [portfolioData, setPortfolioData] = useState<any>([]);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const { data: dataGet, error: errorGet, isLoading: isLoadingGet, isSuccess: isSuccessGet, isError: isErrorGet, refetch } = useGetAllPortfoliosQuery(cardId);

    useEffect(() => {
        if (isErrorGet) {
            alert("something went wrong. Please try again later!");
        }
        if (isSuccessGet) {
            setPortfolioData(dataGet)
            console.log(portfolioData)
            // alert("Portfolio added successfully!");
        }
    }, [isLoadingGet])


    const [playing, setPlaying] = useState<boolean>(true)
    return (
        <div className="carouselWrapper">
            <Typography className='heading' variant='h5'>
                {props.forEdit ? "Example" : "Мои кейсы"}

            </Typography>

            <div className={`carousel-main ${props.forEdit ? "forEdit" : ""}`}>
                {
                    portfolioData &&

                    <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={100}
                        totalSlides={portfolioData.length}
                        infinite={true}
                        isPlaying={false}
                        interval={3000}
                        lockOnWindowScroll={true}
                    >
                        <Slider>
                            {
                                portfolioData && portfolioData.length !== 0 && portfolioData.map((item: any, index: any) => (
                                    <Slide onClick={handleClickOpen} className="slide" onMouseOver={() => setPlaying(false)} onMouseLeave={() => setPlaying(true)} index={index}>
                                        <Image hasMasterSpinner={true} src={item.image} />
                                        {/* <div className="popupBox">
                                            <Typography className="title">
                                                {item.name}
                                            </Typography>
                                            {
                                                // item.description &&
                                                <Typography className="description_portfolio">

                                                    {item.description}
                                                </Typography>
                                            }
                                        </div> */}
                                        {/* <PortfolioContent
                                            open={open}
                                            onClose={handleClose}
                                        /> */}

                                    </Slide>
                                ))
                            }

                        </Slider>
                        <ButtonBack><ArrowBackIosNewIcon /></ButtonBack>
                        <ButtonNext><ArrowForwardIosIcon /></ButtonNext>
                        <DotGroup />
                    </CarouselProvider>
                }
            </div>
        </div >
    )
}

// function PortfolioContent(props: any) {
//     const { open, onClose  } = props;

//     const handleClose = () => {
//         onClose();
//     };

//     return (
//         <Dialog onClose={handleClose} open={open}>
//             <DialogTitle>Set backup account</DialogTitle>

//         </Dialog>
//     );
// }
