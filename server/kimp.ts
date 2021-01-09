import axios from "axios"

const thbrate = 36.33;
const tryrate = 148.34;
const usdtrate = 1091;
const idrrate = 0.08

const binance = "https://www.binance.com/api/v3/ticker/price"
const upbit = "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-NEO,KRW-MTL,KRW-LTC,KRW-XRP,KRW-ETC,KRW-OMG,KRW-SNT,KRW-WAVES,KRW-XEM,KRW-QTUM,KRW-LSK,KRW-STEEM,KRW-XLM,KRW-ARDR,KRW-KMD,KRW-ARK,KRW-STORJ,KRW-GRS,KRW-REP,KRW-EMC2,KRW-ADA,KRW-SBD,KRW-POWR,KRW-BTG,KRW-ICX,KRW-EOS,KRW-TRX,KRW-SC,KRW-GTO,KRW-IGNIS,KRW-ONT,KRW-ZIL,KRW-POLY,KRW-ZRX,KRW-SRN,KRW-LOOM,KRW-BCH,KRW-ADX,KRW-BAT,KRW-IOST,KRW-DMT,KRW-RFR,KRW-CVC,KRW-IQ,KRW-IOTA,KRW-OST,KRW-MFT,KRW-ONG,KRW-GAS,KRW-UPP,KRW-ELF,KRW-KNC,KRW-BSV,KRW-THETA,KRW-EDR,KRW-QKC,KRW-BTT,KRW-MOC,KRW-ENJ,KRW-TFUEL,KRW-MANA,KRW-ANKR,KRW-NPXS,KRW-AERGO,KRW-ATOM,KRW-TT,KRW-CRE,KRW-SOLVE,KRW-MBL,KRW-TSHP,KRW-WAXP,KRW-HBAR,KRW-MED,KRW-MLK,KRW-STPT,KRW-ORBS,KRW-VET,KRW-CHZ,KRW-PXL,KRW-STMX,KRW-DKA,KRW-HIVE,KRW-KAVA,KRW-AHT,KRW-SPND,KRW-LINK,KRW-XTZ,KRW-BORA,KRW-JST,KRW-CRO,KRW-TON,KRW-SXP,KRW-LAMB,KRW-HUNT,KRW-MARO,KRW-PLA,KRW-DOT,KRW-SRM,KRW-MVL,KRW-PCI,KRW-STRAX,KRW-AQT,KRW-BCHA,KRW-GLM,KRW-QTCON,KRW-SSX,KRW-META,KRW-OBSR,KRW-FCT2,KRW-LBC,KRW-CBK";
const btcturk = "https://api.btcturk.com/api/v2/ticker";
const bitkub = "https://api.bitkub.com/api/market/ticker";
const mxc = "https://www.mxc.com/open/api/v1/data/ticker"
const dcx = "https://api.coindcx.com/exchange/ticker"
const indodax = "https://indodax.com/api/ticker_all"

let binance_data: any
let upbit_data: any
let btcturk_data: any
let bitkub_data: any
let mxc_data: any
let dcx_data: any
let indodax_data: any

let binance_btcturk_list = []
let binance_bitkub_list = []
let binance_mxc_list = []
let binance_dcx_list = []
let binance_indodax_list = []

const compare_coinlist = ["BTC", "ETH", "XRP", "BCH", "XLM", "ADA", "LTC", "EOS", "TRX", "DOT", "XEM"]

async function main() {
  binance_data = (await axios.get(binance)).data
  upbit_data = (await axios.get(upbit)).data
  btcturk_data = (await axios.get(btcturk)).data
  bitkub_data = (await axios.get(bitkub)).data
  mxc_data = (await axios.get(mxc)).data
  dcx_data = (await axios.get(dcx)).data
  indodax_data =  (await axios.get(indodax)).data

  for (let coin of compare_coinlist) {
    const binance_price = await get_binance_price(coin)*usdtrate
    const upbit_price = await get_upbit_price(coin)
    const btcturk_price = await get_btcturk_price(coin)*tryrate
    const bitkub_price = await get_bitkub_price(coin)*thbrate
    const mxc_price = await get_mxc_price(coin)*usdtrate
    const dcx_price = await get_dcx_price(coin)*usdtrate
    const indodax_price = await get_indodax_price(coin)*idrrate

    const krwturk_pre = (btcturk_price/binance_price - 1) * 100
    const krwkub_pre = (bitkub_price/binance_price - 1) * 100
    const mxc_pre = (mxc_price/binance_price - 1) * 100
    const dcx_pre = (dcx_price/binance_price - 1) * 100
    const indodax_pre = (indodax_price/binance_price - 1) * 100

    binance_btcturk_list.push({"코인명": coin, "바이낸스 가격": binance_price, "터키 가격": btcturk_price, "프리미엄": krwturk_pre})
    binance_bitkub_list.push({"코인명": coin, "바이낸스 가격": binance_price, "태국 가격": bitkub_price, "프리미엄": krwkub_pre})
    binance_mxc_list.push({"코인명": coin, "바이낸스 가격": binance_price, "MXC 가격": mxc_price, "프리미엄": mxc_pre})
    binance_dcx_list.push({"코인명": coin, "바이낸스 가격": binance_price, "DCX 가격": dcx_price, "프리미엄": dcx_pre})
    binance_indodax_list.push({"코인명": coin, "바이낸스 가격": binance_price, "INDODAX 가격": indodax_price, "프리미엄": indodax_pre})
}

    console.log("BINANCE BTCTURK")
    console.log(binance_btcturk_list)
    console.log("-----------------------------------------------")
    console.log("BINANCE BITKUB")
    console.log(binance_bitkub_list)
    console.log("-----------------------------------------------")
    console.log("BINANCE MXC")
    console.log(binance_mxc_list)
    console.log("-----------------------------------------------")
    console.log("BINANCE DCX")
    console.log(binance_dcx_list)
    console.log("-----------------------------------------------")
    console.log("BINANCE INDODAX")
    console.log(binance_indodax_list)
}


//BTCUSDT 형식
async function get_binance_price(coinname: string) {
    for(const coin of binance_data) {
        if(coin.symbol === `${coinname}USDT`) { 
            return coin.price
        }
    }
    return 0
}

//KRW-BTC 형식 //trade_price
async function get_upbit_price(coinname: string) {
    for(const coin of upbit_data) {
        if(coin.market === `KRW-${coinname}`) { 
            return coin.trade_price
        }
    }
    return 0
}

//BTCTRY 형식
async function get_btcturk_price(coinname: string) {
    for(const coin of btcturk_data["data"]) {
        if(coin.pair === `${coinname}TRY`) { 
            return coin.last
        }
    }
    return 0
}

//THB_BTC 형식
async function get_bitkub_price(coin: string) {
    if(bitkub_data[`THB_${coin}`]) {
        return bitkub_data[`THB_${coin}`].last
    }
    return 0
}

//mxc형식
async function get_mxc_price(coin: string) {
    const mxc_list = mxc_data["data"]
    if(mxc_list[`${coin}_USDT`]) {
        return mxc_list[`${coin}_USDT`].last
    }
    return 0
}


//BTCUSDT 형식
async function get_dcx_price(coinname: string) {
    for(const coin of dcx_data) {
        if(coin.market === `${coinname}USDT`) { 
            return coin.last_price
        }
    }
    return 0
}

//btc_idr 형식
async function get_indodax_price(coin: string) {
    const indodax_list = indodax_data["tickers"]
    if(indodax_list[`${coin}_idr`.toLowerCase()]) {
        return indodax_list[`${coin}_idr`.toLowerCase()].last
    }
    return 0
}

main()