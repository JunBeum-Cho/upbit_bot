import ReactJson from 'react-json-view'
import React, { useState, useEffect } from 'react';
import Axios from "axios"

export const JsonViewer = () => {
    const [ jsonlist, set_jsonlist ] = useState({})
    const [ loaded, set_loaded ] = useState(false)
    const headers = {
        'Cache-Control': 'no-cache',
        // 'Cache-Control': 'no-cache',
        // 'Pragma': 'no-cache',
        // 'Expires': '0',
    }

    useEffect(() => {
        const data = getData()
        set_jsonlist(data)
        set_loaded(true)
    })

    let getData = async() =>{
        const data = await (await Axios.get(`/kimp_data?time=${new Date().toLocaleString}`)).data
        return data
    }

    return(
        loaded
        ? 
        <ReactJson 
            theme="railscasts"
            iconStyle="triangle"
            displayDataTypes={false}
            displayObjectSize={true}
            collapsed={false}
            src={jsonlist} 
        />
        : 
        <div style={{textAlign: "center", height:"99vh"}}>
            <img src={require("../res/loading.gif")}/>
            <h2 style={{display:"block", fontSize: "18pt", fontFamily:"nanumsquare"}}>로딩 중 ...</h2>
        </div>
        
        
    )
}