const okla = async (ctx) => {
    return ctx.reply('Send me a sticker')
}

module.exports = {
    okla : {
        key: 'okla',
        func: okla,
        description: 'okla'
    }
}