const { cmd, commands } = require("../command");
const config = require('../config');
const os = require('os'); // To get RAM info
const moment = require('moment'); // For uptime formatting

cmd(
  {
    pattern: "menu",
    alias: ["getmenu"],
    react: "📜",
    desc: "Get bot command list",
    category: "main",
    filename: __filename,
  },
  async (robin, mek, m, { from, pushname, sender, reply }) => {
    try {
      // Calculate dynamic values
      const uptime = moment.duration(process.uptime() * 1000).humanize();
      const totalRam = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2) + " GB";
      const usedRam = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) + " MB";
      const owner = config.OWNER_NUMBER || "Unknown"; // fallback
      const user = pushname || sender.split("@")[0];

      // Create menu categories
      let menu = {
        main: "",
        download: "",
        group: "",
        owner: "",
        convert: "",
        search: "",
      };

      for (let i = 0; i < commands.length; i++) {
        const oneCmd = commands[i]; // <== changed cmd -> oneCmd
        if (oneCmd.pattern && !oneCmd.dontAddCommandList) {
          const line = `┃   ▪️ ${config.PREFIX}${oneCmd.pattern}\n`;
          if (menu[oneCmd.category]) {
            menu[oneCmd.category] += line;
          }
        }
      }

      const madeMenu = `𝐘𝐨𝐨 𝐰𝐡𝐚𝐭𝐳𝐩 𝐁𝐎𝐙𝐀 ${user}
*Wᴇʟᴄᴏᴍᴇ Tᴏ MAHII-MD* 

╭─「 🛠️ ꜱᴛᴀᴛᴜꜱ ᴅᴇᴛᴀɪʟꜱ 」 
│🤖 *Bot*: MAHII-MD-V2
│🙋‍♂️ *User*: ${user}
│📱 *Owner*: ${owner}
│⏳ *Uptime*: ${uptime}
│💾 *Ram*: ${usedRam} / ${totalRam}
│🛎️ *Prefix*: ${config.PREFIX}
╰──────────●●►

╭─「 📜 ᴍᴇɴᴜ ᴏᴘᴛɪᴏɴꜱ 」 
│ ⚙️ *MAIN COMMANDS*
│   ➥ .alive 
│   ➥ .menu 
│   ➥ .ai <text> 
│   ➥ .system 
│   ➥ .owner 
│
│ 📥 *DOWNLOAD COMMANDS*
│   ➥ .song <text> 
│   ➥ .video <text> 
│   ➥ .fb <link> 
│
│ 👑 *OWNER COMMANDS*
│   ➥ .restart 
│   ➥ .update 
│
│ 🔁 *CONVERT COMMANDS*
│   ➥ .sticker <reply img> 
│   ➥ .img <reply sticker> 
│   ➥ .tr <lang> <text>
│   ➥ .tts <text> 
╰──────────●●►

*POWERED BY MAHII-MD*
`;

      await robin.sendMessage(
        from,
        {
          image: {
            url: "https://github.com/Mahii-Botz/Mahii-md-LOGO/blob/main/ChatGPT%20Image%20Apr%2021,%202025,%2005_32_50%20PM.png?raw=true",
          },
          caption: madeMenu,
        },
        { quoted: mek }
      );

    } catch (e) {
      console.error(e);
      reply("❌ Menu error:\n" + e.message);
    }
  }
);
