<<<<<<< HEAD
const { createCanvas } = require('canvas');
const { CanvasTextWrapper } = require('canvas-text-wrapper');
const fs = require('fs');

const path = `${__dirname}/../src/ttp.jpg`;

function helper(text) {

    const canvas = createCanvas(512, 512);
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 512, 512);
    
    const options = {
        font: `${canvas.width * (38 / canvas.width)}px Arial`,
        textAlign: 'center',
        verticalAlign: 'middle',
        allowNewLine: true,
        lineBreak: 'auto',
        sizeToFill: true,
        lineHeight: 80,
    };

    ctx.fillStyle = 'black';
    CanvasTextWrapper(canvas, text, options);

    const base64 = canvas.toDataURL('image/jpeg').replace('data:image/jpeg;base64,', '')
    const data = new Buffer.from(base64, 'base64');
    fs.writeFileSync(path, data)

}

=======
const fetch = require('node-fetch');

async function helper(text) {
    let _fetch = await fetch('https://api.xteam.xyz/ttp?text=' + encodeURIComponent(text),
        { mode: 'no-cors', timeout: 1000 * 3600});
    let _res = await _fetch.json();
    let _base64URI = await _res.result;
    return _base64URI
}

>>>>>>> 89fb1e1 (add translate cache)
module.exports = helper