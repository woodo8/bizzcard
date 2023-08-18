import React, { useEffect, useState, useContext, useLayoutEffect, useRef } from 'react'
import NavbarMain from '../../components/navbarMain/navbarMain';
import { Button, Grid, Typography } from '@mui/material'
// import TabsUnstyled from "@mui/base/TabsUnstyled"
import Tabs from '@mui/base/Tabs';
import TabsList from '@mui/base/TabsList';
import TabPanel from '@mui/base/TabPanel';
import Tab, { tabClasses } from '@mui/base/Tab';
import { styled } from '@mui/system';
import "../editCard/editCard.css"
// import ContactInfo from '../../components/contactInfo/contactInfo';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { TypeAnimation } from "react-type-animation";

// import "./editCard.css"
import { useNavigate, useParams } from 'react-router';
import ContactInfoCreate from '../../components/contactInfoCreate/contactInfoCreate';
import { useCreateNewCardMutation } from '../../services/cardsApi';
import { BgColor, MainColor, ProfileImgShape } from '../../constants/constants';
import { StateContext } from '../../context/useContext';
import CircularProgress from '@mui/material/CircularProgress';
import { validateEmail } from '../../utils/validateEmail';

export default function CreateNewCard() {
    const { value: pageValue, contactsValue } = useParams();
    const { globalUser } = useContext(StateContext)

    const [newCard, result] = useCreateNewCardMutation();
    const { data, error, isError, isLoading, isSuccess } = result;


    const [content, setContent] = useState<string>('');

    const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

    // States to handle input values
    const [name, setName] = useState<string>("");
    const [expertise, setExpertise] = useState<string>("");
    // const [description, setDescription] = useState<string>("");
    // const [profileImgShape, setprofileImgShape] = useState<ProfileImgShape>(ProfileImgShape.CIRCLE);
    // const [bgColor, setBgColor] = useState<BgColor>(BgColor.MAIN);
    // const [mainColor, setMainColor] = useState<MainColor>(MainColor.WHITE);
    const [profileImg, setprofileImg] = useState<any>();
    const [backgroundImg, setbackgroundImg] = useState<any>();
    const [location, setLocation] = useState<string>("");
    const [linkedin, setLinkedin] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [facebook, setFacebook] = useState<string>("");
    const [telegram, setTelegram] = useState<string>("");
    const [instagram, setInstagram] = useState<string>("");
    const [mobile, setMobile] = useState<string>("");
    const [website, setWebsite] = useState<string>("");
    const [services, setServices] = useState<string>("")
    const [qualities, setQualities] = useState<string>("")



    const [value, setValue] = useState<number>(0);

    const navigate = useNavigate();

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
            // navigate(`/create_card/${newValue}/${contactsValue}`)
        }
    };

    const initialize = () => {
        setValue(4)
    }

    const windowSize = window.innerWidth;

    useEffect(() => {
        console.log(value, contactsValue)
        // navigate(`/create_card/${value}/${contactsValue}`)
        if (windowSize > 769) {
            enableScroll()
        }
        const localDraftContent = localStorage.getItem("draftContent")
        localDraftContent && setEditorState(() => EditorState.push(
            editorState,
            convertFromRaw(JSON.parse(localDraftContent)),
            "remove-range"
        ))

        const localServices = localStorage.getItem("services") || "";
        setServices(localServices)
    }, [value])

    useEffect(() => {
        // setValue(Number(pageValue));
        console.log(name)
    }, [])

    const timeoutRef = useRef(null);

    useEffect(() => {
        if (!timeoutRef.current) {
            // @ts-ignore
            timeoutRef.current = setTimeout(() => {
                // @ts-ignore
                let storageInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
                if (Object.keys(storageInfos).length !== 0) {
                    let continuee = window.confirm("Do you want to continue with saved data?");
                    if (!continuee) {
                        localStorage.removeItem("contactInfos");
                        localStorage.removeItem("draftContent");
                        localStorage.removeItem("services");
                        window.location.reload();
                    }
                }
            }, 2000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [])

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


    let StatesForContacts = {
        pageValue,
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
        setName,
        setExpertise,
        setEmail,
        setWebsite,
        setLocation,
        setTelegram,
        setLinkedin,
        setFacebook,
        setMobile,
        setInstagram,
        contactsValue: contactsValue,
        setValue
    }

    const saveDraft = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateRaw = convertToRaw(contentState);
        const contentStateJson = JSON.stringify(contentStateRaw);
        localStorage.setItem("draftContent", contentStateJson)
        localStorage.setItem("services", services)
        localStorage.setItem("qualities", qualities)
        setValue(2)
    }

    const handleSubmit = () => {
        try {
            let formData = new FormData();
            // @ts-ignore
            const contactInfos = JSON.parse(localStorage.getItem("contactInfos")) || {};
            const token = localStorage.getItem("token")
            if (!contactInfos) {
                return
            }

            globalUser.subscription === null ?
                formData.append("type", "FREE") :
                formData.append("type", globalUser.subscription);
            formData.append("description", "Hello worlddddddddddddddddd");
            formData.append("name", contactInfos.name);
            formData.append("expertise", contactInfos.expertise);
            formData.append("email", contactInfos.email);
            formData.append("mobile", contactInfos.mobile);
            contactInfos.location && formData.append("location", contactInfos.location);
            contactInfos.website && formData.append("websiteLink", contactInfos.website);
            contactInfos.telegram && formData.append("telegram", contactInfos.telegram);
            contactInfos.facebook && formData.append("facebook", contactInfos.facebook);
            contactInfos.linkedin && formData.append("linkedin", contactInfos.linkedin);
            contactInfos.instagram && formData.append("instagram", contactInfos.instagram);
            contactInfos.startTime && formData.append("timeFrom", contactInfos.startTime);
            contactInfos.endTime && formData.append("timeUntil", contactInfos.endTime);
            const contentStateJson = localStorage.getItem("draftContent") || "";
            const localServices = localStorage.getItem("services") || "";
            const localQualities = localStorage.getItem("qualities") || "";
            contentStateJson && formData.append("draftContent", contentStateJson);
            localServices && formData.append("services", localServices);
            localQualities && formData.append("qualities", localQualities);
            profileImg && profileImg.img && formData.append("profile_img", profileImg.img);
            backgroundImg && backgroundImg.img && formData.append("background_img", backgroundImg.img);
            newCard({ token: token, body: formData, id: globalUser.id })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        console.log(data)
        if (data) {
            alert("Your card added successfully");
            localStorage.removeItem("contactInfos");
            localStorage.removeItem("draftContent");
            localStorage.removeItem("services");
            enableScroll();
            navigate(`/bizz_card/${data._id}`);
        }
        console.log(error)
        if (error) {
            alert("Something went wrong, please try again later. We try to save all the data you typed in, while you leave!")
            navigate("/my_cards")
        }
    }, [isLoading])
    return (
        <>
            <NavbarMain />
            <Grid container className='myProfile'>
                <Grid className="wrapper" item xs={12}>
                    <Grid container className="editProfile">
                        <Grid item xs={12}>
                            <Tabs
                                value={value}
                                orientation="vertical"
                                defaultValue={0}
                                //@ts-ignore
                                onChange={handleChange}
                            >
                                <StyledTabsList>
                                    {/* Below I used empty tab for default state, so whenever user clicks other tabs it shows up Tabpanel, but in the initial condition as nothing active, Empty tab will be active thus nothing will be visible */}
                                    <StyledTab>-Контактная информация</StyledTab>
                                    <StyledTab>-Контент</StyledTab>
                                    <StyledTab>-Внешность</StyledTab>
                                    <StyledTab className='mobileViewOnly v-hidden nullTab'></StyledTab>
                                </StyledTabsList>
                                <StyledTabPanel value={0}>
                                    <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
                                    <ContactInfoCreate StatesForContacts={StatesForContacts} />
                                </StyledTabPanel>
                                <StyledTabPanel value={1}>
                                    <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />

                                    <h1 className='panelHeading'>Обо мне</h1>
                                    <Editor
                                        placeholder='Our company is ......'
                                        editorState={editorState}
                                        wrapperClassName="card"
                                        editorClassName="card-body"
                                        toolbarClassName="toolbar-class"
                                        onEditorStateChange={newState => {
                                            setEditorState(newState);
                                            // console.log(convertToRaw(newState.getCurrentContent()))
                                            // console.log(newState)
                                        }}
                                        toolbar={{
                                            options: ['inline', 'blockType', 'fontSize', "colorPicker", "fontFamily", 'list', 'textAlign', 'history', 'emoji'],
                                            inline: { inDropdown: true },
                                            fontFamily: {
                                                options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                                            },
                                        }} />
                                    <h1 className='panelHeading'>Мои услуги</h1>
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

                                    <Button onClick={saveDraft} className='submitBtn'>Сохранить изменения</Button>
                                </StyledTabPanel>
                                <StyledTabPanel value={2}>
                                    <HighlightOffOutlinedIcon className='mobileViewOnly' onClick={initialize} color='primary' /><br />
                                    <h1 className='panelHeading'>Фотографии</h1>
                                    <Grid container>
                                        <Grid className='bgImageBox' item xs={12}>
                                            <label htmlFor='bgImg' >
                                                <div className="imageBox d-flex align-center">
                                                    {backgroundImg ? <img className='image' src={backgroundImg.preViews} alt=".." /> : <div className="image"></div>}

                                                    <div>
                                                        <Typography variant='h6'>Фотография фона</Typography>
                                                        <Typography variant='h5'>Файл Ещё не выбран </Typography>
                                                    </div>
                                                </div>
                                                <Typography variant="h2" className=' d-flex align-center'>
                                                    <UploadFileOutlinedIcon className='uploadIcon' />
                                                    Загрузить изображение
                                                </Typography>
                                            </label>
                                            <input
                                                id="bgImg"
                                                onChange={(e) => {
                                                    // @ts-ignore: Object is possibly 'null'.
                                                    if (e.target.files.length !== 0) {
                                                        setbackgroundImg({
                                                            // @ts-ignore: Object is possibly 'null'.
                                                            img: e.target.files[0],
                                                            // @ts-ignore: Object is possibly 'null'.
                                                            preViews: URL.createObjectURL(e.target.files[0]),
                                                        })
                                                    }
                                                }}
                                                type="file" />
                                        </Grid>
                                        {/* <Grid className='bgImageBox' item xs={12}>
                                            <p>Baner Type</p>
                                            <label className="default" htmlFor="rectan">Rectangular</label>
                                            <input type="radio" className='default' name="baner" id="rectan" />
                                            <label className="default" htmlFor="trian">Triangular</label>
                                            <input type="radio" className='default' name="baner" id="trian" />
                                        </Grid>
                                        <Grid className='bgImageBox' item xs={12}>
                                            <p>Profile shape</p>
                                            <label className="default" htmlFor="rectanPro">Rectangular</label>
                                            <input type="radio" className='default' name="profileShape" id="rectanPro" />
                                            <label className="default" htmlFor="circle">Circular</label>
                                            <input type="radio" className='default' name="profileShape" id="circle" />
                                        </Grid> */}
                                        <Grid className='bgImageBox' item xs={12}>
                                            <label htmlFor='profileImg' >
                                                <div className="imageBox">
                                                    <Typography variant='h6'>Фотография профиля</Typography>
                                                    {profileImg ? <img className='img' src={profileImg.preViews} alt=".." /> : <div className="img"></div>}
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
                                                        setprofileImg({
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
                                        {/* <Grid className='bgImageBox' item xs={12}>
                                            <p>Main Color</p>
                                            <label className="default" htmlFor="mainColor">Main</label>
                                            <input type="radio" className='default' name="mainColor" id="mainColor" />
                                            <label className="default" htmlFor="blueColorX">Blue</label>
                                            <input type="radio" className='default' name="mainColor" id="blueColorX" />
                                        </Grid>
                                        <Grid className='bgImageBox' item xs={12}>
                                            <p>Bgcolor</p>
                                            <label className="default" htmlFor="Main">Main</label>
                                            <input type="radio" className='default' name="bgColor" id="Main" />
                                            <label className="default" htmlFor="black">Black</label>
                                            <input type="radio" className='default' name="bgColor" id="black" />
                                            <label className="default" htmlFor="white">White</label>
                                            <input type="radio" className='default' name="bgColor" id="white" />
                                        </Grid> */}
                                        <Button onClick={handleSubmit} className='submitBtn'>
                                            {isLoading && <CircularProgress color='inherit' style={{ width: "20px", height: "20px", marginRight: "15px" }} />}
                                            Сохранить изменения
                                        </Button>
                                    </Grid>
                                </StyledTabPanel>

                                {/* !!!! Dont remove the line below. It is used to supply initial position of this page where none of the tabs are active */}
                                <StyledTabPanel className='v-hidden mobileViewOnly nullTab' value={3}
                                >
                                </StyledTabPanel>
                            </Tabs>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}



const StyledTab = styled(Tab)(() => `
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

const StyledTabPanel = styled(TabPanel)(
    () => `
  width: 100%;
    padding: 20px;
    padding-bottom:100px;
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

const StyledTabsList = styled(TabsList)(
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