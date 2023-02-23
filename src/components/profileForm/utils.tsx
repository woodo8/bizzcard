import styled from "@emotion/styled";
import { OutlinedInputProps, TextField, TextFieldProps } from "@mui/material";
import React from "react";

export const CustomTextField = styled(TextField)({
    // backgroundColor:"blue",
    '& .MuiOutlinedInput-notchedOutline': {
        borderColor: "#8D6736 !important"
    },
    '& .MuiFormLabel-root': {
        fontSize: "16px",
        color: "#303030",
    },
    '& .MuiFormLabel-root.Mui-focused': {
        color: "#8D6736 !important"
    },
});