
const { Router } = require("express");
const {userModel,expenseModel} = require("./db")
const userRouter =  Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


const {auth} = require ("./middlewareAuth");
userRouter.post("/signup", async function (req,res) {
   require('dotenv').config();
const {firstname, lastname,email,password } = req.body;
 const hasedPassword = await bcrypt.hash(password, 10);
 await userModel.create({
firstname: firstname,
lastname: lastname,
email: email,
password: hasedPassword
 })
  res.json({
    message: " signup succed"
  })
  
})

userRouter.post("/signin",async function (req,res) {
  const {email,password} = req.body;

  const user = await userModel.findOne({
    email: email
    
  });
  const passwordMatched = await bcrypt.compare(password,user.password);
  if(user && passwordMatched){
    const token = jwt.sign({ id: user._id},process.env.JWT_USER_PASSWORD);
    res.json({
     token : token
    })
  }
  else {
    res.status(403).json({
      message: "invalid crediantials"
    })
  }
})
userRouter.post("/expense", auth , async function (req,res) {
   const { title,category, description, amount, date } = req.body;
   const creatorId = req.userId;
 try {const expense = await expenseModel.create({
      title,
      category,
      description,
      amount,
      date,
      creatorId
 }); 
 res.json({
  message: "Expense added successfully", expense
 });
  
 } catch (err) {
  res.status(500).json({ message: "Error adding expense", error: err.message });
 }

})

userRouter.put("/expense", auth, async function (req,res) {
  
   const creatorId = req.userId;
  const { expenseId, title, category, description, amount, date } = req.body;

 try {const expense = await expenseModel.findOneAndUpdate(
  { _id: expenseId, creatorId: creatorId },
      { title, category, description, amount, date },
      { new: true });
 if(!expense){
   return res.status(404).json({ message: "Expense not found or not authorized" });
 }
   res.json({
      message: "Expense updated successfully",
      expense: expense
    });}
    catch (err) {
    res.status(500).json({ message: "Error updating expense", error: err.message });
  }
});


userRouter.get("/expenses", auth, async function (req,res) {
  const creatorId = req.userId;
  try {
    const expenses = await expenseModel.find({creatorId});
    res.json({
      message: "All your expenses",
      expenses: expenses
    })
  } catch (err) {
    res.status(402).json({
      message:"failed to fetch expenses", error: err.message
    });
    
  }
  
});
module.exports ={
  userRouter
}

 