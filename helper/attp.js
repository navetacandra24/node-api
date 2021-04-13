<<<<<<< HEAD
const { createCanvas } = require('canvas');
const { CanvasTextWrapper } = require('canvas-text-wrapper');
const fs = require('fs');
const GIFEncoder = require('gifencoder');

const path = `${__dirname}/../src/attp.gif`;

function helper(text) {

    const encoder = new GIFEncoder(512, 512);

    encoder.createReadStream().pipe(fs.createWriteStream(path));

    encoder.start();
    encoder.setRepeat(0);
    encoder.setDelay(120);
    encoder.setQuality(80);

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

    const color = [
        'red',
        'lime',
        'yellow',
        'magenta',
        'cyan'
    ];

    for (let i = 0; i < color.length; i++) {
        ctx.fillStyle = color[i];
        CanvasTextWrapper(canvas, text, options);
        encoder.addFrame(ctx)
    }

    encoder.finish()

}

=======
const fetch = require('node-fetch');

async function helper(text) {
    let _fetch = await fetch('https://api.xteam.xyz/attp?text=' + encodeURIComponent(text),{mode: 'no-cors', timeout:1000 * 3600});
    let _res = await _fetch.json();
    let _base64URI = await _res.result;
    return _base64URI
}

>>>>>>> 89fb1e1 (add translate cache)
module.exports = helper