const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "freebot",
  command: ["freebot", "botfree", "pairbot"],

  async execute({ socket, msg, sender, config }) {
    try {

      // React emoji
      await socket.sendMessage(sender, {
        react: { text: "🔢", key: msg.key }
      });

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
      
      const pushname = msg.pushName || "User";

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

      const q =
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        '';

      const number = q.replace(/^[.\/!]pair\s*/i, '').trim();

      if (!number) {
        return await socket.sendMessage(sender, {
          text: '*📌  \`Usage\` :-* .pair 947XXXXXXXX'
        }, { quoted: shala });
      }

      try {
        const url = `https://shala-md-mini-1.onrender.com/code?number=${encodeURIComponent(number)}`;
        const res = await axios.get(url);
        const data = res.data;

        if (!data || !data.code) {
          return await socket.sendMessage(sender, {
            text: '*📌  \`Try Other Number\` :-* .pair 947XXXXXXXX'
          }, { quoted: shala });
        }

        await socket.sendMessage(sender, {
          react: { text: '🔑', key: msg.key }
        });

        const text =`*PAIR CODE GENERATED ✅*

*👤 \`User\` :-* ${number}
*🔑 \`Code\` :-* ${data.code}

👇 copy the code`;

        const buttons = [
          { buttonId: `${config.PREFIX}ping`, buttonText: { displayText: "PING CMD" }, type: 1 },
          { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "MENU CMD" }, type: 1 }
        ];

await socket.sendMessage(sender, {
  text,
  footer: footer,
  buttons: buttons,
  headerType: 4,
  contextInfo: { forwardingScore: 999,
  isForwarded: true }
}, { quoted: shala });

        await socket.sendMessage(sender, {
          text: `${data.code}`
        }, { quoted: shala });

      } catch (e) {
        console.error(e);
        await socket.sendMessage(sender, {
          text: `❌ Freebot Error:\n${e.message}`
        }, { quoted: shala });
      }

    } catch (e) {
      console.error(e);
    }
  }
};
