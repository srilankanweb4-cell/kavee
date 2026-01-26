const os = require("os");
const moment = require("moment-timezone");
const axios = require("axios");
const config = require('../settings');

module.exports = {
  name: "mainmenu",
  command: ["mainmenu", "maincommand", "maincmd"],
  category: "main",

  async execute({ socket, msg, sender }) {
    try {
      // React to the user
      await socket.sendMessage(sender, {
        react: {
          text: "🔰",
          key: msg.key
        }
      });

      // Fetch owner / bot data from GitHub
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

      // Quoted contact message (used in buttons)
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

      // Date & Time
      const date = moment().tz("Asia/Colombo").format("YYYY-MM-DD");
      const time = moment().tz("Asia/Colombo").format("HH:mm:ss");
      const hour = moment().tz("Asia/Colombo").hour();
      const greetings =
        hour < 12 ? '*`සුභ උදෑසනක් 🌄`*' :
        hour < 17 ? '*`සුභ දහවලක් 🏞️`*' :
        hour < 20 ? '*`සුභ හැන්දෑවක් 🌅`*' :
                    '*`සුභ රාත්‍රියක් 🌌`*';

      // Command list
      const commands = [
        { name: "alive", category: "main" },
        { name: "menu", category: "main" },
        { name: "ping", category: "main" },
        { name: "system", category: "main" },
        { name: "owner", category: "main" },
        { name: "downloadmenu", category: "download" },
      ];

      // Build menu text
      let menuc = `*Ｗᴇʟᴄᴏᴍᴇ Ｔᴏ ${botname} 🐼*\n\n`;

      menuc += `*╭───────────────●●✿◦*\n`;
      menuc += `*┊• 🖼️ \`ɢʀᴇᴇᴛ\` :-* ${greetings}\n`;
      menuc += `*┊• ⏰ \`ᴛɪᴍᴇ\` :-* *${time}*\n`;
      menuc += `*┊• 📅 \`ᴅᴀᴛᴇ\` :-* *${date}*\n`;
      menuc += `*╰───────────────●●✿◦*\n\n`;

      menuc += `*╭───────────────●●✿◦*\n`;
      menuc += `*┊• COMMAND LIST :*\n`;
      menuc += `*╰───────────────●●✿◦*\n\n`;

      // Loop through commands
      commands.forEach(cmdItem => {
        menuc += `*╭───────────────●●✿◦*\n`;
        menuc += `*┊ • COMMAND :* ${cmdItem.name}\n`;
        menuc += `*┊ • USE :* ${config.PREFIX}${cmdItem.name}\n`;
        menuc += `*╰───────────────●●✿◦*\n\n`;
      });

      // Buttons
      const buttons = [
        { buttonId: `${config.PREFIX}ping`, buttonText: { displayText: "PING CMD" }, type: 1 },
        { buttonId: `${config.PREFIX}menu`, buttonText: { displayText: "MENU CMD" }, type: 1 }
      ];

      // Send menu message
      await socket.sendMessage(
        sender,
        {
          image: { url: imageurl },
          caption: menuc,
          footer: footer,
          buttons,
          headerType: 4,
          contextInfo: { forwardingScore: 999, isForwarded: true }
        },
        { quoted: shala }
      );

    } catch (e) {
      console.error('System error:', e);
      await socket.sendMessage(
        sender,
        { text: '❌ Failed to load main menu.' },
        { quoted: msg }
      );
    }
  }
};