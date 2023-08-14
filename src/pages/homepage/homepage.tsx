import React, { useEffect, useState } from 'react'
import Hero from '../../components/hero/hero'
import NavbarMain from '../../components/navbarMain/navbarMain'
import "./homepage.css"
import { Typography, Button, Card, CardContent } from "@mui/material"
import CountUp from "react-countup"
import AboutImg from "../../assets/images/about.jpg"
import Grow from '@mui/material/Grow';
import Language from '../../assets/images/language.js'
import Network from '../../assets/images/network'
import Kollaj from '../../assets/images/kollaj'
import EditIcon from '../../assets/images/editIcon'
import DownloadIcon from '../../assets/images/downloadIcon'
import Pro13 from "../../assets/images/13 Pro - 1.png"
import Pro132 from "../../assets/images/13 Pro - 2.jpg"
import Pro133 from "../../assets/images/13 Pro - 3.jpg"
import Pro134 from "../../assets/images/13 Pro - 4.jpg"
import AccordionHome from '../../components/accordionHome/accordionHome'
import Footer from '../../components/footer/footer'
import { useNavigate } from 'react-router'
import transition from '../../transition.js'
import { Reveal } from '../../reveal'
const Homepage = () => {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true)
    }, 300);
  }, [])

  const navigate = useNavigate();

  return (
    <div className='homepage'>
      <NavbarMain />
      <Hero />

      {/* <img src="http://localhost:8080/uploads/1681518569186icons8-close-48.png" alt="..." /> */}


      {/* FACTS SECTION START */}
      <section className='facts'>
        <ul className='d-flex justify-between'>
          <Grow in={checked}>
            <li className='text-center'>
              <Typography variant='h3' fontWeight="bold"><CountUp duration={4} end={400} /></Typography>
              <Typography>Довольных клиентов</Typography>
            </li>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1000 } : {})}
          >
            <li className='text-center'>
              <Typography variant='h3' fontWeight="bold"><CountUp duration={2} end={30000} />+</Typography>
              <Typography>Довольных клиентов</Typography>
            </li>
          </Grow>
          <Grow
            in={checked}
            style={{ transformOrigin: '0 0 0' }}
            {...(checked ? { timeout: 1500 } : {})}
          >
            <li className='text-center'>
              <Typography variant='h3' fontWeight="bold"><CountUp duration={3} end={10} />M+</Typography>
              <Typography>Довольных клиентов</Typography>
            </li>
          </Grow>
        </ul>
      </section>
      {/* FACTS SECTION END */}

      <div className="main">
        {/* ABOUT SECTION START */}
        <section id='about' className='about d-flex align-start justify-between'>

          <img src={AboutImg} alt="About img" className="leftImg" />
          <div className="right">
            <Reveal>
              <Typography className='top'>Кто мы</Typography>
            </Reveal>
            <Reveal>
              <Typography variant='h4' className='heading'>BizzCard - кто мы?</Typography>
            </Reveal>
            <Reveal>
              <Typography className='content'>
                Мы BizzCard , приятно познакомиться с вами.
                Мы специализируемся на рекламе и маркетинге. Наша визитная карточка родилась после многолетнего опыта работы с предприятиями всех областей и размеров, и делает революцию в маркетинге.
                Бизнесы, для которых мы построили визитную карточку, выглядят и чувствуют себя лучше, работают лучше, а главное – более успешны.
                Наша компания состоит из нескольких команд – консультантов по маркетингу, команды веб-разработки и дизайна

                Самое важное всё причастное к созданию вшей BizzCard у нас выполняет всю работу Искусственный интеллект
                Первый и единственный в стране, по имеющимся данным
              </Typography>
            </Reveal>
          </div>
        </section>
        {/* ABOUT SECTION END */}

        {/* AD SECTION START */}
        <Reveal>
          <section id='ad' className='ad'>
            <div className='shadow'>
              <div className="wrapper">
                <Typography >Premium</Typography>

                <Typography variant='h4' className='heading'>Используйте BizzCard на 100% </Typography>
                <Typography className='content'>
                  Используйте функции вложения электронной почты, отображения маршрута и QR-сканера вместе со всеми простыми функциями и многократно повышайте эффективность
                </Typography>

                <Button onClick={()=>navigate("/subscribe_premium")} className="premium-btn">
                  Premium
                </Button>
              </div>
            </div>
          </section>
        </Reveal>
        {/* AD SECTION END */}

        {/* FUNCTIONS START */}
        <section id='functions' className='functions tex-center'>
          <div className="functions-heading text-center">
            <Reveal width='100%'>
              <Typography className='top'>Функции</Typography>
            </Reveal>
            <Reveal width='100%'>
              <Typography variant='h4' className='heading'>Какие фунции у BizzCard </Typography>
            </Reveal>
            <Reveal width='100%'>
              <Typography className='content'>
                В современном мире необходимы современные решения. Вот почему BizzCard позволяет и продвигает вас, чтобы идти в ногу со временем
              </Typography>
            </Reveal>
          </div>
          <Reveal>
            <div className='cards d-flex align-start'>
              <Card className="card">
                <div className="icon-box"><Language /></div>
                <CardContent>
                  <Typography variant='h5'>Визитной карточки входит в цифровой мир</Typography>
                  <Typography>Создайте вашу собственную визитную карточку
                    всего за две минуты - это просто и элегантно.Вашу карточку
                    можно легко обновить при помощи нашей цифровой панели управления. Вам никогда больше не придётся вновь заказывать и печатать визитные карточки.</Typography>
                </CardContent>
              </Card>
              <Card className="card">
                <div className="icon-box"><Network /></div>
                <CardContent>
                  <Typography variant='h5'>Одна визитная карточка бесконечные возможности</Typography>
                  <Typography>Возможность самовыражения через визитные карточки, которой раньше просто не существовало. Вы можете наглядно продемонстрировать вашу работу, добавив фотографии, видео и ссылки.</Typography>

                </CardContent>
              </Card>
              <Card className="card">
                <div className="icon-box"><Kollaj /></div>
                <CardContent>
                  <Typography variant='h5'>Мобильные телефоны кратчайший путь к клиентам</Typography>
                  <Typography>Быстрейший способ передачи информации клиентам - через их мобильные телефоны. Воспользуйтесь широким спектром возможностей для пересылки, поделитесь вашей карточкой BizzCard с друзьями и клиентами, и позвольте вашему бизнесу стать хитом интернета.</Typography>

                </CardContent>
              </Card>
            </div>
          </Reveal>
        </section>
        {/* FUNCTIONS END */}
      </div >

      {/* HOWITWORKS START */}
      <section id='howItWorks' className='howItWorks' >
        <div className="wrapper">
          <div className="functions-heading text-center">
            <Reveal width='100%'>
              <Typography variant='h4' className='heading'>Как это работает </Typography>
            </Reveal>
            <Reveal width='100%'>
              <Typography className='content'>
                В современном мире необходимы современные решения. Вот почему BizzCard позволяет и продвигает вас, чтобы идти в ногу со временем
              </Typography>
            </Reveal>
          </div>
          <div className="hiwContent d-flex justify-between align-start">
            <div className='hiwCard text-center'>
              <Reveal width='100%'>
                <div className="iconbox">
                  <EditIcon />
                  <div className="index">1</div>
                </div>
              </Reveal>
              <Reveal width='100%'>
                <Typography className='step' variant='h5'>Шаг 1</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="step" variant='h5'>Создайте ваш BizzCard</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="duration">Ровно за 2 минуты - нажмите здесь</Typography>
              </Reveal>
            </div>
            <div className='hiwCard text-center'>
              <Reveal width='100%'>
                <div className="iconbox">
                  <DownloadIcon />
                  <div className="index">2</div>
                </div>
              </Reveal>
              <Reveal width='100%'>
                <Typography className='step' variant='h5'>Шаг 2</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="step" variant='h5'>Сохраните ваш BizzCard</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="duration">На основной экран вашего мобильного телефона</Typography>
              </Reveal>
            </div>
            <div className='hiwCard text-center'>
              <Reveal width='100%'>

                <div className="iconbox">
                  <EditIcon />
                  <div className="index">3</div>
                </div>
              </Reveal>
              <Reveal width='100%'>
                <Typography className='step' variant='h5'>Шаг 3</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="step" variant='h5'>Готово! Можно разослать ваш BizzCard клиентам и друзьям</Typography>
              </Reveal>
              <Reveal width='100%'>
                <Typography className="duration">Ровно за 2 минуты - нажмите здесь</Typography>
              </Reveal>
            </div>
          </div>
          <Reveal width="100%">
            <div className="buttons d-flex align-center justify-center">
              <Button className="start" onClick={() => navigate("/subscribe_free")}>Начать бесплатно</Button>
              <Button className="premium" onClick={() => navigate("/subscribe_premium")}>Попробовать Premium</Button>
            </div>
          </Reveal>
        </div>
      </section >
      {/* HOWITWORKS END */}

      < div className="main" >
        {/* TESTIMONIALS START */}
        < section id='testimonials d-flex' className='testimonials' >
          <Reveal width='100%'>
            <div className="testimonials-card up ">
              <img src={Pro13} alt="pro13" />
            </div>
          </Reveal>
          <Reveal width='100%'>
            <div className="testimonials-card down">
              <img src={Pro132} alt="pro13" />
            </div>
          </Reveal>
          <Reveal width='100%'>
            <div className="testimonials-card up">
              <img src={Pro133} alt="pro13" />
            </div>
          </Reveal>
          <Reveal width='100%'>
            <div className="testimonials-card down">
              <img src={Pro134} alt="pro13" />
            </div>
          </Reveal>
        </section >
        {/* TESTIMONIALS END */}

        {/* FAQ START */}
        <section id='faq' className='faq'>
          <Typography variant='h4'>Часто задаваемые вопросы</Typography>
          <AccordionHome />
        </section>
        {/* FAQ END< */}
      </div >
      <Footer />
      {/* <PageTransition/> */}
    </div >
  )
}
export default transition(Homepage)