const { JSDOM } = require("jsdom");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate")

const rpcSei = "https://rpc.ankr.com/sei/a59bfb133057362ef2f650803e6cf05d9c96b7890ea77059c085dd3353349715"

const findContract = async (ctx) => {
    try {
        const keyWorkHead = 'const r=JSON.parse('
        const keyWorkTail = `}')`
        const url = ctx.payload
        const data = await fetch(url).then(data => data.text())
        const dom = new JSDOM(data);

        const nodeList = dom.window.document.head.querySelectorAll('script')
        const okla = []
        for (let i = 0; i < nodeList.length; i++) {
            okla.push(fetch(url + nodeList[i].src).then(data => data.text()))
        }
        const allDData = await Promise.all(okla)
        const indexHead = allDData[0].indexOf(keyWorkHead)
        const indexTail = allDData[0].indexOf(keyWorkTail,indexHead)
        const ok = allDData[0].slice(indexHead + keyWorkHead.length + 1 , indexTail +1)
        const ecec = JSON.parse(ok)

        const client = await SigningCosmWasmClient.connect(rpcSei)
        await client.queryContractSmart(ecec['s_'], { contract_info: {} })

        const info =  {
            contract : ecec['s_'],
            okla: ecec['Xx'].map(item=>({
                name: item.name,
                aa: item.allowlist ? item.allowlist.length : 'umlimited',
            })),
        }
        
        return ctx.reply(ecec['s_'])
    } catch (e) {
        console.log("🦅 ~ e:", e)
        return ctx.reply('tim ko thay')
    }
}
// findContract({payload:'https://mint.seidragons.com/'})

module.exports = {
    findContract: {
        key: 'findcontract',
        func: findContract,
        description: 'dadadadadad'
    }
}