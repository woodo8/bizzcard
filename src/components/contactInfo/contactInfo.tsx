import React, { useEffect, useState } from 'react'
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';

import { styled } from '@mui/system';
import { Button, CircularProgress, TextField } from '@mui/material';
import { useEditCardMutation } from '../../services/cardsApi';


export default function ContactInfo({ card, refetchCard }: any) {

  const [name, setName] = useState<string>("");
  const [expertise, setexpertise] = useState<string>("");
  const [mobile, setmobile] = useState<string>("");
  const [email, setemail] = useState<string>("");
  const [website, setwebsite] = useState<string>("");
  const [adress, setadress] = useState<string>("");

  const [linkedin, setlinkedin] = useState<string>("");
  const [telegram, settelegram] = useState<string>("");
  const [instagram, setinstagram] = useState<string>("");
  const [facebook, setfacebook] = useState<string>("");

  const [changeCard, result] = useEditCardMutation();
  const { data, isSuccess, isError, error, isLoading } = result;

  const token = localStorage.getItem("token");

  const initialize = () => {
    card.name && setName(card.name);
    card.expertise && setexpertise(card.expertise);
    card.mobile && setmobile(card.mobile);
    card.email && setemail(card.email);
    card.website && setwebsite(card.website);
    card.adress && setadress(card.adress);

    card.linkedin && setlinkedin(card.linkedin);
    card.instagram && setinstagram(card.instagram);
    card.facebook && setfacebook(card.facebook);
    card.telegram && settelegram(card.telegram);

  }

  useEffect(() => {
    initialize();
  }, [])

  const handleSubmitBase = async (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    name && formdata.append("name", name);
    expertise && formdata.append("expertise", expertise);
    mobile && formdata.append("mobile", mobile);
    email && formdata.append("email", email);
    formdata.append("website", website);
    formdata.append("adress", adress);

    await changeCard({ id: card._id, owner: card.owner, body: formdata, token })
  }
  const handleSubmitSec = async (e: any) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("linkedin", linkedin);
    formdata.append("telegram", telegram);
    formdata.append("instagram", instagram);
    formdata.append("facebook", facebook);

    await changeCard({ id: card._id, owner: card.owner, body: formdata, token })
  }
  useEffect(() => {
    isError && alert("something went wrong, please try again later!")
    if (isSuccess) {
      alert("Card changed successfully");
      refetchCard();
    }
  }, [isSuccess, isError])

  return (
    <div className='contactInfo'>
      <Tabs defaultValue={0}>
        <StyledTabsList>
          <StyledTab>-Базовые</StyledTab>
          <StyledTab>-Социальные сети</StyledTab>
        </StyledTabsList>
        <StyledTabpanel value={0}>
          <TextField
            label="Имя"
            type="text"
            variant="filled"
            className='input'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Описание работы / Ваша профессия"
            type="text"
            variant="filled"
            className='input'
            value={expertise}
            onChange={(e) => setexpertise(e.target.value)}
          />
          <TextField
            label="Номер телефона"
            type="text"
            variant="filled"
            className='input'
            value={mobile}
            onChange={(e) => setmobile(e.target.value)}
          />
          <TextField
            label="Электронная почта"
            type="text"
            variant="filled"
            className='input'
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <TextField
            label="Веб-сайт"
            type="text"
            variant="filled"
            className='input'
            value={website}
            onChange={(e) => setwebsite(e.target.value)}
          />
          <TextField
            label="Адрес"
            type="text"
            variant="filled"
            className='input'
            value={adress}
            onChange={(e) => setadress(e.target.value)}
          />

          <Button disabled={isLoading ? true : false} onClick={handleSubmitBase} className='submitBtn'>
            {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
            Сохранить изменения
          </Button>

        </StyledTabpanel>
        <StyledTabpanel value={1}>
          <TextField
            label="Linkedin"
            type="text"
            variant="filled"
            className='input'
            value={linkedin}
            onChange={(e) => setlinkedin(e.target.value)}
            placeholder="https://linkedin.com/...."
          />
          <TextField
            label="Facebook"
            type="text"
            variant="filled"
            className='input'
            value={facebook}
            onChange={(e) => setfacebook(e.target.value)}
            placeholder="https://linkedin.com/...."
          />
          <TextField
            label="Telegram"
            type="text"
            variant="filled"
            className='input'
            value={telegram}
            onChange={(e) => settelegram(e.target.value)}
            placeholder="https://linkedin.com/...."
          />
          <TextField
            label="Instagram"
            type="text"
            variant="filled"
            className='input'
            value={instagram}
            onChange={(e) => setinstagram(e.target.value)}
            placeholder="https://linkedin.com/...."
          />
          <Button onClick={handleSubmitSec} disabled={isLoading ? true : false} className='submitBtn'>
            {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
            Сохранить изменения
          </Button>
        </StyledTabpanel>
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

const StyledTabpanel = styled(TabPanel)(
  () => `
    width: 100%;
    padding: 20px;
    min-height:100vh;
    color:white;
    `,
);

const StyledTabsList = styled(TabsList)(
  ({ theme }) => `
    min-width: 400px;
    background-color: transparent;
    display: flex;
    align-items: center;
    border-bottom: 1px solid white;
    `,
);
    // box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};