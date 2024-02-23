const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
*╔═🥶══ •༆✯𝑴𝑪𝑹𝑶𝑺𝑺-𝑴𝑫✯༆• ══🥶══╗*
┃   *𝑷𝑹𝑬𝑭𝑰𝑿* : ${s.PREFIXE}
┃   *𝑶𝑾𝑵𝑬𝑹* : ${s.OWNER_NAME}
┃   *𝑴𝑶𝑫𝑬* : ${mode}
┃   *𝑪𝑶𝑴𝑴𝑨𝑵𝑫𝑺* : ${cm.length}
┃   *𝑫𝑨𝑻𝑬* : ${date}
┃   *𝑯𝑶𝑼𝑹𝑺* : ${temps}
┃   *𝑴𝑬𝑴𝑶𝑹𝑰𝑬𝑺* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃   *𝑷𝑳𝑨𝑻𝑬𝑭𝑶𝑹𝑴* : ${os.platform()}
┃   *𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑹* : 𝑴𝑨𝑿𝑾𝑬𝑳𝑳
┃   *𝑪𝑼𝑺𝑻𝑶𝑴𝑬𝑹 𝑪𝑨𝑹𝑬/𝑯𝑬𝑳𝑷*:+2349120730021
*╚═════ •✧✧• ════╝* \n\n`;
    
let menuMsg = `
👋 Hello ${nomAuteurMessage} 👋
𝑰'𝑴 ༆✯𝑴𝑪𝑹𝑶𝑺𝑺-𝑴𝑫✯༆, 𝑨 𝑾𝑯𝑨𝑻𝑺𝑨𝑷𝑷 𝑩𝑶𝑻 𝑫𝑬𝑽𝑬𝑳𝑶𝑷𝑬𝑫 𝑩𝒀 ❝𝗞𝗜𝗡𝗚☆𝗠-𝗖𝗥𝗢𝗦𝗦❞.

*𝐿𝐼𝑆𝑇 𝑂𝐹 𝐶𝑂𝑀𝑀𝐴𝑁𝐷𝑆 𝐹𝑂𝑅 𝑀𝐶𝑅𝑂𝑆𝑆-𝑀𝐷 :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╔══✵* *${cat}*  *✵ ══╗*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
*✗✪* ${cmd}`;
        }
        menuMsg += `
*╚════ ✵༆✯𝑴𝑪𝑹𝑶𝑺𝑺-𝑴𝑫✯༆✵ ═══╝* \n`
    }

    menuMsg += `
◇            ◇
*»»————— ༒ —————««*
for use a command, insert  ${prefixe}"command_name"
 
 **
                                                
*»»————— ༆ —————««*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
