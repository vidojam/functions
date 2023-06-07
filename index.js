// const functions = require("firebase-functions");
import functions from "firebase-functions";
import express from "express";
import cors from "cors";
import {getAllStocks, addStock, deleteStock, updateStock, getOneStock } from "./src/stocks.js"; 

//const PORT = 4000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/hello", (req, res) => {
  res.send("Hello World!")
})
app.get("/stocks", getAllStocks);
app.get("/stocks/search/:firstSymbolValue", getOneStock);
app.post("/stocks", addStock);
app.delete("/stocks/:docId", deleteStock);
app.patch("/stocks/:docId", updateStock);

// app.listen(PORT, () =>  {
//   console.log(`Listening on http://localhost:${PORT}...`);
// });

export const api = functions.https.onRequest(app);



