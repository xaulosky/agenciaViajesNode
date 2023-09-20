import express from 'express'
import router from './routes/index.js'
import db from './config/db.js'



const app = express()

/*  */
db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch(error => console.log(error))

/* puerto */
const port = 3000

/* pug */
app.set('view engine', 'pug')


app.use((req, res, next) => {
    const fecha = new Date()
    res.locals.fechaActual = fecha.getFullYear()
    res.locals.ruta = req.path
    res.locals.nombresito = "Agencia de Viajes"
    return next()
})

/* agregar body parser para enviar datos al body desde un form */
app.use(express.urlencoded({ extended: true }))

/* carpeta publica */
app.use(express.static('public'))

/* agregar rutas */
app.use('/', router)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})