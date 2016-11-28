const pgp = require('pg-promise')();

const db = pgp('postgres://Wolfster:asdf@localhost:5432/forum');



let getPosts = () => {
  let postData;
  return db.any("select * from threads")
    .then((data) => {
      return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    })

};

let getReplies = (id) => {
  return db.any("select * from replies where postId = $1", id)
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    })
};

// reply has to have the properties postId, author and text.
// postId has to point to an id of a postId
// author and text can just be strings.
let saveReply = (reply) => {
  let postId = reply.postId,
      author = reply.author,
      text = reply.text;
  return db.none("INSERT INTO replies(postId, author, text) VALUES($1, $2, $3);", [postId, author, text])
    .then((data) => {
        console.log("successful");
    })
    .catch((error) => {
        console.log("neibb");
    })
};


// Just to test the functions
let texti = getPosts();
texti.then( data => {
  // console.log(texti);
  console.log(data);
  // console.log(data[0].text);
  // console.log(data[1].text);
});

// just to test the functions
let svar = getReplies(1);
svar.then( data => {
  console.log(data);
}).catch(e => { console.log(e); });


let reply = {
  postId: 1,
  author: "Mr. Bombastic",
  text: "well GTA is amazing..."
}

let insert = saveReply(reply);
insert.then( (data) => {
  console.log(data);
  console.log("virkar þetta");
});

module.exports.getPosts;
module.exports.getReplies;
module.exports.saveReply;
