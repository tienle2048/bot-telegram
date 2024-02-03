const funcsContract = require('./contract')
const okla = require('./okla')
const { Composer } = require('telegraf')

const allfFunc = {
    ...funcsContract,
    ...okla
}

const bot = new Composer();
const listCommand = Object.values(allfFunc)

bot.settings(async ctx => {
    const commands = listCommand.map(command =>({
        command: command.key,
        description: command.description
    }))
    await ctx.telegram.setMyCommands(commands);
    return ctx.reply("Ok");
});

for (const command of listCommand) {
    bot.command(command.key, command.func)
}

module.exports = bot