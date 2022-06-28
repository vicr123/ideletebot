const discord = require("discord.js");
const fs = require("fs/promises");

const targetChannel = process.env.CHANNEL;

const lines = [
    "Your message was whisked away to Narnia by the elves.",
    "Your message was beat out of the water by theBeat.",
    "Your message was maliciously destroyed by Buzz Lighyear.",
    "Your message was randomly selected to be deleted by iDeleteBot.",
    "Your message was the 1000000th message to be sent by some metric, and won a free one-way trip to the sun!",
    "Your message wasn't wearing its headphones correctly and was sent on a virtual trip around the world.",
    "Your message was way too good looking for this channel.",
    "Your message was having a connection issue.",
    "Your message wanted 2 order some FrivoloCo instead.",
    "Your message segfaulted itself on the way to the server.",
    "Your message went to Kmart."
];

const client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILD_MESSAGES, discord.Intents.FLAGS.GUILDS],
    partials: ["CHANNEL"]
});
client.on('ready', () => {
    
});
client.on('messageCreate', async msg => {
    if (msg.channelId !== targetChannel) return;
    if (msg.author.bot) return;

    if (Math.random() > 0.2) return;

    let line = lines[Math.floor(Math.random() * lines.length)];

    await msg.delete();
    await msg.channel.send(`<@${msg.author.id}> Oh, no! ${line} **What a shame.**`);
    await fs.appendFile(`hits-${new Date().getUTCFullYear()}.txt`, `${msg.author.id},${new Date().getTime()}\n`);
});
client.login(process.env.TOKEN);