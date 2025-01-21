const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUlDbU1yVUNEa2NEV05odFVROWV0eUZyWW03blozalBSQUFkd3hWblptRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQStQdkxlaDZMcVhtVTJGOE4vRW9UVHFLS2ZhdHhlZGJxbGE1RTlWeG4zbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJNUE5OUVZXSjlzcS95TkxZTGhjQzJsYlZ0N0VEYVc4VGRzNEZGb3ZkdzJzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzcnFCSUJLUERnT2tKcDlEYUlzdFJhUzdsT2E1QmRvbjBSanErZTdWUjFNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9NQ2ZyQmhoN05VVEtVZUo0S21mSEdyN25ENVpNbGxvSDhhVmxMVTlDSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxoQ1NTSWw2Rm1HN1NCN25hTzhiNC9DZkFWUVRZTmZidmFrbWNJL0g2aTA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU1WZnJIMkpubmRnbVgzakhjMzk2TEFGUVR1RGppRnRCblVJU0ZnYWMzVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGgraEdQUUFudFJEdm1iU2htVlV4MTk2Rmx1Q2hCK3ZwSTR2bUZ0azZ5TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im5zL0o2NXVIaEJnbjl6b2UxcStLVURtcmRKYWNVWGpEZVRrcFFZZzNhRitkVXpGRUczVGsvMUJRU2JlSzluTGhRaDMrYXlKVm5sYzVyanoxK0o3ZkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI4LCJhZHZTZWNyZXRLZXkiOiJtRG1vTDZzN2xkdFpHcktoRnZ2bmV0SUxMdHJCYm5rV3UvYXBXSjdlbUhZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJVR2JfcVFCdVNrNjRLVlFLSWlEdXBnIiwicGhvbmVJZCI6IjIzODc5MGE0LTc1NmItNDVjOC1iYTcwLTc3N2QxMGE2ZTE4YSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUOW03NFpDT2I4NC9wenhGekVDZXJ4YTRhTVk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUGFtNTl6OXVQSHFIcjZqZzkwVTRqTmJlNjhJPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRYQ0pWNDdIIiwibWUiOnsiaWQiOiIyMzQ5MDE3MTE3Nzc5OjMzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMQ3l3YndFRU96ZXU3d0dHQVVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRc3U3clFwTTJNWlJVcHJMaXZmWE1HWGYvSXU3OUMrVC9FWHZoOC9LS3cwPSIsImFjY291bnRTaWduYXR1cmUiOiJmbVJmVVBnMkJ5MHhnT0tZb25qUlFZY0FERWhzaTJlMVdmZ1BwRmdNT2hPV01jamRuZzhzOGF2a1R2aHZTZlIrdnNYcjVoRjN2R3IySktDRXpaQjFDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiVW9Mc3crZlorTEM3Yy9IbnhkQUZlOTVhamZaRldxdnN3dS9Cejc1S20zV2Q2cWEweVo5NjRDdnkyVEYvZDJLMXJSOXVOM0tQZ0YvU2xYeCs3VzlEQkE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MDE3MTE3Nzc5OjMzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlVMTHU2MEtUTmpHVVZLYXk0cjMxekJsMy95THUvUXZrL3hGNzRmUHlpc04ifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3Mzc0MjA2NjZ9',
    PREFIXES: (process.env.PREFIX || '.').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Pheazy",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "2349017117769",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
