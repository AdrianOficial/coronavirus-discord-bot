'use strict';

const Discord = require('discord.js');
const botToken = "Nzc0Njg3MTQ5NDYyNTE5ODA5.X6bZoQ.Cqz0yMx_Y1xkCCa5DzMt_CF28_g";
const prefix = "!";
const client = new Discord.Client();
const http = require('http');
const https = require('https');


client.on('ready', () => {
	console.log('Sant onlain');
});

client.on('message', message => {
	
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();
	
	if (!message.content.startsWith(prefix)) return;
	
	switch(command) {
		
		case 'coronavirus': {
			
			if(args[0]) {
			
				let client = https;
				var url = 'https://blowmice.cf/index.php?country='+args[0]+'';
				
				client.get(url, (resp) => {
					
					let data = '';
					
					resp.on('data', (chunk) => {
						data += chunk;
					});
					
					resp.on('end', () => {
						var object = JSON.parse(data);
						
						const embed = {
						  "color": 5778876,
						  "title": object['country'], 
						  "fields": [
							{
							  "name": "Active Cases",
							  "value": object['active_cases'],
							  "inline": true
							},
							{
							  "name": "New Cases",
							  "value": object['new_cases'],
							  "inline": true
							},
							{
							  "name": "New Deaths",
							  "value": object['new_deaths'],
							  "inline": true
							},
							{
							  "name": "Total cases",
							  "value": object['total_cases'],
							  "inline": true
							},
							{
							  "name": "Total deaths",
							  "value": object['total_deaths'],
							  "inline": true
							},
							{
							  "name": "Total recovered",
							  "value": object['total_recovered'],
							  "inline": true
							}
						  ]
						};
						message.channel.send({ embed });
						
					});
				
				});
				
			}
			


			
			break;
		}
		
		
	};
	
	
});

client.login(botToken);
