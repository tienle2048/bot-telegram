const { JSDOM } = require("jsdom");
const { SigningCosmWasmClient } = require("@cosmjs/cosmwasm-stargate")

const rpcSei = "https://rpc.ankr.com/sei/a59bfb133057362ef2f650803e6cf05d9c96b7890ea77059c085dd3353349715"

const findContract = async (ctx) => {
    try {
        const keyWork = '"L5":"pacific-1"'
        const url = ctx.payload
        const data = await fetch(url).then(data => data.text())
        const dom = new JSDOM(data);

        const nodeList = dom.window.document.head.querySelectorAll('script')
        const okla = []
        for (let i = 0; i < nodeList.length; i++) {
            okla.push(fetch(url + nodeList[i].src).then(data => data.text()))
        }
        const allDData = await Promise.all(okla)
        const index = allDData[0].indexOf(keyWork) + keyWork.length
        const [_, contractAddress] = allDData[0].slice(index, index + 69).replaceAll('"', '').split(":")

        // check CW721
        const client = await SigningCosmWasmClient.connect(rpcSei)
        await client.queryContractSmart(contractAddress, { contract_info: {} })
        
        return ctx.reply(contractAddress)
    } catch (e) {
        return ctx.reply('tim ko thay')
    }
}

module.exports = {
    findContract: {
        key: 'findcontract',
        func: findContract,
        description: 'dadadadadad'
    }
}