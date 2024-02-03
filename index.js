const { Telegraf, Context ,Composer} = require('telegraf')
const { message } = require('telegraf/filters')
const func = require('./func')

const bot = new Telegraf('6762812235:AAFgfusj6KSb9DDTaUWQ2epXUbbiMO5ZY0c')

bot.use(func)

bot.start((ctx) => ctx.reply('Welcome'))
bot.help((ctx) => {
    console.log("🦅 ~ ctx:", ctx)
    return ctx.reply('Send me a sticker')
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))