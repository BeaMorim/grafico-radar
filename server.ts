require("dotenv").config()
const express = require("express")
import { submit, includeChart } from "./src/notion"

const app = express()

var chartValues = {
    label: [] as string[],
    data: [] as number[]
};

app.use(express.json({limit: '50mb'}));

// app.use(express.bodyParser({limit: '50mb'}));

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.post("/submit", async (req:any, res:any) => {
    let response =  await submit(req) 
    if(response) {
        chartValues.label = response.label;
        chartValues.data = response.data;
    }
    res.redirect("/");
})

app.post("/incluir-grafico", async (req:any, res:any) => {

    //await includeChart(req.body.data)
    res.redirect("/");
})

app.get("/", (req: any,res: any) => {
    res.render("index", {chartValues})
})

app.listen(process.env.PORT)