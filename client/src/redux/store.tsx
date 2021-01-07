import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialLoginState = { auth: false }
const initialListState = {
    auth: false,
    chartlist: [],
    layout: "33",
    theme: "light",
    interval: "5",
    indicators: [
        "LinearRegression@tv-basicstudies",
        "RSI@tv-basicstudies",
        "MASimple@tv-basicstudies"
    ]
}

function login(state = initialLoginState, action) {
    console.log("login reducer", state, action)
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
    console.log("charts reducer", state, action)
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
            return {...state, indicator: action.value}
        case "ADD_CHART":
            //여기에서 string 합쳐야함
            const marketname = `${action.value.toUpperCase()}:${action.value2.toUpperCase()}`
            // let marketnames = `${action.value.toString().toUppercase()}:${action.value2.toString().toUppercase()}`
            // chartlist 리스트에 추가해야함
            let chartlist = [...state.chartlist, marketname]
            return {...state, chartlist: chartlist}
        default:
            return state
    }
}
    
let store = createStore(combineReducers({ login, charts }), composeWithDevTools())
export default store