
var mongoose = require('mongoose');

const funcDataSchema = new mongoose.Schema({
  functionEnv: {type: String},
  functionName: { type: String,unique: true },
  functionMethod: { type: String },
  functionURL: {type: String,unique: true},
  clusterIP: { type: String },
  codeFile:{type:String},
},{
  timestamps: true
});
     
var functionData = mongoose.model("fundata", funcDataSchema);

module.exports = functionData;


