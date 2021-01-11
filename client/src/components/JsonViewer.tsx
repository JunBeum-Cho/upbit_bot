import ReactJson from 'react-json-view'
import React, { useState, useEffect } from 'react';
import axios from "axios"
export const JsonViewer = () => {
    let jsonlist = {}
    useEffect(() => {
        jsonlist = axios.get("jeonmun.ga/kimp")        
    })

    return(
        <ReactJson 
            theme="railscasts"
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={true}
            collapsed={false}
            src={jsonlist} 
        />
    )
}