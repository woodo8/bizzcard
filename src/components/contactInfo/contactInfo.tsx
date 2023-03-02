import React from 'react'
import { TabsUnstyled, TabsListUnstyled, TabPanelUnstyled, buttonUnstyledClasses, TabUnstyled, tabUnstyledClasses } from '@mui/base';
import styled from '@emotion/styled';
import { Button, TextField } from '@mui/material';


export default function ContactInfo() {
  return (
    <div className='contactInfo'>
      <TabsUnstyled defaultValue={0}>
        <TabsList>
          <Tab>-Базовые</Tab>
          <Tab>-Социальные сети</Tab>
        </TabsList>
        <TabPanel value={0}>
          <TextField
            defaultValue='Самадович Акмал Турсунов'
            label="Имя"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            defaultValue='Финансовый аналитик'
            label="Описание работы / Ваша профессия"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            defaultValue='+998 99 123 45 67'
            label="Номер телефона"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            defaultValue='example@gmail.com'
            label="Электронная почта"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            label="Веб-сайт"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            label="Адрес"
            type="text"
            variant="filled"
            className='input'
          />

          <Button className='submitBtn'>Сохранить изменения</Button>

        </TabPanel>
        <TabPanel value={1}>
          <TextField
            label="Linkedin"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            label="Facebook"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            label="Telegram"
            type="text"
            variant="filled"
            className='input'
          />
          <TextField
            label="Instagram"
            type="text"
            variant="filled"
            className='input'
          />
          <Button className='submitBtn'>Сохранить изменения</Button>
        </TabPanel>
      </TabsUnstyled>
    </div>
  )
}

const Tab = styled(TabUnstyled)`
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
    
    &.${tabUnstyledClasses.selected} {
      border-bottom: 3px solid #3D86F7;
      color:#3D86F7;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

const TabPanel = styled(TabPanelUnstyled)(
  () => `
    width: 100%;
    padding: 20px;
    min-height:100vh;
    color:white;
    `,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 400px;
    background-color: transparent;
    display: flex;
    align-items: center;
    border-bottom: 1px solid white;
    `,
);
    // box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};