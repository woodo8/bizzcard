import styled from '@emotion/styled';
import React from "react"
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, AccordionSummaryProps, Typography } from '@mui/material'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


export const Accordionn = styled((props: AccordionProps) => (
    <Accordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    // border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

export const AccordionSummaryy = styled((props: AccordionSummaryProps) => (
    <AccordionSummary
        expandIcon={<ArrowForwardIosIcon style={{ color: "#303030" }} sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(() => ({
    backgroundColor:
        "#F3F3F3",
    '& p': {
        fontWeight: "400",
        fontSize: "24px",
        lineHeight: "150%",
        textAlign: "center",
        color: "#303030",
    },
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
}));

export const AccordionDetailss: any = styled(AccordionDetails)(() => ({
    borderTop: '1px solid rgba(0, 0, 0, .125)',
    textAlign: "left",
    fontWeight: "400",
    fontSize: "24px",
    color: "#303030",
    listStyleType:"disc"
}));

