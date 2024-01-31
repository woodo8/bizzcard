import React, { useEffect, useState } from 'react'
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';
import { styled } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material'
import { validateEmail } from '../../utils/validateEmail';


export default function ContactInfoCreate(props: any) {
    const {
        setName,
        setExpertise,
        setEmail,
        setWebsite,
        setLocation,
        setTelegram,
        setInstagram,
        setLinkedin,
        setFacebook,
        setMobile,
        name,
        expertise,
        email,
        website,
        location,
        telegram,
        linkedin,
        facebook,
        instagram,
        mobile,
        pageValue,
        emailValidationFailed,
        contactsValue,
        setValue: setPageValue,
    } = props.StatesForContacts;
    const navigate = useNavigate();


    const [value, setValue] = useState<number>(0);
    const [disableChanges, setdisableChanges] = useState<boolean>(false)
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        var pattern = /^\d+\.?\d*$/;
        let isNumber = pattern.test(mobile);
        let emailIsValid = validateEmail(email);
        // @ts-ignore
        const contactInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
        if (Object.keys(contactInfos).length == 0 && !name || !email || !mobile || !expertise || !isNumber || !emailIsValid) {
            return
        } else {
            setValue(newValue);
        }
    };

    useEffect(() => {
        console.log(pageValue, value)
        // navigate(`/create_card/${pageValue}/${value}`);
        // @ts-ignore
        let storageInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
        if(emailValidationFailed){
            setEmailError("Please enter valid email")
        }
        storageInfos && initialize(storageInfos);
        let emailIsValid = validateEmail(email);
        var pattern = /^\d+\.?\d*$/;
        let isNumber = pattern.test(mobile);  // returns a boolean
        if (Object.keys(storageInfos).length === 0) {
            if (!name || !email || !mobile || !expertise || !emailIsValid || !isNumber) {
                setValue(0)
                setdisableChanges(true)
                // navigate(`/create_card/0/0`);
            } else {
                console.log("error")
                setdisableChanges(false)
            }
        }
    }, [value])

    // useStates for error handling
    const [nameError, setNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [expertError, setExpertError] = useState<string>("");
    const [mobileError, setmobileError] = useState<string>("");

    const [startTime, setStartTime] = useState<string>("");
    const [endTime, setEndTime] = useState<string>("")

    const initialize = (localInfo: any) => {
        localInfo.name && setName(localInfo.name)
        localInfo.expertise && setExpertise(localInfo.expertise)
        localInfo.email && setEmail(localInfo.email)
        localInfo.mobile && setMobile(localInfo.mobile)
        localInfo.location && setLocation(localInfo.location)
        localInfo.website && setWebsite(localInfo.website)

        localInfo.telegram && setTelegram(localInfo.telegram)
        localInfo.facebook && setFacebook(localInfo.facebook)
        localInfo.linkedin && setLinkedin(localInfo.linkedin)
        localInfo.instagram && setInstagram(localInfo.instagram)
    }

    useEffect(() => {
        // setValue(Number(contactsValue))
        // @ts-ignore
        let storageInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
        initialize(storageInfos);
    }, [])

    const handleSubmitBase = (e: any) => {
        e.preventDefault();
        !name ? setNameError("Please enter the Name!") : setNameError("");

        !email ? setEmailError("Please enter the Email!") : setEmailError("");
        let emailIsValid = validateEmail(email);
        !emailIsValid ? setEmailError("Please enter valid email!") : setEmailError("");
        !mobile ? setmobileError("Please enter the Number!") : setmobileError("");
        var pattern = /^\d+\.?\d*$/;
        let isNumber = pattern.test(mobile);  // returns a boolean
        !isNumber ? setmobileError("Please enter valid Number!") : setmobileError("");
        !expertise ? setExpertError("Please enter the Expertise!") : setExpertError("");

        if (!name || !email || !mobile || !expertise || !emailIsValid || !isNumber) {
            return
        }
        // @ts-ignore
        const contactInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
        let cardInfos = {
            ...contactInfos,
            name,
            expertise,
            email,
            mobile,
            location,
            website,
            startTime,
            endTime
        }

        localStorage.setItem("contactInfos", JSON.stringify(cardInfos));
        setValue(1);
        // navigate(`/create_card/1/0`);  
    }
    const handleSubmitSecond = (e: any) => {
        e.preventDefault();
        // @ts-ignore
        const contactInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
        let cardInfos = {
            ...contactInfos,
            telegram,
            linkedin,
            facebook,
            instagram
        }
        localStorage.setItem("contactInfos", JSON.stringify(cardInfos));
        let emailIsValid = validateEmail(email);
        !emailIsValid ? setEmailError("Please enter valid email!") : setEmailError("");
        var pattern = /^\d+\.?\d*$/;
        let isNumber = pattern.test(mobile);  // returns a boolean
        if (!name || !email || !mobile || !expertise || !emailIsValid || !isNumber) {
            setValue(0)
            // navigate(`/create_card/0/0`);
        } else {
            setPageValue(1);
        }

    }

    return (
        <div className='contactInfo'>
            <Tabs
                //@ts-ignore
                onChange={handleChange}
                value={value}
                defaultValue={0}
            >
                <StyledTabslist>
                    <StyledTab>-Базовые</StyledTab>
                    <StyledTab disabled={disableChanges ? true : false}>-Социальные сети</StyledTab>
                </StyledTabslist>
                <StyledTabPanel value={0}>
                    <TextField
                        label="Имя"
                        type="text"
                        variant="filled"
                        className='input'
                        required={true}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        error={nameError ? true : false}
                    />
                    {nameError && <Typography className='errorText'>{nameError}</Typography>}

                    <TextField
                        label="Описание работы / Ваша профессия"
                        type="text"
                        variant="filled"
                        className='input'
                        required={true}
                        value={expertise}
                        onChange={(e) => setExpertise(e.target.value)}
                        error={expertError ? true : false}
                    />
                    {expertError && <Typography className='errorText'>{expertError}</Typography>}

                    <TextField
                        placeholder='998991234567'
                        label="Номер телефона"
                        type="text"
                        variant="filled"
                        className='input'
                        required={true}
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        error={mobileError ? true : false}
                    />
                    {mobileError && <Typography className='errorText'>{mobileError}</Typography>}

                    <TextField
                        defaultValue='example@gmail.com'
                        label="Электронная почта"
                        type="text"
                        variant="filled"
                        className='input'
                        required={true}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        error={emailError ? true : false}
                    />
                    {emailError && <Typography className='errorText'>{emailError}</Typography>}

                    <TextField
                        label="Веб-сайт"
                        type="text"
                        variant="filled"
                        className='input'
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                    <TextField
                        label="Адрес"
                        type="text"
                        variant="filled"
                        className='input'
                        placeholder='Street, Home, City and Country'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />
                    <h3>Ish vaqti</h3>
                    <label htmlFor="startTime" >Sizga shu vaqtdan</label><br />
                    <input onChange={(e) => setStartTime(e.target.value)} style={{ marginBottom: "20px" }} type="time" name="startTime" id="startTime" /><br />
                    <label htmlFor="endTime">Shu vaqtgcaha murojat qilishlari mumkin</label><br />
                    <input onChange={(e) => setEndTime(e.target.value)} style={{ marginBottom: "20px" }} type="time" name="endTime" id="endTime" /><br />

                    <Button onClick={handleSubmitBase} className='submitBtn'>Сохранить изменения</Button>
                </StyledTabPanel>
                <StyledTabPanel value={1}>
                    <TextField
                        label="Linkedin"
                        type="text"
                        variant="filled"
                        className='input'
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                    />
                    <TextField
                        label="Facebook"
                        type="text"
                        variant="filled"
                        className='input'
                        value={facebook}
                        onChange={(e) => setFacebook(e.target.value)}
                    />
                    <TextField
                        label="Telegram"
                        type="text"
                        variant="filled"
                        className='input'
                        value={telegram}
                        onChange={(e) => setTelegram(e.target.value)}
                    />
                    <TextField
                        label="Instagram"
                        type="text"
                        variant="filled"
                        className='input'
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                    <Button onClick={handleSubmitSecond} className='submitBtn'>Сохранить изменения</Button>
                </StyledTabPanel>
            </Tabs>
        </div>
    )
}

const StyledTab = styled(Tab)`
    color: #fff;
    cursor: pointer;
    font-weight: 400;
    font-size: 18px;
    background-color: transparent;
    padding: 0 20px 20px 20px;
    border: none;
    display: flex;
    justify-content: start;

    &:hover {
      color:#3D86F7;
    }
  
    &:focus {
      color: #fff;
      border-bottom: 3px solid #3D86F7;
    }
    
    &.${tabClasses.selected} {
      border-bottom: 3px solid #3D86F7;
      color:#3D86F7;
    }
  `;

const StyledTabPanel = styled(TabPanel)(
    () => `
    width: 100%;
    padding: 20px;
    min-height:100vh;
    color:white;
    `,
);

const StyledTabslist = styled(TabsList)(
    ({ theme }) => `
    min-width: 400px;
    background-color: transparent;
    display: flex;
    align-items: center;
    border-bottom: 1px solid white;
    `,
);
    // box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};