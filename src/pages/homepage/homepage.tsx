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

export default function Homepage() {
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setChecked(true)
    }, 300);
  }, [])

  return (
    <div className='homepage'>
      <NavbarMain />
      <Hero  />

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
        <section id='about' className='about d-flex align-center justify-between'>

          <img src={AboutImg} alt="About img" className="leftImg" />
          <div className="right">
            <Typography className='top'>Кто мы</Typography>
            <Typography variant='h4' className='heading'>BizzCard - кто мы?</Typography>
            <Typography className='content'>
              Мы BizzCard , приятно познакомиться с вами.
              Мы специализируемся на рекламе и маркетинге. Наша визитная карточка родилась после многолетнего опыта работы с предприятиями всех областей и размеров, и делает революцию в маркетинге.
              Бизнесы, для которых мы построили визитную карточку, выглядят и чувствуют себя лучше, работают лучше, а главное – более успешны.
              Наша компания состоит из нескольких команд – консультантов по маркетингу, команды веб-разработки и дизайна

              Самое важное всё причастное к созданию вшей BizzCard у нас выполняет всю работу Искусственный интеллект
              Первый и единственный в стране, по имеющимся данным
            </Typography>
          </div>
        </section>
        {/* ABOUT SECTION END */}

        {/* AD SECTION START */}
        <section id='ad' className='ad'>
          <div className='shadow'>
            <div className="wrapper">
              <Typography className='top'>Premium</Typography>
              <Typography variant='h4' className='heading'>Используйте BizzCard на 100% </Typography>
              <Typography className='content'>
                Используйте функции вложения электронной почты, отображения маршрута и QR-сканера вместе со всеми простыми функциями и многократно повышайте эффективность
              </Typography>
              <Button className="premium-btn">
                Premium
              </Button>
            </div>
          </div>
        </section>
        {/* AD SECTION END */}

        {/* FUNCTIONS START */}
        <section id='functions' className='functions'>
          <div className="functions-heading text-center">
            <Typography className='top'>Функции</Typography>
            <Typography variant='h4' className='heading'>Какие фунции у BizzCard </Typography>
            <Typography className='content'>
              В современном мире необходимы современные решения. Вот почему BizzCard позволяет и продвигает вас, чтобы идти в ногу со временем
            </Typography>
          </div>
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
        </section>
        {/* FUNCTIONS END */}
        <section id='faq' className='faq'></section>
      </div>

      {/* HOWITWORKS START */}
      <section id='howItWorks' className='howItWorks'>
        <div className="wrapper">
          <div className="functions-heading text-center">
            <Typography variant='h4' className='heading'>Как это работает </Typography>
            <Typography className='content'>
              В современном мире необходимы современные решения. Вот почему BizzCard позволяет и продвигает вас, чтобы идти в ногу со временем
            </Typography>
          </div>
          <div className="hiwContent d-flex justify-between align-start">
            <div className='hiwCard text-center'>
              <div className="iconbox">
                <EditIcon />
                <div className="index">1</div>
              </div>
              <Typography className='step' variant='h5'>Шаг 1</Typography>
              <Typography className="step" variant='h5'>Создайте ваш BizzCard</Typography>
              <Typography className="duration">Ровно за 2 минуты - нажмите здесь</Typography>
            </div>
            <div className='hiwCard text-center'>
              <div className="iconbox">
                <DownloadIcon />
                <div className="index">2</div>
              </div>
              <Typography className='step' variant='h5'>Шаг 2</Typography>
              <Typography className="step" variant='h5'>Сохраните ваш BizzCard</Typography>
              <Typography className="duration">На основной экран вашего мобильного телефона</Typography>
            </div>
            <div className='hiwCard text-center'>
              <div className="iconbox">
                <EditIcon />
                <div className="index">3</div>
              </div>
              <Typography className='step' variant='h5'>Шаг 3</Typography>
              <Typography className="step" variant='h5'>Готово! Можно разослать ваш BizzCard клиентам и друзьям</Typography>
              <Typography className="duration">Ровно за 2 минуты - нажмите здесь</Typography>
            </div>
          </div>
          <div className="buttons d-flex align-center justify-center">
            <Button className="start ">Начать бесплатно</Button>
            <Button className="premium">Попробовать Premium</Button>
          </div>
        </div>
      </section>
      {/* HOWITWORKS END */}

      <div className="main">
        {/* TESTIMONIALS START */}
        <section id='testimonials d-flex' className='testimonials'>
          <div className="testimonials-card up "><img src={Pro13} alt="pro13" /></div>
          <div className="testimonials-card down"><img src={Pro132} alt="pro13" /></div>
          <div className="testimonials-card up"><img src={Pro133} alt="pro13" /></div>
          <div className="testimonials-card down"><img src={Pro134} alt="pro13" /></div>
        </section>
        {/* TESTIMONIALS END */}

        {/* FAQ START */}
        <section id='faq' className='faq'>
          <Typography variant='h4'>Часто задаваемые вопросы</Typography>
          <AccordionHome />
        </section>
        {/* FAQ END */}
      </div>
      <Footer/>
    </div>
  )
}
