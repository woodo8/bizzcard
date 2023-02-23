import { Accordion, Typography } from '@mui/material'
import React from 'react'
import "./accordionProfile.css"
import { AccordionDetailss, Accordionn, AccordionSummaryy } from './utils';


export default function AccordionProfile() {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div className='accordionProfile'>

            <Accordionn expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummaryy aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>Мои услуги</Typography>
                </AccordionSummaryy>
                <AccordionDetailss>
                    <ul className='services'>
                        <li>Услуга номер 1</li>
                        <li>Услуга номер 2</li>
                        <li>Услуга номер 3</li>
                        <li>Услуга номер 4</li>
                        <li>Услуга номер 5</li>
                    </ul>
                </AccordionDetailss>
            </Accordionn>
            <Accordionn expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummaryy aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Контакты</Typography>
                </AccordionSummaryy>
                <AccordionDetailss>
                    <Typography className='name'>
                        Самадович Акмал Турсунов
                    </Typography>
                    <Typography className='tagName'>
                        Телефон
                    </Typography>
                    <Typography className='content'>
                        +998 88 123 45 67
                    </Typography>
                    <Typography className='tagName'>
                        Электронная почта
                    </Typography>
                    <Typography className='content'>
                        akmaltr@gmail.com
                    </Typography>
                    <Typography className='tagName'>
                        Адрес
                    </Typography>
                    <Typography className='content'>
                        Город Ташкент, Шейхантаурский район улица Дустлик , дом 3-16 а
                    </Typography>
                    <Typography className='tagName'>
                        Время работы
                    </Typography>
                    <Typography className='content'>
                        Понедельник-пятница: 9:00 - 18:00
                    </Typography>
                </AccordionDetailss>
            </Accordionn>
        </div>
    )
}


