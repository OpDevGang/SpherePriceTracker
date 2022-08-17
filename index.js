const { Client, GatewayIntentBits } = require('discord.js');
const fetch = require('cross-fetch');
require('dotenv').config();
//const keepAlive = require('./server')


// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildPresences
	]
});


let spherePrice;

run()
async function run() {
	
	try {
	// API fetch and turn response to json
	const url = `https://api.coingecko.com/api/v3/coins/sphere-finance`;
	const res = await fetch(url)
	const cryptoTokenData = await res.json()

	// Crypto Token market data
	const marketData = cryptoTokenData.market_data

	// Current Price of the token
	spherePrice = marketData.current_price.usd

	} catch(e) {}
}

// When the client is ready, run this code (only once)
client.on('ready', async () => {

	try {
	const server = client.guilds.cache.get(process.env.GUILD_ID)
	const priceTrackBot = server.members.cache.find(member => member.id === '1007927620190613565')
	
	setInterval( async () => {

		await run()
		priceTrackBot.setNickname(`$${spherePrice}`)
		client.user.setPresence({ 
			activities: [{ name: `Sphere Price`, type: 3 }], status: 'online'
		})
	}, 5000)
	
	console.log('Ready!');
	} catch(e) {}
});


//keepAlive();
// Login to Discord with your client's token
client.login(process.env.TOKEN);