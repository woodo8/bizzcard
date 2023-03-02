import { Button, Grid, Typography } from '@mui/material'
import { TabsUnstyled, TabsListUnstyled, TabPanelUnstyled, buttonUnstyledClasses, TabUnstyled, tabUnstyledClasses } from '@mui/base';
import React, { useState } from 'react'
import styled from '@emotion/styled';
import "./editProfile.css"
import ContactInfo from '../../components/contactInfo/contactInfo';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';

export default function EditProfile() {
  const [content, setContent] = useState<string>('');
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());


  const [bgImage, setBgImage] = useState<any>();

  console.log(bgImage)
  return (
    <Grid container className="editProfile">
      <Grid item xs={12}>
        <TabsUnstyled orientation="vertical" defaultValue={0}>
          <TabsList>
            <Tab>-Контактная информация</Tab>
            <Tab>-Контент</Tab>
            <Tab>-Внешность</Tab>
          </TabsList>
          <TabPanel value={0}>
            <ContactInfo />
          </TabPanel>
          <TabPanel value={1}>
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
        </TabsUnstyled>
      </Grid>
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
    border: 1px solid #3D86F7;
    display: flex;
    justify-content: start;

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
  `;

const TabPanel = styled(TabPanelUnstyled)(
  () => `
    width: 100%;
    padding: 20px;
    min-height:100vh;
    overflow-x:hidden;
    `,
);

const TabsList = styled(TabsListUnstyled)(
  ({ theme }) => `
    min-width: 400px;
    background-color: transparent;
    display: block;
    border: 1px solid #3D86F7;
    `,
);