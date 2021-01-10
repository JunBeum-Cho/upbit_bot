import express from "express";
import path from "path"
import Redis from "redis"
import cp from "child_process"
import cron from 'node-cron'
import { stop_and_restart } from "./utils"
import * as kimp from "./kimp"
const redis_storage = Redis.createClient() // For mac rdb saved in /usr/local/var/db/redis

// second minute hour day-of-month month day-of-week
cron.schedule('0 1 9 * * *', function(){
  stop_and_restart()
});

let app = express();

// sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
app.listen(8080, function () {
  console.log("Express server has started on port 8080");
});


app.use(express.static(path.join(__dirname, "/../../client/build")))
app.use(express.json())

let upbit_process = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit'})
redis_storage.set("status", "running")

app.get("/", function(req, res) {
    res.sendFile("/index.html")
})

app.get("/bot", function(req, res) {
  res.sendFile("/index.html")
})

app.get("/kimp", async function(req, res) {
  let value = await kimp.main()
  res.send(value)
})

app.get("/data", function(req, res) {
  let status, lasterror, history, messages
  try{
    redis_storage.get("status", (err, status_reply) => {
      status = status_reply
      redis_storage.get("lasterror", (err, lasterror_reply) => {
        lasterror = lasterror_reply
        redis_storage.lrange("history", 0, 10, (err, history_reply) => {
          history = history_reply
          redis_storage.lrange("messages", 0, 10, (err, messages_reply) => {
            messages = messages_reply
            res.json({
              "status": status,
              "history": history,
              "lasterror": lasterror,
              "messages": messages
            })
          })
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
      res.json({msg: "already running"})
    } else {
      try {
        upbit_process.kill('SIGINT')
      } catch {
        console.log("Trying to start upbit_process")
      } finally {
        upbit_process = cp.spawn('npx', ['ts-node','upbit.ts'], {stdio: 'inherit'})
        res.sendStatus(200)
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
  redis_storage.del("status", "lasterror", "history", (err, reply) => {
    res.send(`RESET DB`)
  })
})