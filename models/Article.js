const mongoose = require("mongoose");
const ArticleSchema = new mongoose.Schema({
  cat: {
    type: String,
  },
  title: {
    type: String,
  },
  authors: {
    type: String,
  },
  source: {
    type: String,
  },
  pubyear: {
    type: String,
  },
  doi: {
    type: String,
  },
  claim: {
    type: String,
  },
  evidence: {
    type: String,
  },
  moderated:{
    type: Boolean
  },
  analysed :{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    default: Date.now
  }
});
module.exports = Article = mongoose.model("article", ArticleSchema);
