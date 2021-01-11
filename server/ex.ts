import express from "express";
import path from "path"
import Redis from "redis"
import cp from "child_process"
import cron from 'node-cron'
import { stop_and_restart } from "./utils"
import * as kimp from "./kimp"
let app = express();

// sudo iptables -t nat -I PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8080
app.listen(8080, function () {
  console.log("Express server has started on port 8080");
});


app.use(express.static(path.join(__dirname, "/../../client/build")))
app.use(express.json())

app.get("/kimp", async function(req, res) {
    let value = await kimp.main()
    res.send(value)
})

