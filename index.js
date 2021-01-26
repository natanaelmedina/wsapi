

const { WAConnection, MessageType, WAMessageProto } = require('@adiwajshing/baileys')

const fs = require('fs')
const util = require('util')
const path = require('path')
const { EventEmitter } = require('events')
const Net = require('net')
//.connect({ port: parseInt(process.env.PORT || 50000) }, function () { })
const configStr = fs.readFileSync(path.join(__dirname, process.env.config || './config.json')).toString('ascii')
const config = JSON.parse(configStr)




const emit = (data) => {
    const msg = typeof data == "object" ? JSON.stringify(data, null,) : data
    client.write(`data:${Buffer.from(msg).toString('base64')}\n\n`)
}

const log = console.log
console.log = (...arg) => {
    log(arg)
    emit({
        type: "console",
        data: arg.map(e => typeof e == "object" ? JSON.stringify(e) : e).join(',')
    })
}
console.info = console.log


const error = console.error
console.error = (...arg) => {
    error(arg)
    emit({
        type: "error",
        data: arg.map(e => typeof e == "object" ? JSON.stringify(e) : e).join(',')
    })
}
console.warn = console.error

const ON_MESSAGE = async (m = WAMessageProto.WebMessageInfo, conn = new WAConnection()) => {
    const messageType = Object.keys(m.message)[0]// get what type of message it is -- text, image, video
    emit({
        type: "message",
        data: {
            id: m.key.id,
            remoteJid: m.key.remoteJid,
            messageType,
            data: String(Object.values(m.message)[0])
        }
    })
    if (messageType !== MessageType.text && messageType !== MessageType.extendedText) {
        const buffer = await conn.downloadMediaMessage(m) // to decrypt & use as a buffer
    } else {

    }
}

async function connectToWhatsApp() {
    try {
        const authDir = path.join(__dirname, './auth_info.json')
        const conn = new WAConnection()
        conn.regenerateQRIntervalMs = 60000 * 3
        conn.connectOptions.maxRetries = 5000
        conn.connectOptions.connectCooldownMs = 10000
        conn.logger = console




        //EVENTS
        client.on('data', async buffer => {
            const data = buffer.toString('ascii').split('\n\n')
            for (const message of data) {
                const m = Buffer.from(message.substr(5), 'base64').toString('ascii')
                const info = JSON.parse(m || '{}')
                if (info.type) {
                    switch (info.type) {
                        case 'reset': process.exit(0);
                        case 'logOut': {
                            fs.unlinkSync(authDir)
                            await conn.logout()
                            process.exit(0)
                        }
                        default:
                            break;
                    }
                }
            }
        })
        conn.on('connection-phone-change', r => !r.connected && emit({ type: "disconnet", data: r }))
        conn.on('ws-close', close => emit({ type: "disconnet", data: close.reason }))
        conn.on('close', close => emit({ type: "disconnet", data: close.reason }))
        conn.on('connecting', r => emit({ type: "connecting", data: null }))

        conn.on('qr', qrCode => emit({ type: "qr", data: { qrCode } }))
        conn.on('chat-update', async chat => {
            try {
                if (!chat.messages)
                    return
                const messages = chat.messages.all()
                for (const m of messages) {
                    ON_MESSAGE(m, conn)
                }
                conn.chatRead(messages[0].key.remoteJid)

            } catch (error) {
                console.error(error.message)
            }

        })
        conn.on('open', result => {
            emit({
                type: "connected",
                data: result.user
            })
        })
        const auth = await util.promisify(fs.exists)(authDir)
        if (auth)
            conn.loadAuthInfo(authDir)

        await conn.connect()
        if (!auth) {
            try {
                console.log('guardando credenciales')
                const credential = conn.base64EncodedAuthInfo()
                const fileDir = path.join(__dirname, './auth_info.json')
                console.log(fileDir)
                fs.writeFileSync(fileDir, JSON.stringify(credential, null, '\t'))
            } catch (error) {
                console.error('error credenciales', error.message)
            }
        }

    } catch (error) {
        console.error(error.message)
    }
}


connectToWhatsApp().catch(err => console.error("unexpected error: " + err))
client.on("close", () => process.exit())
process.on("exit", () => client.end())





/*
  setInterval(async () => {
            try {
                const id = '18297163239@s.whatsapp.net' // the WhatsApp ID
                const sending = await conn.sendMessage(id, 'Probando1', MessageType.text)
                console.log(sending)
            } catch (error) {
                console.log(error)
            }
        }, 1000);


const id = '18297163239@s.whatsapp.net' // the WhatsApp ID
        const sending = await conn.sendMessage(id, 'Probando1', MessageType.text)
        console.log(sending) */

/*     const id = '18297163239@s.whatsapp.net' // the WhatsApp ID
    // send a simple text!
    conn.sendMessage(id, 'Probando1', MessageType.text)
    // send a location!
    conn.sendMessage(id, { degreeslatitude: 18.121231, degreesLongitude: 19.1121221 }, MessageType.location)
    const vcard = 'BEGIN:VCARD\n' // metadata of the contact card
        + 'VERSION:3.0\n'
        + 'FN:Jeff Singh\n' // full name
        + 'ORG:Ashoka Uni;\n' // the organization of the contact
        + 'TEL;type=CELL;type=VOICE;waid=911234567890:+91 12345 67890\n' // WhatsApp ID + phone number
        + 'END:VCARD' +
        'BEGIN:VCARD\n' // metadata of the contact card
        + 'VERSION:3.0\n'
        + 'FN:Natanael Medina\n' // full name
        + 'ORG:Ashoka Uni;\n' // the organization of the contact
        + 'TEL;type=CELL;type=VOICE;waid=18297163239:+1 829 716 3239\n' // WhatsApp ID + phone number
        + 'END:VCARD'
    conn.sendMessage(id, { displayname: "Jeff", vcard: vcard }, MessageType.contact) */
