import React, { useContext, useEffect, useState } from 'react'
import Logo from '../../assets/images/logo.js'
import "./navbarMain.css"
//
import { Button, styled, Typography } from "@mui/material"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ProfileImg from '../../assets/images/profileImg.js';
import RussiaFlag from '../../assets/images/russiaFlag.js';
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { useLocation, useNavigate } from 'react-router';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import NavbarMobileMain from '../navbarMobileMain/navbarMobileMain';
import { StateContext } from '../../context/useContext';

function useScrollDirection() {
    const [scrollDirection, setScrollDirection] = useState<null | string>(null);

    useEffect(() => {
        let lastScrollY = window.pageYOffset;

        const updateScrollDirection = () => {
            const scrollY = window.pageYOffset;
            const direction = scrollY > lastScrollY ? "down" : "up";
            if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
            }
            lastScrollY = scrollY > 0 ? scrollY : 0;
        };
        window.addEventListener("scroll", updateScrollDirection); // add event listener
        return () => {
            window.removeEventListener("scroll", updateScrollDirection); // clean up
        }
    }, [scrollDirection]);

    return scrollDirection;
};





export default function NavbarMain() {
    const { globalUser: user } = useContext(StateContext);

    const [lang, setLang] = useState<string>('ru');
    const [menuActive, setMenuActive] = useState<boolean>(false)

    const handleChange = (event: SelectChangeEvent) => {
        setLang(event.target.value as string);
    };
    let location = useLocation();

    const scrollDirection = useScrollDirection();

    const navigate = useNavigate();

    return (
        <div className={`navbarMain ${scrollDirection === "down" ? "-top-24" : "top-0"}`}>
            <MenuOutlinedIcon onClick={() => setMenuActive(true)} className='menuIcon' />
            <Logo />
            <NavbarMobileMain className={menuActive ? "active" : "disab"} setMenuActive={setMenuActive} lang={lang} handleChange={handleChange} />
            <ul className="navlist d-flex align-center">
                <li >
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

                <li>
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
                <li>
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
                <li>
                    <Button onClick={() => navigate("/subscribe_premium")} className="premium-btn">
                        Premium
                    </Button>
                </li>
                <li>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lang}
                            label="Age"
                            onChange={handleChange}
                            className="langSelect d-flex align-center"
                            variant='standard'
                        >
                            <MenuItem value={"uz"}><RussiaFlag /> UZ</MenuItem>
                            <MenuItem value={"ru"}><RussiaFlag /> RU</MenuItem>
                            <MenuItem value={"en"}><RussiaFlag /> EN</MenuItem>
                        </Select>
                    </FormControl>
                </li>
            </ul>
            <Button onClick={() => navigate(user ? "/subscribe_premium" : "/signin")} className='profile-box d-flex align-center justify-between pointer'>
                <ProfileImg />
                {user ?
                    <Typography>
                        {user.full_name.split(" ")[0] + " " + user.full_name.split(" ")[1][0] + "."}
                    </Typography> :
                    <Typography>
                        Личный кабинет
                    </Typography>
                }
            </Button>
        </div>
    )
}
