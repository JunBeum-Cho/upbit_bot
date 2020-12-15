import express from "express";
import path from "path"
import main from "./upbit"

let app = express();
app.listen(8080, function () {
  console.log("Express server has started on port 8080");
});

app.use(express.static(path.join(__dirname, "/")))
app.use(express.json())

let status = {
    running: true,
    history: [],
    lasterrortime: ""
}
app.get("/", function(req, res) {
    res.status(200).send(status)
})

app.get("/start",  function(req, res) {
    if(!status.running) {
        main(status)
    }
    res.send("successfully started")
})