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
        
        const release = new Release({
            week: getWeek(),
            nike: nike
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

// Funcion que devuelve los valores
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