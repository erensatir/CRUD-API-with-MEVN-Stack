import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './router/router.js'

const app = express()
app.use(cors())
app.use(express.json())

dotenv.config()

app.use('/posts', router)

//Uygulama ne zaman bu portu dinliyorsa, o süre içerisinde database e bağlan
app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGO_URI, {
        //konsolda çıkıcak hataların önüne geçmek için
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('connected to db'))
    .catch((err) => console.log(err))
})

//package.json daki nodemon un özelliği server ı sürekli ayakta tutarak ve yapılan değişiklikeri her an görebiliyoruz