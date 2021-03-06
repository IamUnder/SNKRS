// Declaracion de modulos
const router = require('express').Router()
const puppeteer = require('puppeteer')
const authRoutes = require('./validate-token')
const Release = require('../models/release')
const Oferta = require('../models/oferta')

// Ruta para recojer los lanzamientos semanales
router.get('/release', async (req, res) => {

    // Si esa semana ya se ha ejecutado la devuelve
    const isWeekExist = await Release.findOne({week: getWeek()})
    if (isWeekExist) {
        return res.json({
            error: null,
            release: isWeekExist
        })
    }

    // Si no existe la genera
    try {

        const nike = await getNike()
        const adidas = await getAdidas()
        const release = new Release({
            week: getWeek(),
            nike: nike,
            adidas: adidas
        })
    
    
        const savedRelease = await release.save()
        
        return res.json({
            error: null,
            release: savedRelease
        })

    } catch (error) {
        
        return res.status(400).json({
            error: error,
            msg: 'Error durante la operacion'
        })

    }
    

})

// Ruta para obtener las ofertas semanales
router.get('/outlet', async (req, res) => {

    // Comprobamos si ya hay datos de la semana
    const isWeekExist = await Oferta.findOne({week: getWeek()})
    if (!isWeekExist) { // Si no existe lo generamos

        // Generacion Nike
        const nike = await getOutletNike()
        nike.forEach(element => {

            try {
                
                // Generamos el valor y lo introducimos en db
                new Oferta({
                    week: getWeek(),
                    marca: 'nike',
                    modelo: element.modelo,
                    tipo: element.tipo,
                    precio: element.precio,
                    precioDescuento: element.precioDescuento,
                    img: element.img,
                    url: element.url
                }).save()

            } catch (error) {
                console.log(error);
            }

        });

        // Generacion Adidas
        const adidas = await getOutletAdidas()
        adidas.forEach(element => {

            try {
                
                // Generamos el valor y lo introducimos en db
                new Oferta({
                    week: getWeek(),
                    marca: 'adidas',
                    modelo: element.modelo,
                    tipo: element.tipo,
                    precio: element.precio,
                    precioDescuento: element.precioDescuento,
                    img: element.img,
                    url: element.url
                }).save()

            } catch (error) {
                console.log(error);
            }

        });

    }
    
    // Recojemos lo valores antes de mostrarlos
    const ofertaNike = await Oferta.find({week: getWeek(), marca: 'nike'})
    const ofertaAdidas = await Oferta.find({week: getWeek(), marca: 'adidas'})

    return res.json({
        error: null,
        nike: ofertaNike,
        adidas: ofertaAdidas
    })
})

// Ruta para dar like a una oferta
router.post('/like', authRoutes, async (req, res) => {

    // Recuperamos la oferta a la que quiere incluirse
    const oferta = await Oferta.findById(req.body.id)
    var like = oferta.like
    var dislike = oferta.dislike

    // Comprobamos que no este el like dado ya, en ese caso lo quitamos
    if (like.includes(req.user.id)) {
        like = removeItem(like, req.user.id)
    } else { // Si no tiene el like dado se lo ponemos
        like.push(req.user.id)
    }

    // Comprobamos si le habia dado dislike a la oferta, si es asi lo quitamos
    if (dislike.includes(req.user.id)) {
        dislike = removeItem(dislike, req.user.id)
    }

    // Guardamos el nuevo valor
    await Oferta.findByIdAndUpdate(req.body.id,{like: like, dislike: dislike})


    return res.json({
        error: null
    })
})

// Ruta para dar dislike a una oferta
router.post('/dislike', authRoutes, async (req, res) => {

    // Recuperamos la oferta a la que quiere incluirse
    const oferta = await Oferta.findById(req.body.id)
    var like = oferta.like
    var dislike = oferta.dislike

    // Comprobamos que no este el dislike dado ya, en ese caso lo quitamos
    if (dislike.includes(req.user.id)) {
        dislike = removeItem(dislike, req.user.id)
    } else { // Si no tiene el dislike dado se lo ponemos
        dislike.push(req.user.id)
    }

    // Comprobamos si le habia dado like a la oferta, si es asi lo quitamos
    if (like.includes(req.user.id)) {
        like = removeItem(like, req.user.id)
    }

    // Guardamos el nuevo valor
    await Oferta.findByIdAndUpdate(req.body.id,{like: like, dislike: dislike})


    return res.json({
        error: null
    })
})

// Funcion para hacer auto scroll
async function autoScroll(page){
    await page.evaluate(async () => {
        await new Promise((resolve, reject) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

// Funcion que devuelve los lanzamientos de nike
async function getNike() {

    const url = process.env.RELEASENIKE 

    try {
        
        // Abrimos una instacia del navegador y navegamos hasta la url
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        })
        const page = await browser.newPage()
        await page.goto(url)
        await autoScroll(page);

        // Javascript que se ejecuta en el navegador que crea puppeteer
        var releases = await page.evaluate(() => {

            // Declaramos el valor que devolveremos
            var value = []
            // Declaramos las variables a usar 
            var vModelo = []
            var vNombre = []
            var vMes = []
            var vDia = []
            var vImg = []
            var vUrl = []

            // rellenamos las varibales 
            document.querySelectorAll('.product-card .ncss-row .ncss-col-sm-12 h3').forEach(element => vModelo.push(element.innerHTML))
            document.querySelectorAll('.product-card .headline-3').forEach(element => vNombre.push(element.innerHTML))
            document.querySelectorAll('.product-card .launch-caption .headline-4').forEach(element => vMes.push(element.innerHTML))
            document.querySelectorAll('.product-card .launch-caption .headline-1').forEach(element => vDia.push(element.innerHTML))
            document.querySelectorAll('.product-card .card-link img').forEach(element => vImg.push(element.src)) //src
            document.querySelectorAll('.product-card .card-link').forEach(element => vUrl.push(element.href)) //href
            
            // Creamos los objetos
            for (let i = 0; i < vModelo.length; i++) {
                
                do {
                    vModelo[i] = vModelo[i].replace('&nbsp;',' ')
                } while (vModelo[i].indexOf('&nbsp;') != -1);
                
                do {
                    vNombre[i] = vNombre[i].replace('&nbsp;',' ')
                } while (vNombre.indexOf('&nbsp;') != -1);

                value.push({
                    modelo: vModelo[i],
                    nombre: vNombre[i],
                    fecha: vDia[i] + ' ' +  vMes[i],
                    img: vImg[i],
                    url: vUrl[i]
                })
            }

            return value
        })

        await browser.close()

    } catch (error) {
        
        console.log(error);

    }

    return releases

}

//Funcion que devuelve las ofertas de nike
async function getOutletNike() {

    const url = process.env.OUTLETNIKE 

    try {
        
        // Abrimos una instacia del navegador y navegamos hasta la url
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        })
        const page = await browser.newPage()
        await page.goto(url)
        await page.setViewport({
            width: 3840,
            height: 2160
        });
        await autoScroll(page);

        // Javascript que se ejecuta en el navegador que crea puppeteer
        var releases = await page.evaluate(() => {

            // Declaramos el valor que devolveremos
            var value = []
            // Declaramos las variables a usar 
            var vModelo = []
            var vTipo = []
            var vPrecio = []
            var vPrecioDescuento = []
            var vImg = []
            var vUrl = []

            // rellenamos las varibales 
            document.querySelectorAll('.product-card:nth-child(-n+8) .product-card__title').forEach(element => vModelo.push(element.innerHTML))
            document.querySelectorAll('.product-card:nth-child(-n+8) .product-card__subtitle').forEach(element => vTipo.push(element.innerHTML))
            document.querySelectorAll('.product-card:nth-child(-n+8) .is--striked-out').forEach(element => vPrecio.push(element.innerHTML.replace('&nbsp;','')))
            document.querySelectorAll('.product-card:nth-child(-n+8) .is--current-price').forEach(element => vPrecioDescuento.push(element.innerHTML.replace('&nbsp;','')))
            document.querySelectorAll('.product-card:nth-child(-n+8) img').forEach(element => vImg.push(element.src))
            document.querySelectorAll('.product-card:nth-child(-n+8) a.product-card__link-overlay').forEach(element => vUrl.push(element.href))

            // Creamos los objetos
            for (let i = 0; i < vModelo.length; i++) {

                value.push({
                    modelo: vModelo[i],
                    tipo: vTipo[i],
                    precio: vPrecio[i],
                    precioDescuento: vPrecioDescuento[i],
                    img: vImg[i],
                    url: vUrl[i]
                })
            }

            return value
        })

        await browser.close()

    } catch (error) {
        
        console.log(error);

    }

    return releases

}

// Funcion que devuelve los lanzamientos de adidas
async function getAdidas() {

    const url = process.env.RELEASEADIDAS

    try {
        
        // Abrimos una instacia del navegador y navegamos hasta la url
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        })
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
        await page.goto(url)
        await page.setViewport({
            width: 2560,
            height: 1440
        });
        await autoScroll(page)

        // Javascript que se ejecuta en el navegador que crea puppeteer
        var releases = await page.evaluate(() => {

            window.scrollBy(0, window.innerHeight)

            // Declaramos el valor que devolveremos
            var value = []
            // Declaramos las variables a usar 
            var vModelo = []
            var vFecha = []
            var vImg = []
            var vUrl = []

            // rellenamos las varibales 
            document.querySelectorAll('.plc-product-card___1tVAm .glass-product-card .plc-product-name___2cofu').forEach(element => vModelo.push(element.innerHTML))
            document.querySelectorAll('.plc-product-card___1tVAm .glass-product-card .plc-product-date___1zgO_ strong').forEach(element => vFecha.push(element.innerHTML))
            document.querySelectorAll('.plc-product-card___1tVAm .glass-product-card img').forEach(element => vImg.push(element.src))
            document.querySelectorAll('.plc-product-card___1tVAm a').forEach(element => vUrl.push(element.href))

            // Calculamos los productos que estan agotados
            var quitar = vModelo.length - vFecha.length // Calculamos los que hay que quitar

            // Quitamos esos valores
            for (let i = 0; i < quitar; i++) {
                vModelo.shift() 
                vImg.shift()
                vUrl.shift()
            }

            // Creamos los objetos
            for (let i = 0; i < vModelo.length; i++) {
                
                value.push({
                    modelo: vModelo[i],
                    fecha: vFecha[i],
                    img: vImg[i],
                    url: vUrl[i]
                })
            }

            return value
        })

        await browser.close()

    } catch (error) {
        
        console.log(error);

    }

    return releases

}

// Funcion que devuelve las ofertas de adidas
async function getOutletAdidas() {

    const url = process.env.OUTLETADIDAS

    try {
        
        // Abrimos una instacia del navegador y navegamos hasta la url
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox','--disable-setuid-sandbox']
        })
        const page = await browser.newPage()
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36');
        await page.goto(url)
        await page.setViewport({
            width: 3840,
            height: 2160
        });
        await autoScroll(page);

        // Javascript que se ejecuta en el navegador que crea puppeteer
        var releases = await page.evaluate(() => {

            // Declaramos el valor que devolveremos
            var value = []
            // Declaramos las variables a usar 
            var vModelo = []
            var vTipo = []
            var vPrecio = []
            var vPrecioDescuento = []
            var vImg = []
            var vUrl = []

            // rellenamos las varibales 
            document.querySelectorAll('.grid-item:nth-child(-n+8) .glass-product-card__title').forEach(element => vModelo.push(element.innerHTML))
            document.querySelectorAll('.grid-item:nth-child(-n+8) .glass-product-card__category').forEach(element => vTipo.push(element.innerHTML))
            document.querySelectorAll('.grid-item:nth-child(-n+8) .gl-price-item--crossed').forEach(element => vPrecio.push(element.innerHTML.replace('??? ','')+'???'))
            document.querySelectorAll('.grid-item:nth-child(-n+8) .gl-price-item--sale').forEach(element => vPrecioDescuento.push(element.innerHTML.replace('??? ','')+'???'))
            document.querySelectorAll('.grid-item:nth-child(-n+8) img.glass-product-card__image').forEach(element => vImg.push(element.src))
            document.querySelectorAll('.grid-item:nth-child(-n+8) a.glass-product-card__assets-link').forEach(element => vUrl.push(element.href))

            // Creamos los objetos
            for (let i = 0; i < vModelo.length; i++) {

                value.push({
                    modelo: vModelo[i],
                    tipo: vTipo[i],
                    precio: vPrecio[i],
                    precioDescuento: vPrecioDescuento[i],
                    img: vImg[i],
                    url: vUrl[i]
                })
            }

            return value
        })

        await browser.close()

    } catch (error) {
        
        console.log(error);

    }

    return releases

}

// Funcion para conocer la semana
getWeek = () => {

    currentdate = new Date()
    var oneJan = new Date(currentdate.getFullYear(),0,1)
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000))
    var result = Math.ceil(( currentdate.getDay() + 1 + numberOfDays) / 7)

    if (currentdate.getDay() > 0 && currentdate.getDay() < 3) {
        result++
    }

    return result

}

// Funcion para elimiar el valor de un array
function removeItem (array, value) {
    
    var i = array.indexOf( value );
 
    if ( i !== -1 ) {
        array.splice( i, 1 );
    }

    return array
}

module.exports = router