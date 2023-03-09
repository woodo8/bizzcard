import { Button, Grid, TextareaAutosize, Typography } from '@mui/material'
import React from 'react'
import "./profileForm.css"
import TelegramIcon from '@mui/icons-material/Telegram';
import { CustomTextField } from './utils';

export default function ProfileForm() {
    return (
        <div className='profileForm'>
            <Typography className="heading" variant='h5'>Чтобы получить первичную консультацию и записаться на прием, нажмите здесь:</Typography>
            <div className="iconBocx">
                <TelegramIcon />
            </div>
            <form action="submit">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            Оставьте детали и я свяжусь с вами
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomTextField
                            label="Телефон"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item  xs={12} md={6}>
                        <CustomTextField
                            label="Имя"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomTextField
                            label="Электронная почта"
                            variant="outlined"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <textarea placeholder='Ваше сообщение' className='messageBox' name="message" id="messageBox" ></textarea>
                    </Grid>
                    <Grid item xs={5} md={7}></Grid>
                    <Grid item xs={7} md={5}>
                        <Button className='submitBtn' fullWidth variant="contained">Отправить</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}
