require("dotenv").config()
const express = require("express")
import { submit } from "./src/notion"

const app = express()

var infos : any;

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.post("/submit", async (req:any, res:any) => {
    let response =  await submit(req)
    infos = response;
    res.redirect("/");
})

app.get("/", (req: any,res: any) => {
    res.render("index", {infos})
})

app.listen(process.env.PORT)