import { Grid } from '@mui/material'
import React from 'react'
import Logo from '../../assets/images/logo'


type valuee = {
    typography: any
}

export default function NavbarAuth(props: valuee) {

    return (
        <Grid item xs={12} className="navbarAuth">
            <Logo />
            <div>
                {props.typography}
            </div>
        </Grid>
    )
}
