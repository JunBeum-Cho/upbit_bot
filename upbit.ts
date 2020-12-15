import Axios from "axios"
import TelegramBot from "node-telegram-bot-api"

const alt_boundary = 40
const bitcoin_boundary = 4
const majorcoin_boundary = 8
const majorcoin_list = ["KRW-XRP", "KRW-ETH", "KRW-BSV", "KRW-ADA", "KRW-XLM", "KRW-BCH", "KRW-TRX"]
const threeMinPumping_boundary = 7
const fiveMinPumping_boundary = 10

const token= '1136799268:AAEAHJKs1ZWH_lqmRtRWdMDB_l0Vetq5a_E'
const bot = new TelegramBot(token)
const chatId = "@letsgetittt";
let history = {}

const sleep = (ms) => {
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}

const telegram_msg = (text: string) => {
  bot.sendMessage(chatId, text);
}

export default async function main(status: any) {
  telegram_msg(`*프로그램 ON*`)
  try{
    while(true) {
      status["running"] = true
      await data()
      status["history"].unshift(new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}))
      await sleep(10000)
    }
  } catch (e) {
    telegram_msg(`*에러발생*\n${e}`)
    status["running"] = false
    status["lasterrortime"] = new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})
    await sleep(10000)
    main(history)
  }
}

async function data()  {
    let coinList: {"market": string, "korean_name": string, "english_name": string}[] = (await Axios.get("https://api.upbit.com/v1/market/all")).data
    let KRW_coinList = coinList.filter(coin => coin.market.startsWith("KRW")).map(coin => coin.market)
    let KRW_coinList_string = KRW_coinList.toString()
    let currmarket_data = (await Axios.get(`https://api.upbit.com/v1/ticker?markets=${KRW_coinList_string}`)).data
    for (let coin of currmarket_data) {
      let dayChg = coin?.change_rate * 100
      if(coin?.market === "KRW-BTC" && coin?.change === 'RISE' && dayChg > bitcoin_boundary) {
        if (check(coin, 1800)) {telegram_msg(`${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`)}
      } else if(majorcoin_list.includes(coin?.market) && coin?.change === 'RISE' && dayChg > majorcoin_boundary) {
        if (check(coin, 1800)) {telegram_msg(`${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`)}
      } else if(coin?.change === 'RISE' && dayChg> alt_boundary) {
        if (check(coin, 1800)) {telegram_msg(`${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`)}
      }
    }

    for(let coin of KRW_coinList) {
      let minutes_3 = (await Axios.get(`https://api.upbit.com/v1/candles/minutes/3?market=${coin}&count=2`)).data
      let minutes_5 = (await Axios.get(`https://api.upbit.com/v1/candles/minutes/5?market=${coin}&count=2`)).data
      let threeMinChg = ((minutes_3[1]?.trade_price / minutes_3[1]?.opening_price) - 1) * 100
      let fiveMinChg = ((minutes_5[1]?.trade_price / minutes_5[1]?.opening_price) - 1) * 100
      if (threeMinChg > threeMinPumping_boundary) {
        if (check(coin, 180)) {telegram_msg(`${minutes_3[1]?.market}가 최근 3분동안 ${threeMinChg.toFixed(2)}%만큼 급등중`)}
      } else if (fiveMinChg > fiveMinPumping_boundary) {
        if (check(coin, 300)) {telegram_msg(`${minutes_5[1]?.market}가 최근 5분동안 ${fiveMinChg.toFixed(2)}%만큼 급등중`)}
      }
      await sleep(250)
    }
}

function check(coin: any, interval: number) {
  let currTime = new Date()
  if(!history[coin?.market]) {
    history[coin?.market] = currTime
    return true
  } else if (history[coin?.market] && (currTime.getTime() - history[coin?.market].getTime())/1000 > interval) {
    history[coin?.market] = currTime
    return true
  } else {
    return false
  }
}