const pgp = require('pg-promise')();

const db = pgp('postgres://forum:forum@localhost:5432/forum');

Thread (threadName, author, text, date = 0, id = 0) => {
  this.id = id;
  this.threadName = threadName;
  this.author = author;
  this.text = text;
  this.date = date;
}

Post (threadId, postName, author, text, id = 0, date = 0) => {
  this.id = id;
  this.threadId = threadId;
  this.postName = postName;
  this.author = author;
  this.text = text;
  this.date = date;
}

Reply (postId, author, text, id = 0, date = 0) => {
  this.id = id;
  this.postId = postId;
  this.author = author;
  this.text = text;
  this.date = date;
}

let getThreads = () => {
  return db.any("select * from threads")
    .then((data) => {
      return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    });
};

// returns an array of Post objects
let getPostsInThread = (threadId) => {
  return db.any("select * from posts where threadId = $1", threadId)
    .then((data) => {
      return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    });
};

let getRepliesInPost = (postId) => {
  return db.any("select * from replies where postId = $1", postId)
    .then((data) => {
        return data;
    })
    .catch((error) => {
        console.log("neibb");
        return "no";
    });
};

let saveThread = (thread) => {
  let threadName = thread.threadName,
      author = thread.author,
      text = thread.text;
  return db.none("INSERT INTO posts(threadId, postName, author, text) VALUES($1, $2, $3, $4);", [threadId, postName, author, text])
    .then((data) => {
        console.log("successful");
    })
    .catch((error) => {
        console.log("neibb");
    });
};

let savePost = (post) => {
  let threadId = post.threadId,
      postName = post.postName,
      author = post.author,
      text = post.text;
  return db.none("INSERT INTO posts(threadId, postName, author, text) VALUES($1, $2, $3, $4);", [threadId, postName, author, text])
    .then((data) => {
        console.log("successful");
    })
    .catch((error) => {
        console.log("neibb");
    });
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


// START OF TESTING
//---------------------------
let texti = getPostsInThread(1);
texti.then( data => {
  console.log(data);
  // console.log(data[0].text);
  // console.log(data[1].text);
});

// just to test the functions
let svar = getRepliesInPost(1);
svar.then( data => {
  console.log(data);
}).catch(e => { console.log(e); });


let reply = new Reply(1, "Mr. Bombastic", "this seems to work");
let insert = saveReply(reply);
insert.then( (data) => {
  console.log(data);
  console.log("virkar þetta");
});

let post = new Post(1, "this about bazookas", "Mr. Bombastic", "this text is describing things about using TNT instead of rockets.");
let insert2 = savePost(post);
insert2.then( () => {
  console.log("virkar þetta");
});



module.exports.Thread;
module.exports.Post;
module.exports.Reply;
module.exports.getThreads;
module.exports.getPostsInThread;
module.exports.getRepliesInPost;
module.exports.saveThread;
module.exports.savePost;
module.exports.saveReply;
