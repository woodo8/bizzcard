import { Grid } from '@mui/material'
import { TabsUnstyled, TabsListUnstyled, TabPanelUnstyled, buttonUnstyledClasses, TabUnstyled, tabUnstyledClasses } from '@mui/base';
import React from 'react'
import styled from '@emotion/styled';
import "./editProfile.css"

export default function EditProfile() {
    return (
        <Grid container className="editProfile">
            <TabsUnstyled orientation="vertical" defaultValue={0}>
                <TabsList>
                    <Tab>-Контактная информация</Tab>
                    <Tab>-Контент</Tab>
                    <Tab>-Внешность</Tab>
                </TabsList>
                <TabPanel value={0}>
                  
                </TabPanel>
                <TabPanel value={1}>Profile page</TabPanel>
                <TabPanel value={2}>Language page</TabPanel>
            </TabsUnstyled>
        </Grid>
    )
}


const Tab = styled(TabUnstyled)`
    color: #fff;
    cursor: pointer;
    font-weight: 400;
    font-size: 18px;
    background-color: transparent;
    width: 100%;
    padding: 20px;
    border: 1px solid white;
    display: flex;
    justify-content: start;

    &:hover {
      color:#3D86F7;
    }
  
    &:focus {
      color: #fff;
      outline: 3px solid #3D86F7;
    }
  
    &.${tabUnstyledClasses.selected} {
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
    `,
);
// background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
// border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};

const TabsList = styled(TabsListUnstyled)(
    ({ theme }) => `
    min-width: 400px;
    background-color: transparent;
    display: block;
    border: 2px solid white;
    `,
);
    // box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};