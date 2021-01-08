import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialLoginState = { auth: false }
const initialListState = {
    chartlist: ["BINANCE:BTCUSDT"],
    layout: "33",
    theme: "Light",
    interval: "5",
    indicatorlist: [
        "LinearRegression@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MASimple@tv-basicstudies"
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
    console.log(state)
    switch (action.type) {
        case undefined:
            return 
        case "SELECT_LAYOUT":
            return {...state, layout: action.value}
        case "SELECT_THEME":
            return {...state, theme: action.value}
        case "SELECT_INTERVAL":
            return {...state, interval: action.value}
        case "SELECT_INDICATOR":
            let indicatorlist = [...state.indicatorlist, action.value]
            return {...state, indicatorlist: indicatorlist}
        case "DELETE_INDICATOR":
            let filtered_indicatorlist = [...state.indicatorlist].filter(indicator => indicator !== action.value)
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