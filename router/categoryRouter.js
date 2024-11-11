const express =  require('express')
const transactionController = require('../controller/transactionController')
const middleware = require('../middleware/middleware')

const categoryRouter = express.Router()


categoryRouter.get("/category_transaction/:id",middleware,transactionController.categoryTransaction)
categoryRouter.delete("/delete_category/:id",middleware,transactionController.deleteCategory)
categoryRouter.get("/category_expense/:id",middleware,transactionController.getCategoryExpense)

module.exports =  categoryRouter
