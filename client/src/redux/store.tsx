import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialLoginState = { auth: false }
const initialListState = {
    exchange: "바이낸스",
    chartlist: [],
    editing: false,
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
    console.log(state, action)
    switch (action.type) {
        case "LOGIN":
            return {...state, auth: true}
        case "LOGOUT":
            return {...state, auth: false}
        default:
            return state
    }
} 

function charts(state = initialListState, action) {
    console.log(state)
    switch (action.type) {
        case undefined:
            return 
        case "SELECT_EXCHANGE":
            return {...state, exchange: action.value}
        case "CHANGE_EDITING":
            return {...state, editing: !state.editing}
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
            let marketname = action.value + action.value2
            // chartlist 리스트에 추가해야함

            return {...state, indicator: action.value}
        default:
            return state
    }
}
    
let store = createStore(combineReducers({ login, charts }), composeWithDevTools())
export default store