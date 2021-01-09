import axios from "axios"

const thbrate = 36.33;
const tryrate = 148.34;

const upbit = "https://api.upbit.com/v1/ticker?markets=KRW-BTC,KRW-ETH,KRW-NEO,KRW-MTL,KRW-LTC,KRW-XRP,KRW-ETC,KRW-OMG,KRW-SNT,KRW-WAVES,KRW-XEM,KRW-QTUM,KRW-LSK,KRW-STEEM,KRW-XLM,KRW-ARDR,KRW-KMD,KRW-ARK,KRW-STORJ,KRW-GRS,KRW-REP,KRW-EMC2,KRW-ADA,KRW-SBD,KRW-POWR,KRW-BTG,KRW-ICX,KRW-EOS,KRW-TRX,KRW-SC,KRW-GTO,KRW-IGNIS,KRW-ONT,KRW-ZIL,KRW-POLY,KRW-ZRX,KRW-SRN,KRW-LOOM,KRW-BCH,KRW-ADX,KRW-BAT,KRW-IOST,KRW-DMT,KRW-RFR,KRW-CVC,KRW-IQ,KRW-IOTA,KRW-OST,KRW-MFT,KRW-ONG,KRW-GAS,KRW-UPP,KRW-ELF,KRW-KNC,KRW-BSV,KRW-THETA,KRW-EDR,KRW-QKC,KRW-BTT,KRW-MOC,KRW-ENJ,KRW-TFUEL,KRW-MANA,KRW-ANKR,KRW-NPXS,KRW-AERGO,KRW-ATOM,KRW-TT,KRW-CRE,KRW-SOLVE,KRW-MBL,KRW-TSHP,KRW-WAXP,KRW-HBAR,KRW-MED,KRW-MLK,KRW-STPT,KRW-ORBS,KRW-VET,KRW-CHZ,KRW-PXL,KRW-STMX,KRW-DKA,KRW-HIVE,KRW-KAVA,KRW-AHT,KRW-SPND,KRW-LINK,KRW-XTZ,KRW-BORA,KRW-JST,KRW-CRO,KRW-TON,KRW-SXP,KRW-LAMB,KRW-HUNT,KRW-MARO,KRW-PLA,KRW-DOT,KRW-SRM,KRW-MVL,KRW-PCI,KRW-STRAX,KRW-AQT,KRW-BCHA,KRW-GLM,KRW-QTCON,KRW-SSX,KRW-META,KRW-OBSR,KRW-FCT2,KRW-LBC,KRW-CBK";
const btcturk = "https://api.btcturk.com/api/v2/ticker";
const bitkub = "https://api.bitkub.com/api/market/ticker";

let upbit_btcturk_list: string[]
let upbit_bitkub_list: string[]
const compare_coinlist = ["BTC", "ETH", "XRP", "BCH", "XLM", "ADA", "LTC", "EOS", "TRX", "DOT", "XEM"]

async function main() {
  let upbit_data = (await axios.get(upbit)).data
  let btcturk_data = (await axios.get(btcturk)).data
  let bitkub_data = (await axios.get(bitkub)).data

  for (let coin of compare_coinlist) {
    
  }
}

//KRW-BTC 형식 //trade_price
async function get_upbit_price(coin: string) {
  return price
}

//BTCTRY 형식
async function get_btcturk_price(coin: string) {
    return price
}

//THB_BTC 형식
async function get_bitkub_price(coin: string) {
    return price
}
