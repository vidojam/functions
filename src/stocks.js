import { db } from "./connectdb.js";
import { ObjectId } from "mongodb";

const coll = db.collection("Stocks");

// CRUD GET
export async function getAllStocks(req, res) {
  const stocks = await coll.find({}).toArray();
  res.status(200).send(stocks);
}

export async function getOneStock(req, res) {
  const { firstNameValue } = req.params;
  const oneStock = await coll.find({ firstName: firstNameValue }).toArray();
  res.status(200).send(oneStock);
}

// CRUD POST
export async function addStock(req, res) {
  const newStock = req.body;
  await coll.insertOne(newStock);
  res.status(201).send({ message: "New stock added to stocks" });
}


// CRUD DELETE
export async function deleteStock(req, res) {
  const docId = new ObjectId(req.params.docId);
  await coll.deleteOne({ _id: docId });
  res.status(201).send({ message: "Stock has been deleted" });
}


export async function updateStock(req, res) {
  const docId = new ObjectId(req.params.docId);
  const update = { $set: req.body };
  const returnOption = { returnNewDocument: true };

  const query = await coll.findOneAndUpdate({ _id: docId }, update, returnOption);

  res.status(201).send({ message: "Stock has been updated" });
  console.table(query.value);
}
