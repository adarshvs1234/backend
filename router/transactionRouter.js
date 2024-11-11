const express = require('express')
const transactionController = require('../controller/transactionController')
const middleware = require('../middleware/middleware')

const transactionRouter = express.Router()

transactionRouter.post("/transaction",middleware,transactionController.addTransaction)
transactionRouter.get("/summary",middleware,transactionController.summary)
//transactionRouter.get("/category_expense/:category",middleware,transactionController.getCategoryExpense)
transactionRouter.put("/:id",middleware,transactionController.updateTransaction)
transactionRouter.get("/get",middleware,transactionController.getTransaction)
transactionRouter.delete("/delete/:id",middleware,transactionController.deleteTransaction)



module.exports = transactionRouter  

