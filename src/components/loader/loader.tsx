import React from 'react'
import { HashLoader,PropagateLoader } from "react-spinners"
import "./loader.css"


interface ClassNameLoader{
    className:string;
}

export default function Loader(props:ClassNameLoader) {
    return (
        <div className={`loader ${props.className}`}>
            <PropagateLoader  color="#8D6736" size={15} />
        </div>
    )
}
