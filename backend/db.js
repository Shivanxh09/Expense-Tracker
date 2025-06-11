const mongoose = require("mongoose");


const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  firstname : String,
  lastname : String,
  email : String,
  password : String
})

const expenseSchema = new Schema({
  title: String,
  category: String,
  description: String,
  amount: Number,
  date: Date,
   creatorId: ObjectId
})


const userModel = mongoose.model("User",userSchema);
const expenseModel = mongoose.model("Expense",expenseSchema);

module.exports ={
  userModel,
  expenseModel
}