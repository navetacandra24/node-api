<<<<<<< HEAD
const express = require('express');
const webp = require('webp-converter');
const fs = require('fs')
const attp = require('./helper/attp');
const ttp = require('./helper/ttp');
const ssweb = require('./helper/ssweb');
const gtranslate = require('./helper/gtranslate');
const jadwalsholat = require('./helper/jadwalsholat');
const brainly = require('./helper/brainly');
const tinyurl = require('./helper/tinyurl');

const app = express();
let port = process.env.PORT || 443

app.get('/attp', async function (req, res) {
    const text = decodeURIComponent(req.query['text']);
    await attp(text);
    const webpg = webp.gwebp('./src/attp.gif', './src/attp.webp', '-q 80', logging = '-v')
    webpg.then(async () => {
        await res.json({
            status: "success",
            result: {
                url: 'data:image/webp;base64,' + fs.readFileSync('./src/attp.webp', 'base64'),
                data: {
                    mimetype: 'image/webp',
                    data: fs.readFileSync('./src/attp.webp', 'base64')
                }
            }
        })
        fs.unlinkSync('./src/attp.gif')
        fs.unlinkSync('./src/attp.webp')
    }).catch(err => {
        res.json({
            status: "error",
            message: err
        })
    })
});

app.get('/ttp', async function (req, res) {
    const text = decodeURIComponent(req.query['text']);
    await ttp(text);
    const webpg = webp.cwebp('./src/ttp.jpg', './src/ttp.webp', '-q 80', logging = '-v')
    webpg.then(async () => {
        await res.json({
            status: "success",
            result: {
                url: 'data:image/webp;base64,' + fs.readFileSync('./src/ttp.webp', 'base64'),
                data: {
                    mimetype: 'image/webp',
                    data: fs.readFileSync('./src/ttp.webp', 'base64')
                }
            }
        })
        fs.unlinkSync('./src/ttp.jpg')
        fs.unlinkSync('./src/ttp.webp')
    }).catch(err => {
        res.json({
            status: "error",
            message: err
        })
    })
});

app.get('/ssweb', async function (req, res) {
    const url = decodeURIComponent(req.query['url']);
    if (url !== "undefined") {
        await ssweb(url)
        res.sendFile(`${__dirname}/src/ss.jpg`)
    } else {
        res.json({
            status: "error",
            message: 'Parameter url not defined',
            hint: '/ssweb?url=https://example.com'
        })
    }
});

app.get('/translate/google', async function (req, res) {
    const from = decodeURIComponent(req.query['lang_from']);
    const to = decodeURIComponent(req.query['lang_target']);
    const text = decodeURIComponent(req.query['text']);
    let result = await gtranslate(from, to, text)
    res.json({
        status: "success",
        result: {
            before_translated: text,
            translated: result
        }
    })
})


app.get('/jadwalsholat', async function (req, res) {
    const city = decodeURIComponent(req.query['kota']);
    // const result = await jadwalsholat(city)
    if (city !== "undefined" && await jadwalsholat(city) !== undefined) {
        res.json({
            status: "success",
            result: await jadwalsholat(city)
        })
    } else {
        res.json({
            status: "error",
            message: "Mohon isi parameter kota!"
        })
    }
})

app.get('/brainly', async function (req, res) {
    const search = decodeURIComponent(req.query['search']);
    const result = await brainly(search)
    if (search !== "undefined") {
        if (result.length > 0) {
            res.json({
                status: "success",
                result: result
            })
        } else {
            res.json({
                status: "error",
                message: "Pencarian tidak dapat ditemukan"
            })
        }
    } else {
        res.json({
            status: "error",
            message: "Mohon isi pencarian!"
        })
    }
})


app.get('/tinyurl', async function (req, res) {
    const url = decodeURIComponent(req.query['url']);
    const result = await tinyurl(url)
    if (url !== "undefined") {
        res.json({
            status: "success",
            result: result.join('')
        })
    } else {
        res.json({
            status: "error",
            message: "Mohon isi parameter!",
            hint: "?url=https://google.com&alias=google"
        })
    }
})


app.listen(port, async () => {
    console.log(`Running on ${port}`);
=======
const express = require('express');
const fs = require('fs');
const main = require('./rest/_main')



// const brainly = require('./helper/brainly');
// const savefrom = require('./helper/savefrom');

const app = express();
let port = process.env.PORT || 443

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET')
    next()
})

main(app)

app.get('/translate', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(`${__dirname}/translate.cache.json`)))
})


// app.get('/brainly', async function (req, res) {
//     const search = decodeURIComponent(req.query['search']);
//     const result = await brainly(search)
//     if (search !== "undefined") {
//         if (result.length > 0) {
//             res.json({
//                 status: "success",
//                 result: result
//             })
//         } else {
//             // res.json({
//             //     status: "error",
//             //     message: "Pencarian tidak dapat ditemukan"
//             // })
//             res.sendFile(`${__dirname}/src/b1.jpg`)
//         }
//     } else {
//         res.json({
//             status: "error",
//             message: "Mohon isi pencarian!"
//         })
//     }
// })


// app.get('/savefrom', async function (req, res) {
//     const url = decodeURIComponent(req.query['url']);
//     if (url !== "undefined") {
//         const result = await savefrom(url)
//         res.json({
//             status: "success",
//             result: result
//         })
//     } else {
//         res.json({
//             status: "error",
//             message: "Mohon isi parameter!",
//             hint: "/savefrom"
//         })
//     }
// })

app.listen(port, async () => {
    console.log(`Running on ${port}`);
>>>>>>> 89fb1e1 (add translate cache)
})