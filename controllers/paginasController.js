import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => {

    const promiseDB = []

    /* CUANDO SON MULTIMPLES AWAIT ASI SE EJECUTAN TODOS A LA VES */

    promiseDB.push(Viaje.findAll({ limit: 3 }))
    promiseDB.push(Testimonial.findAll({ limit: 3 }))

    try {

        const resultado = await Promise.all(promiseDB)

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        })
    } catch (error) {
        console.log(error)
    }

}
const paginaNosotros = (req, res) => {
    res.render('nosotros', {
        pagina: 'Nosotros'
    })
}
const paginaViajes = async (req, res) => {

    /* consultar db */
    const viajes = await Viaje.findAll()
    res.render('viajes', {
        pagina: 'Viajes',
        viajes
    })
}
const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll()

        res.render('testimoniales', {
            pagina: 'Testimoniales',
            testimoniales
        })
    } catch (error) {
        console.log(error)
    }

}

const paginaDeltalleViaje = async (req, res) => {
    const { slug } = req.params
    try {
        const viaje = await Viaje.findOne({ where: { slug } })
        res.render('viaje', {
            pagina: 'Informacion Viaje',
            viaje
        })
    } catch (error) {
        console.log(error)
    }
}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDeltalleViaje
}