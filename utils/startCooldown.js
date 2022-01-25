const profileModel = require('../models/profileModel');

module.exports = async (message, profileData) => {

	if (profileData.hasCooldown !== true) {

		console.log(`\x1b[32m\x1b[0m${message.author.tag} (${message.author.id}): hasCooldown changed from \x1b[33m${profileData.hasCooldown} \x1b[0mto \x1b[33mtrue \x1b[0min \x1b[32m${message.guild.name} \x1b[0mat \x1b[3m${new Date().toLocaleString()} \x1b[0m`);
		profileData = await profileModel
			.findOneAndUpdate(
				{ userId: message.author.id, serverId: message.guild.id },
				{ $set: { hasCooldown: true } },
			)
			.catch(async (error) => {
				throw new Error(error);
			});
	}

	return profileData;
};