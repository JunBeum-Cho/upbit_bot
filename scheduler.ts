import Axios from "axios"
import { sleep, telegram_msg } from "./utils"
const stop_and_restart = async () => {
    await Axios.get(`http://junbeumcho.ga/stop`)
    await sleep(3000)
    await Axios.get(`http://junbeumcho.ga/start`)
    telegram_msg(`* 9시 정각 프로그램 리부팅*`)
}

stop_and_restart()