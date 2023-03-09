import { Grid } from '@mui/material'
import React from 'react'
import Logo from '../../assets/images/logo'
import "./navbarAuth.css"


type valuee = {
    typography: any
}

export default function NavbarAuth({typography}: valuee) {

    return (
        <Grid item xs={12} className="navbarAuth">
            <Logo />
            <div>
                {typography}
            </div>
        </Grid>
    )
}
