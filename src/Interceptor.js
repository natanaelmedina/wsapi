const { WAConnection, MessageType, WAMessageProto, Presence } = require('@adiwajshing/baileys')

const fs = require('fs')
const util = require('util')
const path = require('path')
const { EventEmitter } = require('events')
const Net = require('net')
const request = require('node-fetch')
const domain = require('domain')
const uuid = require('uuid')
const mime = require('mime-types')
const _ = require('lodash')


const https = require('https');
const agent = new https.Agent({
    rejectUnauthorized: false
});

//server
const express = require('express');
const app = express();
const bodyParser = require('body-parser')


app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const configDir = path.join(__dirname, process.env.config || '../config.json')
const configStr = fs.existsSync(configDir) ? fs.readFileSync(configDir).toString('ascii') : {}
const authDir = path.join(__dirname, './auth_info.json')


const connect = Symbol()
const socketEv = Symbol()
const socket = Symbol()
const ws = Symbol()
const wsOpen = Symbol()
const chatUpdate = Symbol()
const whatsApp = Symbol()
const signal = Symbol()
const sendSuccess = Symbol()
const postToDb = Symbol()
const queue = Symbol()

const queueNotify = []

class Interceptor extends EventEmitter {

    constructor() {
        super();
        this.state = {
            intent: 0,
            port:  parseInt(process.env.PORT || 50000),
            config: {
                webhook: {
                    pushMessage: "HTTP://LOCALHOST:3000/api/createMessage",
                    getMessage: "HTTP://LOCALHOST:3000/api/message",
                    wsRest: "HTTPS://10.0.10.80:8000",
                    port: 8000,
                    serverSocket: "HTTP://LOCALHOST:9696"
                },
                company: {
                    compName: "IKompras Srl",
                    compId: 62,
                    sucId: 1,
                    botWsNumber: null
                },
                ...JSON.parse(configStr)
            }
        };
        this[whatsApp].regenerateQRIntervalMs = 60000 * 3
        this[whatsApp].connectOptions.maxRetries = 5000
        this[whatsApp].connectOptions.connectCooldownMs = 10000
        this[whatsApp].logger = console
        this[whatsApp].on('connection-phone-change', r => !r.connected && this.notify({ type: "disconnet", data: r }))
        this[whatsApp].on('ws-close', close => this.notify({ type: "disconnet", data: close.reason }))
        this[whatsApp].on('close', close => this.notify({ type: "disconnet", data: close.reason }))
        this[whatsApp].on('connecting', r => this.notify({ type: "connecting", data: null }))
        this[whatsApp].on('qr', qrCode => this.notify({ type: "qr", data: { qrCode } }))
        this[whatsApp].on('open', this[wsOpen])
        this[whatsApp].on('chat-update', this[chatUpdate])
        this[connect]().then(e => {
            this[socket].on('data', this[socketEv])
            this[ws]()
            app.post('/signal', this[signal].bind(this))
            app.listen(this.state.config.webhook.port, () => console.info('server up port:', this.state.config.webhook.port))
            this[socket].on("close", () => process.exit())
            process.on("exit", () => this[socket].end())

        }).catch(err => {
            process.exit(0)
        })


    }
    [whatsApp] = new WAConnection();
    [sendSuccess] = [];
    [queue] = [];
   
    async [connect]() {
        try {
            this[whatsApp].setMaxListeners(0)
            this.setMaxListeners(0)
            await new Promise((s, e) => {
                const d = domain.create();
                d.on('error', (error) => {
                    e(error)
                    d.removeAllListeners('error')
                });
                d.run(() => {
                    this[socket] = Net.connect({
                        port: this.state.port,
                        timeout: 50000
                    })
                    this[socket].on('connect', s);
                })
            })

        } catch (error) {
            this.state.intent = this.state.intent + 1
            console.error(error.message)
            if (this.state.intent < 5)
                return this[connect]()
            throw new Error(error.message)
        }
    }
    async notify(notify) {
        queueNotify.push(notify)
        if (this.queueNotifyRun) {
            return
        }
        this.queueNotifyRun = true
        while (queueNotify.length) {
            const data = queueNotify.shift()
            const msg = typeof data == "object" ? JSON.stringify(data, null) : data

            try {
                console.log('sending',msg)
                this[socket].write(`>${msg}<`,()=>{})
        /*         await new Promise((s, reject) => {
                    setTimeout(() => {
                        reject(new Error('Request timed out'));
                    }, 300000);
                    this.once("dataEnd", s)
                }) */
            } catch (error) {
                queueNotify.unshift(data)
            }
        }
        this.queueNotifyRun = false
        return
    }
    [socketEv] = async (buffer = Buffer) => {
        const data = buffer.toString('ascii').split('\n\n')
        for (const message of data) {
            const m = Buffer.from(message.substr(5), 'base64').toString('ascii')
            const info = JSON.parse(m || '{}')
            if (info.type) {
                switch (info.type) {
                    case 'reset': process.exit(0);
                    case 'dataEnd': this.emit("dataEnd");
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

    }
    [ws] = async () => {
        const auth = await util.promisify(fs.exists)(authDir)
        if (auth)
            this[whatsApp].loadAuthInfo(authDir)

        await this[whatsApp].connect()
        if (!auth) {
            try {
                console.log('guardando credenciales')
                const credential = this[whatsApp].base64EncodedAuthInfo()
                const fileDir = path.join(__dirname, './auth_info.json')
                console.log(fileDir)
                fs.writeFileSync(fileDir, JSON.stringify(credential, null, '\t'))
            } catch (error) {
                console.error('error credenciales', error.message)
            }
        }
    }
    [wsOpen] = async (data) => {

        this.notify({
            type: "connected",
            data: data.user
        })

        this.state.config.company.botWsNumber = data.user.jid.replace(/[^0-9]/g, '')
        this[signal]({ firstInit: true }, { end: () => { } })
        const m = await this[whatsApp].loadAllUnreadMessages()
        this[chatUpdate]({
            messages: {
                all: () => m
            }
        })

    }
    [chatUpdate] = async (chat, resource, sendSerNo, buff, vcard) => {

        try {
            if (!chat.messages)
                return
            const messages = await chat.messages.all()
            for (const m of messages) {

                if (!resource && m.key.fromMe)
                    return
                let mediaMimeType = 'text/plain'
                let rawData = null
                let mediaName = null
                let mediaCaption = null
                let mediaSize = null

                const messageType = Object.keys(m.message)[0]// get what type of message it is -- text, image, video
                this.notify({
                    type: "message",
                    data: {
                        id: m.key.id,
                        remoteJid: m.key.remoteJid,
                        messageType,
                        data: String(Object.values(m.message)[0])
                    }
                })

                if ([MessageType.video, MessageType.audio, MessageType.document, MessageType.sticker, MessageType.image].includes(messageType)) {
                    const buffer = buff || await this[whatsApp].downloadMediaMessage(m) // to decrypt & use as a buffer
                    rawData = buffer.toString('base64')
                    mediaSize = buffer.byteLength
                    mediaMimeType = m.message[messageType].mimetype
                    mediaCaption = m.message[messageType].caption || ""
                    mediaName = `${uuid.v4()}.${mime.extension(mediaMimeType)}`
                }

                let data = "", lat, lon, mediaWaType
                switch (messageType) {
                    case MessageType.text:
                        data = m.message.conversation
                        mediaWaType = 0
                        break;
                    case MessageType.extendedText:
                        data = m.message.extendedTextMessage.text
                        mediaWaType = 0
                        break;
                    case MessageType.image:
                        data = mediaCaption
                        mediaWaType = 1
                        break;
                    case MessageType.audio:
                        mediaWaType = 2
                        break;
                    case MessageType.video:
                        mediaWaType = 3
                        break;
                    case MessageType.sticker:
                        mediaWaType = 3
                        break;
                    case MessageType.contact:
                        data = vcard
                        mediaWaType = 4
                        break;
                    case MessageType.location:
                        mediaWaType = 5
                        lat = m.message.locationMessage.degreesLatitude
                        lon = m.message.locationMessage.degreesLongitude
                        break;
                    case MessageType.liveLocation:
                        mediaWaType = 5
                        lat = m.message.liveLocationMessage.degreesLatitude
                        lon = m.message.liveLocationMessage.degreesLongitude
                        break;
                    case MessageType.document:
                        mediaWaType = 9
                        break
                    default:
                        mediaWaType = 0
                        break;
                }
                const body = {
                    keyFromMe: m.key.fromMe ? 1 : 0,
                    messageId: m.messageTimestamp.low,
                    keyRemoteJid: m.key.remoteJid.replace(/[^0-9\-]/g, ''),
                    remoteJid: m.key.remoteJid,
                    data,
                    mediaWaType,
                    mediaName,
                    mediaMimeType,
                    mediaCaption: mediaCaption == 'null' ? null : mediaCaption,
                    mediaSize,
                    rawData,
                    timestamp: m.messageTimestamp.low,
                    lat,
                    lon,
                    quotedRowId: m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo
                        ? m.message.extendedTextMessage && m.message.extendedTextMessage.contextInfo.stanzaId : null,
                    wsGroupName: null,
                    wsId: m.key.id,
                    remoteResource: resource,
                    sendSerNo: sendSerNo
                }

                const exit = _.find(this[queue], { wsId: m.key.id })
                if (!exit)
                    this[queue].push(body)




            }
            this[postToDb]()

        } catch (error) {
            console.error(error.message, error)
        }

    }
    async[postToDb]() {

        if (this.isRun)
            return

        this.isRun = true
        const processed = []
        while (this[queue].length) {
            const data = this[queue].shift()

            try {
                const resp = await request(this.state.config.webhook.pushMessage, {
                    method: "post",
                    body: JSON.stringify({
                        ...data,
                        ...this.state.config.company
                    }),
                    agent
                })
                const { success, message } = await resp.json()
                if (success) {
                    processed.push(data.remoteJid)
                    await new Promise(s => setTimeout(s, 100))
                } else throw new Error(message)

            } catch (error) {
                this[queue].unshift(data)
                console.error(error.message)
                await new Promise(s => setTimeout(s, 500))
            }

        }
        for (const id of processed) {
            this[whatsApp].chatRead(id)
        }
        this.isRun = false
    };
    async [signal](req, resp) {

        try {
            
            resp.end('aceptado')
            if (this.sendRun) {
                this.sendPending = true
                return
            }
            this.sendRun = true
            const params = new URLSearchParams();
            params.append('botWsNumber', this.state.config.company.botWsNumber);
            params.append('compId', this.state.config.company.compId);
            params.append('sucId', this.state.config.company.sucId);
            if (req.firstInit)
                params.append('send_isSend', '0,1');
            else
                params.append('send_isSend', '0');

            const prefix = '@s.whatsapp.net'

            const response = await request(`${this.state.config.webhook.getMessage}?${params}`, { agent })
            const { success, data } = await response.json()

            if (success && data.length) {
                let promises = []

                for (const msg of data) {

                    let send = WAMessageProto.WebMessageInfo
                    let buff = null
                    let { message, imgurl, raw_data, lat, long, replyId,
                        username, media_name, remote_resource, ser_no, media_type
                    } = msg



                    if (this[sendSuccess].includes(ser_no))
                        continue

                    this.notify({
                        type: "queue", data: [
                            {
                                username,
                                ser_no,
                                media_type,
                                intent: 0
                            }
                        ]
                    })
                    continue
                    let type = MessageType.text
                    message = String(message).replace(/{{lf}}/g, '\n').trim();
                    username = username + prefix

                    promises.push(new Promise(async (s, r) => {
                        try {
                            //await this[whatsApp].chatRead(username) // mark chat read
                            await this[whatsApp].updatePresence(username, Presence.available) // tell them we're available
                            await this[whatsApp].updatePresence(username, Presence.composing) // tell them we're composing
                            let quoted = null
                            let vcard = ""
                            if (replyId)
                                quoted = await this[whatsApp].loadMessage(username, replyId)


                            this.notify({ type: "queue_status", data: { ser_no, status: "sending...", intent: 1 } })
                            if (String(remote_resource).match(/VCARD/)) {
                                let contacts = JSON.parse(String(msg.message).replace(/.*<|>/gi, '').trim())
                                type = MessageType.contact
                                for (const { tel, nombre } of contacts) {
                                    let vcard1 = 'BEGIN:VCARD\n'
                                        + 'VERSION:3.0\n'
                                        + 'FN:' + nombre + '\n'
                                        + 'TEL;type=CELL;waid=' + tel[0] + ':' + tel[0] + '\n'
                                        + 'END:VCARD';
                                    send = await this[whatsApp].sendMessage(username, { vcard }, type, { quoted })
                                    vcard += vcard1;
                                }
                            } else if (raw_data) {
                                const mimeType = mime.lookup(imgurl || media_name)
                                const filename = path.basename(imgurl || media_name)
                                buff = Buffer.from(raw_data, 'base64');

                                if (media_type.toUpperCase().includes('IMAGE'))
                                    type = MessageType.image
                                else if (media_type.toUpperCase().includes('AUDIO'))
                                    type = MessageType.audio
                                else if (media_type.toUpperCase().includes('VIDEO'))
                                    type = MessageType.video
                                else
                                    type = MessageType.document
                                promises.push(

                                )
                                send = await this[whatsApp].sendMessage(username, buff, type, {
                                    mimetype: mimeType,
                                    filename: filename,
                                    quoted,
                                    ...(message ? { caption: message } : {})
                                })

                            } else if (lat && long) {
                                type = MessageType.location

                                send = await this[whatsApp]
                                    .sendMessage(username, {
                                        degreesLatitude: lat,
                                        degreesLongitude: long
                                    }, type, { quoted })

                            } else {
                                send = await this[whatsApp].sendMessage(username, message, type, { quoted })
                            }
                            this[chatUpdate]({
                                messages: {
                                    all: () => [send]
                                }
                            }, remote_resource, ser_no, buff, vcard)

                            this[sendSuccess].push(ser_no)
                            this.notify({ type: "queue_status", data: { ser_no, status: "success", intent: 1 } })
                            s(true)

                        } catch (error) {
                            r(error)
                            this.notify({ type: "queue_status", data: { ser_no, status: error.message, intent: 1 } })
                        }

                    }))
                }

                await Promise.all(promises)
            }

            this.sendRun = false
            if (this.sendPending) {
                this.sendPending = false
                return this[signal](req, resp)
            }

        } catch (error) {
            console.error(error.message)
        }

    };
}
const interceptor = new Interceptor()


module.exports = interceptor




/*     = {
        messages: {
            all: () => {
                const m = this[whatsApp].loadAllUnreadMessages()
                return m
            }
        }
    }, */