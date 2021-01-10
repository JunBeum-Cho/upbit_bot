import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { indicator_list } from '../info_list'

const initialLoginState = { auth: false }
const initialListState = {
    chartlist: ["BINANCE:BTCUSDT"],
    layout: "2",
    layout_width: "2",
    layout_height: "2",
    theme: "Light",
    interval: "5",
    indicatorlist: [        
        {
            "name": "상대강도지수 (Relative Strength Index)" ,
            "symbol": "RSI@tv-basicstudies"
        }
    ]
}

function login(state = initialLoginState, action) {
    switch (action.type) {
        case "LOGIN":
            return {...state, auth: action.value}
        case "LOGOUT":
            return {...state, auth: action.value}
        default:
            return state
    }
} 

function charts(state = initialListState, action) {
    switch (action.type) {
        case undefined:
            return 
        case "SELECT_LAYOUT":
            return {...state, layout_width: action.width, layout_height: action.height}
        case "SELECT_THEME":
            return {...state, theme: action.value}
        case "SELECT_INTERVAL":
            return {...state, interval: action.value}
        case "ADD_INDICATOR":
            let contained = false
            for (let indicator of state.indicatorlist) {
                if (indicator.name === action.value.name) {
                    contained = true
                }
            }
            let indicatorlist = !contained ? [...state.indicatorlist, action.value] : state.indicatorlist
            return {...state, indicatorlist: indicatorlist}
        case "DELETE_INDICATOR":
            let filtered_indicatorlist = [...state.indicatorlist].filter(indicator => indicator.name !== action.value.name)
            return {...state, indicatorlist: filtered_indicatorlist}
        case "ADD_CHART":
            const marketname = `${action.value.toUpperCase()}:${action.value2.toUpperCase()}`
            let chartlist = [...state.chartlist, marketname]
            return {...state, chartlist: chartlist}
        case "DELETE_CHART":
            let filtered_chartlist = [...state.chartlist].filter(marketname => marketname !== action.value)
            return {...state, chartlist: filtered_chartlist}
        default:
            return state
    }
}
    
let store = createStore(combineReducers({ login, charts }), composeWithDevTools())
export default store