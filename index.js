'use strict';

const Discord = require('discord.js');

//token
const botToken = "TOKEN";

//prefix
const prefix = "!";


const client = new Discord.Client();

//npm install http
const http = require('http');

//npm install https
const https = require('https');

//link
const link = "https://link/index.php?country="

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
				
				// if you have http on link use let client = http;
				// if you have https on link use let client = https;
				
				let client = https;
				var url = link+args[0];
				
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
