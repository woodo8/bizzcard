import React from 'react'
import { HashLoader } from "react-spinners"
import "./loader.css"


interface ClassNameLoader{
    className:string;
}

export default function Loader(props:ClassNameLoader) {
    return (
        <div className={`loader ${props.className}`}>
            <HashLoader  color="#8D6736" size={150} />
        </div>
    )
}
