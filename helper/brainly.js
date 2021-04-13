const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const iPhone = puppeteer.devices['iPhone 11 Pro'];


async function render(search) {
    const browser = await puppeteer.launch({
        // defaultViewport: {
        //     width: 375,
        //     height: 812,
        //     isMobile: true,
        //     isLandscape: false
        // },
        ignoreHTTPSErrors: true,
        args: [
            '--incognito',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disk-cache-size=0'
        ],
        headless: true,
        product: 'chrome'
    });
    const page = await browser.newPage()
    await page.emulate(iPhone)
    await page.goto(`https://brainly.co.id/app/ask?q=${search}`, {
        waitUntil: ['domcontentloaded', 'load', 'networkidle2']
    });

    let html = await page.evaluate(() => {
        return document.querySelector('html').innerHTML
    })

    await browser.close()

    return html
}

async function helper(sq) {
    let htmlString = [];
    const browser = await puppeteer.launch({
        ignoreHTTPSErrors: true,
        args: [
            '--incognito',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- this one doesn't works in Windows
            '--disable-gpu',
            '--aggressive-cache-discard',
            '--disable-cache',
            '--disable-application-cache',
            '--disk-cache-size=0'
        ],
        headless: true,
        product: 'chrome'
    });
    const page = await browser.newPage()
    await page.emulate(iPhone);
    let html = await render(sq);
    let $ = cheerio.load(html);
    let link=[]
    $('div[data-testid="search-item-facade-wrapper"] > a').each((i, e) => {
        return link.push($(e).attr('href'))
    })
    for (let i = 0; i < await link.length;) {
        let target = await link[i];
        let htmls;
        // console.log(`begin for ${target}`)
        await page.goto(`https://brainly.co.id${target}`, { waitUntil: 'load' })
            .then(() => {
                return new Promise(res => {
                    //wait content dynamic load
                    // setTimeout(() => {
                        htmls = page.evaluate(() => {
                            return new Promise(resolve => { // <-- return the data to node.js from browser
                                let q = document.querySelector('html').innerHTML
                                resolve(q);
                            });
                        });
                        res(htmls);
                    // }, 5000);

                })
            })
            .then(async (res) => {
                i++;
                htmlString.push(await htmls)
                // console.log(htmlString);
            });
        
    }
    await browser.close()
    let data = []
    htmlString.forEach(web => {
        const _ = cheerio.load(web);
        let q = _('[data-test="question-box-text"] > span').text().replace('\n', '').slice(0, -2);
        let a = [];
        _('[data-test="answer-box-text"]').each((i, el) => {
            return a.push(_(el).text()/*.replace('\n', '').slice(0, -2)*/)
        })
        // console.log(a);
        data.push({pertanyaan: q, jawaban:a})
    })
    return data
}

module.exports = helper
// helper()