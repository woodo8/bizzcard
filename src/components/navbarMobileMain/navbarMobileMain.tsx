import { Button, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import "./navbarMobileMain.css"
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { useNavigate } from 'react-router';
import RussiaFlag from '../../assets/images/russiaFlag.js';


interface propsTypes {
    lang: string;
    handleChange: any;
    className: string;
    setMenuActive: any;
}

export default function NavbarMobileMain(props: propsTypes) {

    const navigate = useNavigate()
    const { lang, handleChange, className, setMenuActive } = props;

    const closeMenu = () => {
        setMenuActive(false)
    }

    return (
        <div className={`navbarMobileMain ${className}`}>
            <div className="d-flex justify-between align-center">
                <Typography className='navHeading' variant='h6'>Меню</Typography>
                <HighlightOffRoundedIcon onClick={closeMenu} className='exitIcon' />
            </div>
            <ul className="navlistMobile">
                <li onClick={closeMenu} >
                    {
                        location.pathname != "/" ?
                            <Typography onClick={() => navigate("/")}>
                                Кто мы
                            </Typography>
                            :
                            <AnchorLink href="#about">
                                <Typography>
                                    Кто мы
                                </Typography>
                            </AnchorLink>
                    }
                </li>

                <li onClick={closeMenu} >
                    {
                        location.pathname != "/" ?
                            <Typography onClick={() => navigate("/")}>
                                Функции
                            </Typography>
                            :
                            <AnchorLink href="#functions">
                                <Typography>
                                    Функции
                                </Typography>
                            </AnchorLink>
                    }
                </li>
                <li onClick={closeMenu} >
                    {
                        location.pathname != "/" ?
                            <Typography onClick={() => navigate("/")}>
                                Как это работает
                            </Typography>
                            :
                            <AnchorLink href="#howItWorks">
                                <Typography>
                                    Как это работает
                                </Typography>
                            </AnchorLink>
                    }
                </li>
                <li onClick={closeMenu} >
                    <Button onClick={() => navigate("/subscribe_free")} className="premium-btnMobile">
                        Premium
                    </Button>
                </li>
                <li >
                    <FormControl>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lang}
                            label="Age"
                            onChange={(e)=>{
                                handleChange(e)
                                closeMenu()
                            }}
                            className="langSelectMobile d-flex align-center"
                            variant='standard'
                        >
                            <MenuItem value={"uz"}><RussiaFlag /> UZ</MenuItem>
                            <MenuItem value={"ru"}><RussiaFlag /> RU</MenuItem>
                            <MenuItem value={"en"}><RussiaFlag /> EN</MenuItem>
                        </Select>
                    </FormControl>
                </li>
            </ul>
        </div>
    )
}
