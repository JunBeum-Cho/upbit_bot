import Axios from "axios"
import Redis from "redis"
import { sleep, telegram_msg } from "./utils"

const alt_boundary = 40
const bitcoin_boundary = 3
const majorcoin_boundary = 5
const majorcoin_list = ["KRW-XRP", "KRW-ETH", "KRW-BSV", "KRW-ADA", "KRW-XLM", "KRW-BCH", "KRW-TRX"]
const threeMinPumping_boundary = 7
const fiveMinPumping_boundary = 10
const redis_storage = Redis.createClient()
let history = {}

process.on('SIGINT', () => {
  console.log("kill command received")
  redis_storage.set("status", "stopped")
  process.exit(2);
})

export default async function main() {
  telegram_msg(`*프로그램 ON*`)
  try{
    while(true) {
      redis_storage.set("status", "running")
      await data()
      redis_storage.lpush("history", `${new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"})}`)
      await sleep(10000)
    }
  } catch (e) {
    await sleep(10000)
    telegram_msg(`*에러발생*\n${e}`)
    redis_storage.set("status", "stopped")
    redis_storage.set("lasterror", new Date().toLocaleString("ko-KR", {timeZone: "Asia/Seoul"}))
    main()
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
        if (check_normal(coin, 1800, dayChg.toFixed(2), true, 2)) {
          let msg = `${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`
          telegram_msg(msg)
          redis_storage.lpush("messages", msg)
        }
      } else if(majorcoin_list.includes(coin?.market) && coin?.change === 'RISE' && dayChg > majorcoin_boundary) {
        if (check_normal(coin, 1800, dayChg.toFixed(2), true, 3)) {
          let msg = `${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`
          telegram_msg(msg)
          redis_storage.lpush("messages", msg)
        }
      } else if(coin?.change === 'RISE' && dayChg> alt_boundary) {
        if (check_normal(coin, 900, dayChg.toFixed(2), true, 10)) {
          let msg = `${coin?.market}가 당일 ${dayChg.toFixed(2)}%만큼 상승중`
          telegram_msg(msg)
          redis_storage.lpush("messages", msg)
        }
      }
    }

    for(let coin of KRW_coinList) {
      let minutes_3 = (await Axios.get(`https://api.upbit.com/v1/candles/minutes/3?market=${coin}&count=2`)).data
      let minutes_5 = (await Axios.get(`https://api.upbit.com/v1/candles/minutes/5?market=${coin}&count=2`)).data
      let threeMinChg = ((minutes_3[1]?.trade_price / minutes_3[1]?.opening_price) - 1) * 100
      let fiveMinChg = ((minutes_5[1]?.trade_price / minutes_5[1]?.opening_price) - 1) * 100
      if (threeMinChg > threeMinPumping_boundary) {
        if (check_pump(coin, 180)) {
          let msg = `${minutes_3[1]?.market}가 최근 3분동안 ${threeMinChg.toFixed(2)}%만큼 급등중`
          telegram_msg(msg)
          redis_storage.lpush("messages", msg)
          check_notice(coin)
          }
      } else if (fiveMinChg > fiveMinPumping_boundary) {
        if (check_pump(coin, 300)) {
          let msg = `${minutes_5[1]?.market}가 최근 5분동안 ${fiveMinChg.toFixed(2)}%만큼 급등중`
          telegram_msg(msg)
          redis_storage.lpush("messages", msg)
          check_notice(coin)
        }
      }
      await sleep(300)
    }
}

function check_normal(coin: any, interval: number, dayChg: String, filter: boolean = false, filter_rate?: number) {
  let currTime = new Date()
  if(!history[coin?.market]) {
    history[coin?.market] = {currTime: currTime, dayChg: dayChg}
    return true
  } else if (history[coin?.market] && (currTime.getTime() - history[coin?.market].currTime.getTime())/1000 > interval) {
    if(filter) {
      if (Number(dayChg) - Number(history[coin?.market].dayChg) > filter_rate) {
        history[coin?.market] = {currTime: currTime, dayChg: dayChg}
        return true
      } else
      return false
    } else {
      history[coin?.market] = {currTime: currTime, dayChg: dayChg}
      return true
    }
  } else {
    return false
  }
}

function check_pump(coin: any, interval: number) {
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

async function check_notice(coinName: string) {
  let notice_req = (await Axios.get("https://api-manager.upbit.com/api/v1/notices?page=1&per_page=20")).data
  // notice_req.data.list[0].title
  for (let index=0; index < 5; index ++) {
    if(notice_req.data.list[index].title.includes(coinName.replace("KRW-", ""))) {
      telegram_msg(`관련 공지:\n${notice_req.data.list[index].title}`)
    }
  }
}

main()

