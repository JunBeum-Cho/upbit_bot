import ReactJson from 'react-json-view'
import React, { useState, useEffect } from 'react';
import Axios from "axios"

export const JsonViewer = () => {
    const [ jsonlist, set_jsonlist ] = useState({})
    const [ loaded, set_loaded ] = useState(false)

    useEffect(() => {
        Axios.get("/kimp").then(
            function (response) 
            {   
                console.log(response.data)
                set_jsonlist(response.data)
                set_loaded(true)
            }
        )
    })

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
            <text style={{display:"block", fontSize: "18pt", fontFamily:"nanumsquare"}}>로딩 중 ...</text>
        </div>
        
        
    )
}