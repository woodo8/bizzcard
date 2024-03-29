import { Accordion, Typography } from '@mui/material'
import { convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import React, { useEffect } from 'react'
import "./accordionProfile.css"
import { AccordionDetailss, Accordionn, AccordionSummaryy } from './utils';
import EngineeringIcon from '@mui/icons-material/Engineering';
import { Reveal } from '../../reveal';

export default function AccordionProfile({ card }: any) {
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div className='accordionProfile'>

            {
                card.services &&
                <Accordionn expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummaryy aria-controls="panel1d-content" id="panel1d-header">
                        <Typography>Мои услуги</Typography>
                    </AccordionSummaryy>
                    <AccordionDetailss>
                        <ul className='services'>
                            {
                                card.services.split(",").filter(
                                    (item: any) => item.replace(/\s/g, '').length
                                ).map((item: any) => (
                                    <li>
                                        <EngineeringIcon style={{ marginRight: "15px", color: "#E8C488" }} />
                                        <Reveal>
                                            <p>
                                                {item.trim()}
                                            </p>
                                        </Reveal>
                                    </li>

                                ))
                            }
                        </ul>
                    </AccordionDetailss>
                </Accordionn>
            }
            <Accordionn expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummaryy aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>Контакты</Typography>
                </AccordionSummaryy>
                <AccordionDetailss>
                    <Reveal>
                        <Typography className='namee'>
                            {card.name}
                        </Typography>
                    </Reveal>
                    <Reveal>
                        <Typography className='tagName'>
                            Телефон
                        </Typography>
                    </Reveal>
                    <Reveal>
                        <Typography className='content'>
                            {card.mobile}
                        </Typography>
                    </Reveal>
                    <Reveal>
                        <Typography className='tagName'>
                            Электронная почта
                        </Typography>
                    </Reveal>
                    <Reveal>
                        <Typography className='content'>
                            {card.email}
                        </Typography>
                    </Reveal>
                    {card.websiteLink &&
                        <Reveal>
                            <>
                                <Typography className='tagName'>
                                    Вебсайт
                                </Typography>
                                <a href={card.websiteLink} target="_blank">
                                    <Typography className='content'>
                                        {card.websiteLink}
                                    </Typography>
                                </a>
                            </>
                        </Reveal>
                    }
                    {card.location &&
                        <Reveal>
                            <>
                                <Typography className='tagName'>
                                    Адрес
                                </Typography>
                                <Typography className='content underline'>
                                    {card.location}
                                </Typography>
                            </>
                        </Reveal>
                    }
                    {card.timeFrom && card.timeUntil &&
                        <Reveal>
                            <>
                                <Typography className='tagName'>
                                    Время работы
                                </Typography>

                                <Typography className='content'>
                                    Понедельник-пятница: {card.timeFrom} - {card.timeUntil}
                                </Typography>
                            </>
                        </Reveal>
                    }
                </AccordionDetailss>
            </Accordionn>
        </div >
    )
}


