import { Button, Grid, Typography } from '@mui/material'
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';
import { styled } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import "./editCard.css"
import ContactInfo from '../../components/contactInfo/contactInfo';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { useEditCardMutation, useGetCardQuery } from '../../services/cardsApi';
import { TypeAnimation } from "react-type-animation";
import Carousel from '../../components/carousel/carousel';
import CreatePortfolio from '../../components/createPortfolio/createPortfolio';


export default function EditCard({ card, refetchCard }: any) {


  const [changeCard, result] = useEditCardMutation();
  const { data, isSuccess, isError, error, isLoading } = result;

  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());
  const [services, setServices] = useState<string>("");
  const [bgImage, setBgImage] = useState<any>();
  const [profileImg, setProfileImg] = useState<any>();
  const [value, setValue] = useState<number>(0);
  const [qualities, setQualities] = useState<string>("");
  const [showCaroExample, setshowCaroExample] = useState<boolean>(false)
  const [showAdd, setshowAdd] = useState<boolean>(false)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    localStorage.setItem("editcardTabValue", newValue.toString())
  };

  const initialize = () => {
    setValue(3)
  }

  const initializeStates = () => {
    card.services && setServices(card.services);
    card.qualities && setQualities(card.qualities);
    card.draftContent && setEditorState(() => EditorState.push(
      editorState,
      convertFromRaw(JSON.parse(card.draftContent)),
      "remove-range"
    ))
  }

  const windowSize = window.innerWidth;
  useEffect(() => {
    initializeStates();
    let localValue = localStorage.getItem("editcardTabValue") || "0";
    setValue(Number(localValue))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [])

  useEffect(() => {
    // if (windowSize < 769) {
    //   initialize();
    //   value === 4 ? enableScroll() : disableScroll()
    // } else {
    //   enableScroll()
    // }
    value === 3 ? enableScroll() : disableScroll()

    if (windowSize > 769) {
      enableScroll()
    }
  }, [value])


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


  const saveDrafts = async (e: any) => {
    e.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateRaw = convertToRaw(contentState);
    const contentStateJson = JSON.stringify(contentStateRaw);
    const token = localStorage.getItem("token");

    let formData = new FormData();
    formData.append("draftContent", contentStateJson);
    formData.append("services", services);
    formData.append("qualities", qualities);
    await changeCard({ id: card._id, owner: card.owner, body: formData, token })
  }
  const saveImages = async (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    let formData = new FormData();
    bgImage && bgImage.img && formData.append("background_img", bgImage.img);
    profileImg && profileImg.img && formData.append("profile_img", profileImg.img);
    if (bgImage && bgImage.img || profileImg && profileImg.img) {
      await changeCard({ id: card._id, owner: card.owner, body: formData, token })
    } else {
      return
    }
  }

  useEffect(() => {
    if (isError) {
      alert("something went wrong, please try again later!")

    }
    if (isSuccess) {
      alert("Card changed successfully");
      // window.location.reload();
      // refetchCard();
    }
  }, [isSuccess, isError])


  return (
    <Grid container className="editProfile">
      <Grid item xs={12}>
        <Tabs
          value={value}
          orientation="vertical"
          defaultValue={0}
          //@ts-ignore
          onChange={handleChange}
        >
          <TabsListStyled>
            {/* Below I used empty tab for default state, so whenever user clicks other tabs it shows up Tabpanel, but in the initial condition as nothing active, Empty tab will be active thus nothing will be visible */}
            <TabStyled>-Контактная информация</TabStyled>
            <TabStyled>-Контент</TabStyled>
            <TabStyled>-Внешность</TabStyled>

            {/* !!!! Dont remove nor change the position of the line below. It is used to supply initial position of this page where none of the tabs are active */}
            <TabStyled className='mobileViewOnly v-hidden nullTab'></TabStyled>
            {/* !!!! */}

            <TabStyled>-Галерея</TabStyled>
          </TabsListStyled>
          <TabPanelStyled className='v-hidden mobileViewOnly nullTab' value={3}
          >
          </TabPanelStyled>
          <TabPanelStyled value={0}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
            <ContactInfo card={card} refetchCard={refetchCard} />
          </TabPanelStyled>
          <TabPanelStyled value={1}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />

            <h1 className='panelHeading'>Обо мне</h1>
            <Editor
              editorState={editorState}
              wrapperClassName="card"
              editorClassName="card-body"
              toolbarClassName="toolbar-class"
              onEditorStateChange={newState => {
                setEditorState(newState);
              }}
              toolbar={{
                options: ['inline', 'blockType', 'fontSize', "colorPicker", "fontFamily", 'list', 'textAlign', 'history', 'emoji', 'image'],
                inline: { inDropdown: true },
                fontFamily: {
                  options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                },
              }} />
            <h6>Write your services with commas (dancing, painting, running,)!</h6>
            <textarea
              onChange={(e) => setServices(e.target.value)}
              placeholder='dancing, painting, running,'
              className='serviceTextarea' name="services"
              value={services}
              id="services"
            ></textarea>
            <h1 className='panelHeading'>Я - в трех словах</h1>
            <h6>Опишите ваши (вашего бизнеса) качества 3 словами (быстрый, надежный, элегантный,)!</h6>
            <div style={{ textAlign: "center", color: "#8D6736" }}>
              <TypeAnimation
                sequence={['быстрый', 900, 'надежный', 900, 'элегантный', 900]}
                style={{ fontSize: '4em', margin: "20px 0 20px" }}
                repeat={Infinity}
              />
            </div>
            <textarea
              onChange={(e) => setQualities(e.target.value)}
              placeholder='быстрый, надежный, элегантный,'
              className='serviceTextarea' name="qualities"
              value={qualities}
              id="qualities"
            ></textarea>

            <Button onClick={saveDrafts} className='submitBtn'>Сохранить изменения</Button>

          </TabPanelStyled>
          <TabPanelStyled value={2}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
            <h1 className='panelHeading'>Фотографии</h1>
            <Grid container>
              <Grid className='bgImageBox' item xs={12}>
                <label htmlFor='bgImage' >
                  <div className="imageBox d-flex align-center">
                    {bgImage ?
                      <img className='image' src={bgImage.preViews} alt=".." /> :
                      card.background_img ?
                        <img className='image' src={card.background_img} alt=".." /> :
                        <div className="image"></div>}
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
                  onChange={(e) => {
                    // @ts-ignore: Object is possibly 'null'.
                    if (e.target.files.length !== 0) {
                      setBgImage({
                        // @ts-ignore: Object is possibly 'null'.
                        img: e.target.files[0],
                        // @ts-ignore: Object is possibly 'null'.
                        preViews: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  }
                  } type="file" />
              </Grid>
              <Grid className='bgImageBox' item xs={12}>
                <label htmlFor='profileImg' >
                  <div className="imageBox">
                    <Typography variant='h6'>Фотография фона</Typography>
                    {profileImg ?
                      <img className='img' src={profileImg.preViews} alt=".." /> :
                      card.profile_img ? <img className='img' src={card.profile_img} alt=".." /> :
                        <div className="img"></div>}
                  </div>
                  <Typography variant="h2" className=' d-flex align-center'>
                    <UploadFileOutlinedIcon className='uploadIcon' />
                    Изменить изображение
                  </Typography>
                </label>
                <input
                  id="profileImg"
                  onChange={(e) => {
                    // @ts-ignore: Object is possibly 'null'.
                    if (e.target.files.length !== 0) {
                      setProfileImg({
                        // @ts-ignore: Object is possibly 'null'.
                        img: e.target.files[0],
                        // @ts-ignore: Object is possibly 'null'.
                        preViews: URL.createObjectURL(e.target.files[0]),
                      })
                    }
                  }
                  } type="file"
                />
              </Grid>
              <Button onClick={saveImages} className='submitBtn'>Сохранить изменения</Button>
            </Grid>
          </TabPanelStyled>

          {/* !!!! Dont remove nor change the position of the line below. It is used to supply initial position of this page where none of the tabs are active */}
          <TabPanelStyled className='v-hidden mobileViewOnly nullTab' value={3}>
          </TabPanelStyled>
          <TabPanelStyled className='' value={4}>
            <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
            <h1 className='panelHeading'>Галерея</h1>
            {/* <Typography onClick={() => setshowCaroExample(!showCaroExample)} variant='h6' style={{ textDecoration: "underline", cursor: "pointer" }}>
              {showCaroExample ? "Закрыть пример" : "См. пример"}
            </Typography>
            {showCaroExample && < Carousel forEdit={true} />} */}
            <Typography onClick={() => setshowAdd(!showAdd)} variant='h6' style={{ textDecoration: "underline", cursor: "pointer" }}>
              {showAdd ? "Закрыть вкладку добавления" : "Добавить новое"}
            </Typography>
             <CreatePortfolio showAdd={showAdd} />
          </TabPanelStyled>
        </Tabs>
      </Grid>
    </Grid>
  )
}


const TabStyled = styled(Tab)(() => `
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
    
    &.${tabClasses.selected} {
      color:#3D86F7;
      border-right:5px solid #111111;
      background-color: #3D86F7;
      color: white;
      position: relative;
      overflow: hidden;

    }
    &.${tabClasses.selected}::after {
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
  
    @media (max-width: 768px) {
      width:100%;
      &.${tabClasses.selected}::after {
        display:none;    
    }
    }
  `);

const TabPanelStyled = styled(TabPanel)(
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
      padding-bottom:250px !important;

    }
    `,
);

const TabsListStyled = styled(TabsList)(
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