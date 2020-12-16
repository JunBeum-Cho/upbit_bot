import cp from "child_process"
const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
  }

async function x() {
    let con = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit', shell: true})
    await sleep(35000)
    con.kill('SIGINT')
}   
  
x()