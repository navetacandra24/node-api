<<<<<<< HEAD
const TinyURL = require('tinyurl');

async function helper(url) {
    let data = []
    await TinyURL.shorten(url)
        .then(v => data.push(v))
    .catch(err => data.push(err))
    return data
}

=======
const TinyURL = require('tinyurl');

async function helper(url) {
    let data = []
    await TinyURL.shorten(url)
        .then(v => data.push(v))
        .catch(err => data.push(err))
    return data
}

>>>>>>> 89fb1e1 (add translate cache)
module.exports = helper