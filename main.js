const Discord = require('discord.js');
const cron = require("cron");
const rp = require('request-promise');
const cheerio = require('cheerio');
const config = require('./config.json');
const url = 'https://www.simsig.co.uk/Game';

const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] });

client.once('ready', () => {
    main();
    let job = new cron.CronJob('00 00 00 * * *', main);
    job.start();
});

client.login(config.TOKEN);

var titles = [], start = [], startstring = [], host = [], details = [];

var embedLoopIndex = 0;
var date = new Date(); //the current date/time

var nearcount = 0;

async function main() {
    embedLoopIndex = 0;
    titles = [];
    start = [];
    startstring = [];
    host = [];
    details = [];
	nearcount = 0;

    var iter = 0;
    /*
    0 - title of the game
    1 - start date & time
    2 - status (don't think this is really needed)
    3 - host
    4 - details (get the link instead of the text itself though)
    */
    const result = await rp.get(url);
    const $ = cheerio.load(result);

    var test = 0;

    $("table > tbody > tr > td").each((index, element) => {
        if (iter != 4 && iter != 1) {
            if (iter == 0) {
                titles.push($(element).text().trim());
            } else if (iter == 3) {
                host.push($(element).text().trim());
            }
        } else if (iter == 4) {
            details.push("https://www.simsig.co.uk" + $(element).find("a[href]").attr('href'));
            test++;
        } else if (iter == 1) {
            var datestring = $(element).text().trim();
            var day = datestring.substring(0,2);
            var year = datestring.substring(6,10);
            var month = datestring.substring(2,6); //INCLUDES THE SLASHES!!!!!!!!
            var rest = datestring.substring(10);

            var newstring = year + month + day + rest;
            var newdate = new Date(newstring);

            start.push(newdate);
            startstring.push(newstring);
        }
        iter++;
        if (iter > 4) {
            iter = 0; //going to another table element so reset
        }
    });
    embedLoop();
}

function embedLoop() {
    setTimeout(function() {
		date = new Date(); //the current date/time
        const diffTime = Math.abs(start[embedLoopIndex].getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        if (diffDays <= 2) {
            const embed = new Discord.MessageEmbed()
                .setColor('#ff0000')
                .setTitle('SimSig Game in in the Next 48 Hours')
                .addFields(
                    { name: 'Title', value: titles[embedLoopIndex] },
                    { name: 'Start Date', value: startstring[embedLoopIndex] },
                    { name: 'Host', value: host[embedLoopIndex] },
                    { name: 'Details', value: details[embedLoopIndex]},
                )
            client.channels.cache.get(config.CHANNEL).send(embed);
			nearcount++;
        }
        embedLoopIndex++;
        if (embedLoopIndex < start.length) {
            embedLoop();
        }
    }, 1500) //run only every 1.5 seconds
}