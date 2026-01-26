const config = require('../settings');
const axios = require("axios");

module.exports = {
  name: "owner",
  command: ["owner", "head"],

  async execute({ socket, msg, sender }) {
try {

    await socket.sendMessage(sender, {
  react: {
    text: "👤",
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

      // Owner vcards
      const vcard1 = `BEGIN:VCARD
VERSION:3.0
FN:NETHU MAX
ORG:NETHU MAX
TEL;type=CELL;type=VOICE;waid=94704227534:+94 70 422 7534
EMAIL:nethmikakaushalya10@gmail.com
END:VCARD`;

      const vcard2 = `BEGIN:VCARD
VERSION:3.0
FN:${ownername}
ORG:${ownername}
TEL;type=CELL;type=VOICE;waid=94787072548:+94 78 707 2548
EMAIL:nethmikakaushalya10@gmail.com
END:VCARD`;

      await socket.sendMessage(
        sender,
        {
          contacts: {
            displayName: "Bᴏᴛ Oᴡɴᴇʀꜱ",
            contacts: [
              { vcard: vcard1 },
              { vcard: vcard2 }
            ]
          }
        },
        { quoted: shala }
      );

    } catch (e) {
      console.error('owner plugin error:', e);
      await socket.sendMessage(
        sender,
        { text: '❌ Failed to get owner details.' },
        { quoted: shala }
      );
    }
  }
};