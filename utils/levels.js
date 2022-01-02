const profileModel = require('../models/profileSchema');

module.exports = {

	async levelCheck(message, profileData, botReply) {

		const requiredExperiencePoints = profileData.levels * 50;

		if (profileData.experience >= requiredExperiencePoints) {

			profileData = await profileModel
				.findOneAndUpdate(
					{ userId: message.author.id, serverId: message.guild.id },
					{
						$inc: {
							experience: -requiredExperiencePoints,
							levels: +1,
						},
					},
					{ new: true },
				)
				.catch((error) => {
					throw new Error(error);
				});

			const embed = {
				color: profileData.color,
				title: `${profileData.name} just leveled up! ${profileData.pronounArray[0].charAt(0).toUpperCase() + profileData.pronounArray[0].slice(1)} ${(profileData.pronounArray[5] == 'singular') ? 'is' : 'are'} now level ${profileData.levels}.`,
			};

			botReply.embeds.push(embed);
			await botReply
				.edit({
					embeds: botReply.embeds,
				})
				.catch((error) => {
					if (error.httpStatus == 404) {
						console.log('Message already deleted');
					}
					else {
						throw new Error(error);
					}
				});
		}
	},

	async decreaseLevel(message, profileData) {

		const newUserLevel = Math.round(profileData.levels - (profileData.levels / 10));
		const emptyUserInventory = [...profileData.inventoryArray];

		for (let i = 0; i < profileData.inventoryArray.length; i++) {

			for (let j = 0; j < profileData.inventoryArray[i].length; j++) {

				emptyUserInventory[i][j] = 0;
			}
		}

		await profileModel
			.findOneAndUpdate(
				{ userId: message.author.id, serverId: message.guild.id },
				{
					$set: {
						levels: newUserLevel,
						experience: 0,
						inventory: emptyUserInventory,
					},
				},
				{ new: true },
			)
			.catch((error) => {
				throw new Error(error);
			});
	},

};