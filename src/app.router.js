import connectDB from "./DB/connection.js"
import userRouter from "./modules/users/user.router.js"
import autRouter from "./modules/auth/auth.router.js"
import categoryRouter from "./modules/categories/categories.router.js"
import productRouter from "./modules/product/product.router.js"
import cartRouter from "./modules/cart/cart.router.js"
import orderRouter from "./modules/orders/order.router.js"
import { globalErrorHandler } from "./utils/errorHandling.js"



const initApp = (app, express) => {
    // because Buffer
    app.use(express.json())


    // Routeing for Application
    app.use("/Api/v1/auth", autRouter)
    app.use("/Api/v1/users", userRouter)
    app.use("/Api/v1/categories", categoryRouter)
    app.use("/Api/v1/products", productRouter)
    app.use("/Api/v1/cart", cartRouter)
    app.use("/Api/v1/order", orderRouter)


    app.get('/', (req, res, next) => {
        res.send('Hello World!')
    })
    // not found Routing
    app.use('*', (req, res, next) => {
        res.send('Error 404 Not Found!')
    })

    // error handling
    app.use(globalErrorHandler)

    // connectDB
    connectDB()
}





export default initApp