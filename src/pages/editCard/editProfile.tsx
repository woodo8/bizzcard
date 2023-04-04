import { Button, Grid, Typography } from '@mui/material'
import { TabsUnstyled, TabsListUnstyled, TabPanelUnstyled, buttonUnstyledClasses, TabUnstyled, tabUnstyledClasses } from '@mui/base';
import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled';
import "./editProfile.css"
import ContactInfo from '../../components/contactInfo/contactInfo';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';

export default function EditProfile() {
  const [content, setContent] = useState<string>('');

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const [bgImage, setBgImage] = useState<any>();

  const [value, setValue] = useState<number>(4);

  const handleChange = (argValue: number) => {
    setValue(argValue)
  };

  const initialize = () => {
    setValue(4)
  }

  function disableScroll() {
    // Get the current page scroll position in the vertical direction
    let scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;


    // Get the current page scroll position in the horizontal direction 

    let scrollLeft =
      window.pageXOffset || document.documentElement.scrollLeft;


    // if any scroll is attempted,
    // set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  function enableScroll() {
    window.onscroll = function () { };
  }

  useEffect(() => {
    value === 4 ? enableScroll() : disableScroll()
  }, [value])




  return (
    <Grid container className="editProfile">
      <Grid item xs={12}>
        <TabsUnstyled
          value={value}
          orientation="vertical" defaultValue={4}>
          <TabsList>
            {/* Below I used empty tab for default state, so whenever user clicks other tabs it shows up Tabpanel, but in the initial condition as nothing active, Empty tab will be active thus nothing will be visible */}

            <Tab onClick={() => handleChange(0)}>-Контактная информация</Tab>
            <Tab onClick={() => handleChange(1)}>-Контент</Tab>
            <Tab onClick={() => handleChange(2)}>-Внешность</Tab>
            <Tab className='mobileViewOnly v-hidden nullTab'></Tab>
          </TabsList>
          <TabPanel className='v-hidden mobileViewOnly nullTab' value={3}
          >
          </TabPanel>
          <TabPanel value={0}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
            <ContactInfo />
          </TabPanel>
          <TabPanel value={1}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />

            <h1 className='panelHeading'>Обо мне</h1>
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              toolbarClassName="toolbar-class"
              onEditorStateChange={newState => {
                setEditorState(newState);
                setContent(draftToHtml(convertToRaw(newState.getCurrentContent())));
              }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', "colorPicker", "fontFamily", 'list', 'textAlign', 'history', 'emoji', 'image'],
                inline: { inDropdown: true },
                fontFamily: {
                  options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                },
              }} />
            <Button className='submitBtn'>Сохранить изменения</Button>

          </TabPanel>
          <TabPanel value={2}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
            <h1 className='panelHeading'>Фотографии</h1>
            <Grid container>
              <Grid className='bgImageBox' item xs={12}>
                <label htmlFor='bgImage' >
                  <div className="imageBox d-flex align-center">
                    <div className="image"></div>
                    <div>
                      <Typography variant='h6'>Фотография фона</Typography>
                      <Typography variant='h5'>Ещё не выбран файл</Typography>
                    </div>
                  </div>
                  <Typography variant="h2" className=' d-flex align-center'>
                    <UploadFileOutlinedIcon className='uploadIcon' />
                    Загрузить изображение
                  </Typography>
                </label>
                <input
                  id="bgImage"
                  onChange={(e) => setBgImage({
                    // @ts-ignore: Object is possibly 'null'.
                    img: e.target.files[0],
                    // @ts-ignore: Object is possibly 'null'.
                    preViews: URL.createObjectURL(e.target.files[0]),
                  })} type="file" />
              </Grid>
              <Grid className='bgImageBox' item xs={12}>
                <label htmlFor='bgImage' >
                  <div className="imageBox">
                    <Typography variant='h6'>Фотография фона</Typography>
                    <div className="img"></div>
                  </div>
                  <Typography variant="h2" className=' d-flex align-center'>
                    <UploadFileOutlinedIcon className='uploadIcon' />
                    Изменить изображение
                  </Typography>
                </label>
                <input
                  id="bgImage"
                  onChange={(e) => setBgImage({
                    // @ts-ignore: Object is possibly 'null'.
                    img: e.target.files[0],
                    // @ts-ignore: Object is possibly 'null'.
                    preViews: URL.createObjectURL(e.target.files[0]),
                  })} type="file" />
              </Grid>
              <Button className='submitBtn'>Сохранить изменения</Button>
            </Grid>
          </TabPanel>

          {/* !!!! Dont remove the line below. It is used to supply initial position of this page where none of the tabs are active */}
          <TabPanel className='v-hidden mobileViewOnly nullTab' value={3}
          >
          </TabPanel>
        </TabsUnstyled>
      </Grid>
    </Grid>
  )
}


const Tab = styled(TabUnstyled)(() => `
    color: #fff;
    cursor: pointer;
    font-weight: 400;
    font-size: 18px;
    background-color: transparent;
    width: 100%;
    padding: 20px;
    border: 1px solid #3D86F7;
    display: flex;
    justify-content: start;
    text-decoration: underline;

    &:hover {
      color:#3D86F7;
    }
  
    &:focus {
      color: #fff;
    }
    
    &.${tabUnstyledClasses.selected} {
      color:#3D86F7;
      border-right:5px solid #111111;
      background-color: #3D86F7;
      color: white;
      position: relative;
      overflow: hidden;

    }
    &.${tabUnstyledClasses.selected}::after {
      content: "";
      display: block;
      right: -25px;
      top: 5px;
      bottom: 0;
      background-color: #111111;
      width: 50px;
      height: 50px;
      position: absolute;
      rotate: 45deg;
    }
  
    &.${buttonUnstyledClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
    @media (max-width: 768px) {
      width:100%;
      &.${tabUnstyledClasses.selected}::after {
        display:none;    
    }
    }
  `);

const TabPanel = styled(TabPanelUnstyled)(
  () => `
  width: 100%;
    padding: 20px;
    min-height:100vh;
    overflow-x:hidden;
    @media (max-width: 768px) {
      position:fixed;
      top:80px;
      left:0px;
      right:0px;
      background-color:black;
      z-index:4;
      height:100vh;
      overflow-y:scroll;
    }
    `,
);

const TabsList = styled(TabsListUnstyled)(
  () => `
    min-width: 400px;
    background-color: transparent;
    display: block;
    border: 1px solid #3D86F7;
    @media (max-width: 768px) {
      width:"100%";
      min-width: auto;
    }
    `,
);