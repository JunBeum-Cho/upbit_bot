import express from "express";
import path from "path"
import main from "./upbit"
import Redis from "redis"
import cp from "child_process"
import { findConfigFile } from "typescript";

const redis_storage = Redis.createClient() // For mac rdb saved in /usr/local/var/db/redis
let app = express();
let upbit_process: any

app.listen(8080, function () {
  console.log("Express server has started on port 8080");
});

app.use(express.static(path.join(__dirname, "/")))
app.use(express.json())

let status = {
    running: false,
    lasterrortime: "",
    history: []
}

app.get("/", function(req, res) {
    
    res.status(200).send("server is RUNNING")
})

app.get("/status", function(req, res) {
    res.status(200).send(status)
})


app.get("/start",  function(req, res) {
    if(!status.running) {
        upbit_process = cp.spawn("npx ts-node upbit.ts")
        res.send("successfully started")
    } else {
        res.send("already running")
    }
})

app.get("/stop", function(req, res) {
    upbit_process.kill('SIGINT')
    res.send("succesfully stopped")
})

app.get("/test1/:testkey/:testvalue", function(req, res) {
    let key=req.params.testkey
    let value=req.params.testvalue
    redis_storage.set(key, value)
    res.send(`succesfully set ${key}:${value}`)
})

app.get("/test2/:testkey", function(req, res) {
    let key=req.params.testkey
    redis_storage.get(key, (err, reply) => {
        if(!err) {
            res.send(`requested key: ${key} and corresponding value: ${reply}`)
        } else {
            res.send(`error: ${err}`)
        }
    })
})

app.get("/allinfo", function(req, res) {
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

app.get("/test", function(req, res) {
    redis_storage.lpush("testti", "a", "b", "c")
    redis_storage.lrange("testti", 0, 1, (err, reply)=>{
        res.send(reply)
    })
})