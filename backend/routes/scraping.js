// Declaracion de modulos
const router = require('express').Router()
const puppeteer = require('puppeteer')
const Release = require('../models/release')

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

    //console.table(await getOutletNike());
    console.log(await getOutletAdidas());

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
            headless: false,
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
        // var releases = await page.evaluate(() => {

        //     // Declaramos el valor que devolveremos
        //     var value = []
        //     // Declaramos las variables a usar 
        //     var vModelo = []
        //     var vTipo = []
        //     var vPrecio = []
        //     var vPrecioDescuento = []
        //     var vImg = []
        //     var vUrl = []

        //     // rellenamos las varibales 
        //     document.querySelectorAll('.product-card:nth-child(-n+8) .product-card__title').forEach(element => vModelo.push(element.innerHTML))
        //     document.querySelectorAll('.product-card:nth-child(-n+8) .product-card__subtitle').forEach(element => vTipo.push(element.innerHTML))
        //     document.querySelectorAll('.product-card:nth-child(-n+8) .is--striked-out').forEach(element => vPrecio.push(element.innerHTML.replace('&nbsp;','')))
        //     document.querySelectorAll('.product-card:nth-child(-n+8) .is--current-price').forEach(element => vPrecioDescuento.push(element.innerHTML.replace('&nbsp;','')))
        //     document.querySelectorAll('.product-card:nth-child(-n+8) img').forEach(element => vImg.push(element.src))
        //     document.querySelectorAll('.product-card:nth-child(-n+8) a.product-card__link-overlay').forEach(element => vUrl.push(element.href))

        //     // Creamos los objetos
        //     for (let i = 0; i < vModelo.length; i++) {

        //         value.push({
        //             modelo: vModelo[i],
        //             tipo: vTipo[i],
        //             precio: vPrecio[i],
        //             precioDescuento: vPrecioDescuento[i],
        //             img: vImg[i],
        //             url: vUrl[i]
        //         })
        //     }

        //     return value
        // })

        //await browser.close()

    } catch (error) {
        
        console.log(error);

    }

    return true

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

module.exports = router