import cp from "child_process"
const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

async function x() {
    let con = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit'})
    await sleep(15000)
    con.kill('SIGINT')
}   
  
x()