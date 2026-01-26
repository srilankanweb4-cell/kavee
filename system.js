const os = require('os');
const axios = require('axios');
const config = require('../settings');

module.exports = {
  name: "system",
  command: ["system", "sys", "status"],

  async execute({ socket, msg, sender }) {
    let shala;

    try {
      // React
      await socket.sendMessage(sender, {
        react: { text: "🖥️", key: msg.key }
      });

      const pushname = msg.pushName || "User";

      const ownerdata = (await axios.get(
        "https://raw.githubusercontent.com/Nethmika-LK/Shala-MD-Database/refs/heads/main/Ditelse.json"
      )).data;

      const {
        alivemsg,
        footer,
        imageurl,
        profileurl,
        alivevideo,
        version,
        jid,
        platform,
        jidname,
        botname,
        ownername,
        ownernumber,
        channel,
        pairlink,
        title
      } = ownerdata;
      
      const shala = {
      key: {
        remoteJid: "status@broadcast",
        participant: "0@s.whatsapp.net",
        fromMe: false,
        id: "META_AI_SYSTEM"
      },
      message: {
        contactMessage: {
           displayName: botname,
          vcard: `BEGIN:VCARD
VERSION:3.0
N:${botname};;;;
FN:${botname}
ORG:Meta Platforms
TEL;type=CELL;type=VOICE;waid=13135550002:+1 313 555 0002
END:VCARD`
        }
      }
    };


      // Uptime
      const up = process.uptime();
      const h = Math.floor(up / 3600);
      const m = Math.floor((up % 3600) / 60);
      const s = Math.floor(up % 60);

      // RAM
      const totalMem = os.totalmem() / 1024 / 1024 / 1024;
      const freeMem = os.freemem() / 1024 / 1024 / 1024;
      const usedMem = totalMem - freeMem;
      const ramPercent = ((usedMem / totalMem) * 100).toFixed(1);

      // CPU
      const cpuModel = os.cpus()[0].model;
      const cores = os.cpus().length;

      // Ping
      const ping = msg.messageTimestamp
        ? Date.now() - msg.messageTimestamp * 1000
        : 'N/A';

      // Host
      const host =
        process.env.RENDER ? 'Render'
        : process.env.HEROKU ? 'Heroku'
        : 'Local / VPS';

      const systemMessage = `*🖥️ ${botname} Sʏꜱᴛᴇᴍ Iɴꜰᴏ 🖥️*

*╭───────────────●●✿◦*
*┊* 🧬 Version : ${version || config.BOT_VERSION}
*┊* ✒️ Prefix  : ${config.PREFIX}
*┊* 🌐 Host    : ${host}
*┊*
*┊* 🧠 CPU     : ${cpuModel}
*┊* 🔢 Cores   : ${cores}
*┊*
*┊* 💾 RAM     : ${usedMem.toFixed(2)} / ${totalMem.toFixed(2)} GB
*┊* 📊 Usage   : ${ramPercent}%
*┊*
*┊* 📟 Uptime  : ${h}h ${m}m ${s}s
*┊* ⚡ Ping    : ${ping} ms
*┊*
*┊* 🤖 Status  : 🟢 Online
*╰───────────────●●✿◦*`;

      const buttons = [
      { buttonId: `${config.PREFIX}ping`, buttonText: { displayText: "PING CMD" }, type: 1 },
      { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "MENU CMD" }, type: 1 }
    ];

      const pingMsg = await socket.sendMessage(
        sender,
        { image: {url: imageurl},
          caption: systemMessage,
          footer: footer,
          buttons,
          headerType: 4,
           contextInfo: {
                forwardingScore: 999,
                isForwarded: true
            }
 }, { quoted: shala });

      

    } catch (e) {
      console.error('system error:', e);
      await socket.sendMessage(
        sender,
        { text: '❌ Failed to load system panel.' },
        { quoted: shala || msg }
      );
    }
  }
};