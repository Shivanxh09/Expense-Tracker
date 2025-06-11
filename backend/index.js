const express = require("express");
const { userRouter } = require("./userRoute"); 
const {  mongoose } = require("mongoose");
require('dotenv').config();
const app = express();
app.use(express.json())

app.use("/api/v1/user",userRouter);

async function main() {
 await mongoose.connect(process.env.MONGO_URL);
  app.listen(3016,()=>{
  console.log("server is listening")
})
}
main()
