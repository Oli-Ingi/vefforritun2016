const pgp = require('pg-promise')();

const db = pgp('postgres://vef:vef@localhost:5432/forum');



getPosts = () => {
  let postData;
  return db.any("select * from threads")
    .then((data) => {
      // console.log(data);
      return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    })

};

getReplies = (id) => {
  return db.any("select * from replies where threadId = $1", id)
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    })
};

let texti = getPosts();
texti.then( data => {
  // console.log(texti);
  console.log(data);
  console.log(data[0].text);
});

let svar = getReplies(1);
svar.then( data => {
  console.log(data);
}).catch(e => { console.log(e); });

module.exports.getPosts;
module.exports.getReplies;
