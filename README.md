# SimSig-Game-Updates
This is a Discord bot that scrapes [the SimSig website's upcoming games list](https://www.simsig.co.uk/Game) and posts upcoming games (within the next two days) in a specified Discord channel in the form of a rich embed. This feed is updated once per day at 00:00 (local time, depending on where the bot is hosted).

![Discord_CJAYsgp9VY](https://user-images.githubusercontent.com/58154576/140078467-5ed13559-e143-4cee-95a1-526b98d234da.png)

## Important Note
As this bot was not updated since June 2021, this still utilizes Discord.js v12, meaning that on newer installations of node/djs, the bot may not run. This is to be patched in a future commit.

## Setup
1. A file named 'config-template.json' is included in this download. Rename this to 'config.json'.
2. Go to your [Discord developer portal](https://discord.com/developers/applications) and create a new application.
3. Enter the Bot tab and set up the bot. At this point, a token field will be present. Press the Copy button below it, and paste it into the config file, replacing "bot token". (Keep the double quotes for this, and for all copy-pastes into the config file)
4. Replace "channel to send to" with the ID of the channel you would like the bot to send messages to.
5. To add the bot to the server, go to the OAuth2 section of the developer's page. Scroll to the bottom. Under Scopes, you must tick 'bot' and 'applications.commands'. Under Bot Permissions, tick 'Administrator'. Also ensure you enable BOTH privileged intents under the Bots section.
6. This gives you a link to add the bot to any server you manage. Follow Discord's on screen instructions after copying this link into your browser.
7. Open up command prompt, `cd` to the folder of the main.js file, and enter `node main.js`
