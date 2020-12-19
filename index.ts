import express from "express";
import path from "path"
import Redis from "redis"
import cp from "child_process"
import cron from 'node-cron'
const redis_storage = Redis.createClient() // For mac rdb saved in /usr/local/var/db/redis

// second minute hour day-of-month month day-of-week
cron.schedule('0 1 9 * * *', function(){
  console.log('node-cron 실행');
});

let app = express();

// sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
app.listen(8080, function () {
  console.log("Express server has started on port 8080");
});


app.use(express.static(path.join(__dirname, "/")))
app.use(express.json())

let upbit_process = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit'})
redis_storage.set("status", "running")

app.get("/", function(req, res) {
    let status, last_error, history
    try{
      redis_storage.get("status", (err, status_reply) => {
        status = status_reply
        redis_storage.get("last_error", (err, last_error_reply) => {
          last_error = last_error_reply
          redis_storage.lrange("history", 0, 10, (err, history_reply) => {
            history = history_reply
            res.send(`STATUS: ${status}\n\nLAST ERROR: ${last_error}\n\nHISTORY: ${history}`)
          })
        })
      })
    } catch (err) {
      res.send(`ERROR: ${err}`)
    }
})


app.get("/start",  function(req, res) {
  redis_storage.get("status", (err, reply) => {
    if(reply === "running") {
      res.send("already running")
    } else {
      try {
        upbit_process.kill('SIGINT')
      } catch {
        console.log("Trying to start upbit_process")
      } finally {
        upbit_process = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit'})
        res.send("successfully started")
      }
    }
  })
})

app.get("/stop", function(req, res) {
    upbit_process.kill('SIGINT')
    redis_storage.set("status", "stopped")
    res.send("succesfully stopped")
})

app.get("/get/:key", function(req, res) {
  redis_storage.get(req.params.key, (err, reply)=>{
    res.send(`${reply}`)
  })
})

app.get("/set/:testkey/:testvalue", function(req, res) {
  let key=req.params.testkey
  let value=req.params.testvalue
  redis_storage.set(key, value)
  res.send(`succesfully set ${key}:${value}`)
})

app.get("/del/:key", function(req, res) {
  redis_storage.del(req.params.key, (err, reply)=>{
      res.send(`${reply}`)
  })
})

app.get("/getallinfo", function(req, res) {
  redis_storage.KEYS("*", (err,reply) => {
      res.send(reply)
  })
})

app.get("/size", function(req, res) {
  redis_storage.DBSIZE((err,reply) => {
      if(err) {
          res.send(err)
      } else {
          res.send(`${reply}`)
      }
  })
})

app.get("/reset", function(req, res) {
  redis_storage.del("status", "last_error", "history", (err, reply) => {
    res.send(`RESET DB`)
  })
})