const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: String,
    description: String,
    services: [{type: Schema.Types.ObjectId, ref: "serviceModel"}]
    
});

const organizationModel = mongoose.model("organizationModel", organizationSchema);
module.exports = organizationModel;