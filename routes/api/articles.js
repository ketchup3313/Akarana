const express = require("express");
const router = express.Router();
const Article = require("../../models/Article");

router.get("/", async (req, res) => {
  Article.find()
    .then((articles) => res.json(articles))
    .catch((err) => res.status(404).json({ noArtFound: "No articles found" }));
  
});
router.put("/moderated/:id", async (req, res, next) =>
{
  console.log("updating moderator");
  console.log(req.body.id);
  console.log(req.params.id);
  console.log("thisis evidence" + req.body["evidence"]);
  console.log("thisis evidence" + req.body.evidence);
  
  var analysedQuery = {_id : req.params.id};

  var newValue = { $set: { moderated: true, claim: req.body["claim"], evidence:req.body["evidence"] } };
  Article.updateOne(analysedQuery, newValue, (err, res) =>{
    if(err)
      console.log("something bad happed : failed to set to analysed");
    else
      console.log("success");
  });
}
);


router.delete("/:id", async (req, res)=>{
  Article.findOneAndRemove({_id : req.params.id}, {useFindAndModify: false}, (err, _)=>{
    if (err){
      console.warn("failed to delete " + req.params.id);
      res.sendStatus(409);
    }
    else{
      
      res.sendStatus(200);
      console.warn("discard successful");
    }
  }
);})


router.put("/:id", async (req, res, next) =>{
  console.log(req.body.id);
  console.log(req.params.id);
  console.log(JSON.stringify(req.body));
  console.log("claim" + req.body.claim);
  console.log("lvl of evidence" + req.body.evidence)
  var fieldsToUpdate = req.body;

  var analystQuery = {_id : req.params.id};
  var newValue = { $set: fieldsToUpdate };
  Article.updateOne(analystQuery, newValue, (err, res) =>{
    if(err)
      console.log("something bad happed : failed to set to analysed");
    else
      console.log("success");

  });

})

router.delete("/", async (req, res) => {
  console.log("deleting");
  
  Article.deleteMany({})
    .then(res.send("deletions successful"))
    .catch((error) => console.log(error));
})

router.post("/", async (req, res) => {
  console.log("posting new article");
  let article = req.body;
  let exists = false;
  await Article.findOne({doi:article.doi}).then(article=>
    {
      console.log(JSON.stringify(article));
      if (article){
        exists = true;
        res.status(400).send("duplicate err")
      }
     
    }
    ).catch(err=>{});

  console.log("creating");
  if (!exists){
    Article.create(req.body)
      .then((article) => res.send("success"))
      .catch((err) =>{      
        res.status(400).json({ error: "Unable to add this article" });
        
      }
      );
  } 
});

module.exports = router;