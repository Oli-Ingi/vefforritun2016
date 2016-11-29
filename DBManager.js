const pgp = require('pg-promise')();

const db = pgp('postgres://forum:forum@localhost:5432/forum');

function Thread(threadName, author, text, date = 0, id = 0) {
  this.id = id;
  this.threadName = threadName;
  this.author = author;
  this.text = text;
  this.date = date;
}

function Post(threadId, postName, author, text, id = 0, date = 0) {
  this.id = id;
  this.threadId = threadId;
  this.postName = postName;
  this.author = author;
  this.text = text;
  this.date = date;
}

function Reply(postId, author, text, id = 0, date = 0) {
  this.id = id;
  this.postId = postId;
  this.author = author;
  this.text = text;
  this.date = date;
}

const getThreads = () => db.any('select * from threads');


// returns an array of Post objects
const getPostsInThread = threadId =>
  db.any('select * from posts where threadId = $1', threadId)
    .then(data => data)
    .catch((error) => {
      console.log('neibb');
      return error;
    });

const getRepliesInPost = postId =>
  db.any('select * from replies where postId = $1', postId)
    .then(data => data)
    .catch((error) => {
      console.log('neibb');
      return error;
    });

const saveThread = (thread) => {
  const threadName = thread.threadName;
  const author = thread.author;
  const text = thread.text;
  return db.none('INSERT INTO threads(threadName, author, text) VALUES($1, $2, $3);', [threadName, author, text])
    .then((data) => {
      console.log('successful');
      console.log(data);
    })
    .catch((error) => {
      console.log('neibb');
      console.log(error);
    });
};

const savePost = (post) => {
  const threadId = post.threadId;
  const postName = post.postName;
  const author = post.author;
  const text = post.text;
  return db.none('INSERT INTO posts(threadId, postName, author, text) VALUES($1, $2, $3, $4);', [threadId, postName, author, text])
  .then((data) => {
    console.log('successful');
    console.log(data);
  })
  .catch((error) => {
    console.log('neibb');
    console.log(error);
  });
};

// reply has to have the properties postId, author and text.
// postId has to point to an id of a postId
// author and text can just be strings.
const saveReply = reply => {
  const postId = reply.postId;
  const author = reply.author;
  const text = reply.text;
  console.log("-----------------------------");
  console.log(postId);
  console.log(author);
  console.log(text);
  console.log("-----------------------------");
  return db.none('INSERT INTO replies(postId, author, text) VALUES($1, $2, $3);', [postId, author, text])
    .then((data) => {
      console.log('successful');
      console.log(data);
    })
    .catch((error) => {
      console.log('neibb');
      // console.log(error);
    });
};


// START OF TESTING
//---------------------------
const texti = getPostsInThread(1);
texti.then((data) => {
  console.log(data);
});

// just to test the functions
const svar = getRepliesInPost(1);
svar.then((data) => {
  console.log(data);
}).catch((e) => { console.log(e); });

const thread = new Thread('this about bazookas', 'Mr. Bombastic', 'this text is describing things about using TNT instead of rockets.');
const insert3 = saveThread(thread);
insert3.then(() => {
  console.log('virkar þetta');
});
//
const post = new Post(1, 'this about bazookas', 'Mr. Bombastic', 'this text is describing things about using TNT instead of rockets.');
const insert2 = savePost(post);
insert2.then(() => {
  console.log('virkar þetta');
});

const reply = new Reply(1, 'Mr. Bombastic', 'this seems to work');
const insert = saveReply(reply);
insert.then((data) => {
  console.log(data);
  console.log('virkar þetta');
});


module.exports = {
  Thread,
  Post,
  Reply,
  getThreads,
  getPostsInThread,
  getRepliesInPost,
  saveThread,
  savePost,
  saveReply,
};
