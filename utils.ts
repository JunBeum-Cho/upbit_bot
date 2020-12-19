import Axios from "axios"

const token= '1136799268:AAEAHJKs1ZWH_lqmRtRWdMDB_l0Vetq5a_E'
const chatIdINT = '-1001202777995'
// const bot = new TelegramBot(token)
// const chatId = "@letsgetittt";
// const telegram_msg = (text: string) => {
//   bot.sendMessage(chatId, text);
// }

export const telegram_msg = async (text: string) => {
  await Axios.get(`https://api.telegram.org/bot${token}/sendmessage?chat_id=${chatIdINT}&text=${encodeURIComponent(text)}`)
}

export const sleep = (ms: number) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}