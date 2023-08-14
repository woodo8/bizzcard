import React, { useContext, useEffect, useState } from 'react'
import { Grid, FormControl, OutlinedInput, Typography, Button, } from '@mui/material'
import NavbarMain from '../../components/navbarMain/navbarMain'
import { StateContext } from '../../context/useContext'
import "./profile.css"
// @ts-ignore
import FileBase from "react-file-base64";

import { useUpdateUserMutation } from '../../services/authApi'
import { tokenMiddleware } from '../../services/tokenMiddleware'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import transition from '../../transition'

const Profile = () => {
    const { globalUser: user, setGlobalUser } = useContext(StateContext)

    const [fullName, setfullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [number, setNumber] = useState<string>("");
    const [image, setImage] = useState<any>({})

    const [updateUser, result] = useUpdateUserMutation()
    const { data, error, isError, isLoading, isSuccess } = result;

    const token = localStorage.getItem("token")

    useEffect(() => {
        setfullName(user.full_name)
        setEmail(user.email)
        setNumber(user.mobile);
    }, [user])

    useEffect(() => {
        if (isError) {
            if ('status' in error && 'data' in error) {
                token && tokenMiddleware(error.status, error.data)
            }
            alert("Something went wrong please try again later!")
        }
        if (isSuccess) {
            setGlobalUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        }
    }, [isLoading])

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const updatedUser = {
            full_name: fullName !== user.full_name ? fullName : null,
            email: email !== user.email ? email : null,
            mobile: number !== user.mobile ? number : null,
        }
        const formData = new FormData();

        for (var key in updatedUser) {
            //@ts-ignore
            formData.append(key, updatedUser[key]);
        }
        image && formData.append("profile_img", image.img);



        // remove all the empty values from object


        Object.keys(updatedUser).length !== 0 && await updateUser({
            token: token,
            id: user.id,
            user: formData,
        })
    }

    return (
        <>
            <NavbarMain />
            <Grid container className='myProfile profile justify-center'>
                <Grid className="wrapper" item xs={12} sm={6}>
                    {Object.keys(image).length !== 0 ?
                        <img className='profileImg' src={image.preViews} alt="" /> :
                        user.profile_img ?
                            <img className='profileImg' src={user.profile_img} alt="" /> :
                            <AccountCircleOutlinedIcon className='profileImg' />
                    }
                    <div className="imgFileBox">
                        {/* <Button variant="outlined"> */}
                        <label htmlFor="imgFile">
                            <UploadFileOutlinedIcon /> Change profile photo
                        </label>
                        <input onChange={(e) => {
                            // @ts-ignore: Object is possibly 'null'.
                            if (e.target.files.length !== 0) {
                                setImage({
                                    // @ts-ignore: Object is possibly 'null'.
                                    img: e.target.files[0],
                                    // @ts-ignore: Object is possibly 'null'.
                                    preViews: URL.createObjectURL(e.target.files[0]),
                                })
                            }
                        }} id='imgFile' type="file" className='v-hidden' />
                        {/* </Button> */}
                    </div>
                    <Typography className="labelText">Email</Typography>
                    <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-email"
                            type="text"
                            className='input'
                            placeholder='E-mail аддресс'
                            // onChange={(e) => { setEmail(e.target.value) }}
                            value={email}
                            disabled={true}
                        />
                    </FormControl>
                    <Typography className="labelText">Имя</Typography>
                    <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-name"
                            type="text"
                            className='input'
                            placeholder='Ф.И.О'
                            onChange={(e) => { setfullName(e.target.value) }}
                            value={fullName}
                            disabled={isLoading && true}
                        />
                    </FormControl>
                    <Typography className="labelText">Тел. номер</Typography>
                    <FormControl className='inputbox' fullWidth sx={{ m: 1 }} variant="outlined">
                        <OutlinedInput
                            id="outlined-adornment-number"
                            type="text"
                            className='input'
                            placeholder='Тел. номер'
                            onChange={(e) => { setNumber(e.target.value) }}
                            value={number}
                            disabled={isLoading && true}
                        />
                    </FormControl>

                    <Button disabled={isLoading && true} onClick={(e) => handleSubmit(e)} className='submitBtn' variant='contained' color='primary'>
                        {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                        Изменить
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
export default transition(Profile)