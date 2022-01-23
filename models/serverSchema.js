const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
	serverId: { type: String, require: true, unique: true },
	name: { type: String },
	commonPlantsArray: [{ type: Number, default: 0 }],
	uncommonPlantsArray: [{ type: Number, default: 0 }],
	rarePlantsArray: [{ type: Number, default: 0 }],
	meatArray: [{ type: Number, default: 0 }],
	inventoryObject: {
		commonPlants: { type: Object },
		uncommonPlants: { type: Object },
		rarePlants: { type: Object },
		meat: { type: Object },
	},
	accountsToDelete: { type: Map, of: Number },
});

const model2 = mongoose.model('serverModel', serverSchema);

module.exports = model2;