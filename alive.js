const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "alive",
  command: ["alive", "info", "online"],

  async execute({ socket, msg, sender, config }) {
    try {

      await socket.sendMessage(sender, {
  react: {
    text: "🪀",
    key: msg.key
  }
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


      const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
const time = moment().tz("Asia/Colombo").format("HH:mm:ss");

const hour = moment().tz("Asia/Colombo").hour();
const greetings =
  hour < 12 ? '*`සුභ උදෑසනක් 🌄`*' :
  hour < 17 ? '*`සුභ දහවලක් 🏞️`*' :
  hour < 20 ? '*`සුභ හැන්දෑවක් 🌅`*' :
              '*`සුභ රාත්‍රියක් 🌌`*';

      let host = os.hostname() || "render";
      if (host.length === 12) host = "replit";
      else if (host.length === 36) host = "heroku";
      else if (host.length === 8) host = "koyeb";

      const monospace = "```";

      const aliveMessage = `_*Ｗᴇʟᴄᴏᴍᴇ Ｔᴏ S𝚑𝚊𝚕𝚊 Ｍɪɴɪ Ｂᴏᴛ 🐼"*_

*╭───────────────●●✿◦*
*┊• 🖼️ \`ɢʀᴇᴇᴛ\` :-* ${greetings}
*┊• ⏰ \`ᴛɪᴍᴇ\` :-* *${time}*
*┊• 📅 \`ᴅᴀᴛᴇ\` :-* *${date}*
*┊• 👨‍💻 \`ᴏᴡɴᴇʀ\` :-* *${ownername}*
*╰───────────────●●✿◦*

${alivemsg}

*🌐 SHALA MINI BOT Website :*
> ${pairlink}`;

const buttons = [
      { buttonId: `${config.PREFIX}ping`, buttonText: { displayText: "PING CMD" }, type: 1 },
      { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "MENU CMD" }, type: 1 }
    ];

      await socket.sendMessage(
        sender,
        {
          video: { url: alivevideo },
          mimetype: "video/mp4",
          ptv: true
        },
        { quoted: msg }
      );

      await socket.sendMessage(
        sender,
        {
          image: { url: imageurl },
          caption: aliveMessage,
          footer: footer,
          buttons,
          headerType: 4,
          contextInfo: {
            forwardedNewsletterMessageInfo: {
              newsletterJid: jid,
              newsletterName: jidname,
              serverMessageId: 999
            },
            externalAdReply: {
              title,
              body: pushname,
              mediaType: 1,
              sourceUrl: channel,
              thumbnailUrl: profileurl,
              renderLargerThumbnail: false,
              showAdAttribution: true
            }
          }
        },
        { quoted: shala }
      );

    } catch (e) {
      console.error(e);
      await socket.sendMessage(
        sender,
        { text: `❌ Alive Error:\n${e.message}` },
        { quoted: shala }
      );
    }
  }
};
