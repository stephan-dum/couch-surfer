const selector = {
  "$and" : [
    {"series":{"$ne":"kirby"}},
    {"series":{"$ne":"pokemon"}},
    {"_id":{"$gt":"mario"}},
    {"debut":{"$lte":1993}}
  ]
};
/* equivalent
  {
    series : { "$nin" : ["kirby", "pokemon"] }
    "_id" : { "$gt" : "mario" },
    debut : { "$lte" : 1993 }
  }
*/