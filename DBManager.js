const pgp = require('pg-promise')();

const db = pgp('postgres://forum:forum@localhost:5432/forum');

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
  db.any('select * from posts where threadid = $1', threadId);

const threadWithPosts = threadId =>
  db.task(t => {
    return t.batch([
      t.one('select * from threads where id = $1', threadId),
      t.any('select * from posts where threadid = $1', threadId)
    ]);
  });

const postWithReplies = postId =>
  db.task(t => {
    return t.batch([
      t.one('select * from posts where id = $1', postId),
      t.any('select * from replies where postid = $1', postId)
    ]);
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
  const text = thread.description;
  return db.one('INSERT INTO threads(threadName, author, text) VALUES($1, $2, $3) returning id', [threadName, author, text]);
};

const savePost = (post) => {
  const threadId = post.threadId;
  const postName = post.postName;
  const author = post.author;
  const text = post.text;
  return db.one('INSERT INTO posts(threadId, postName, author, text) VALUES($1, $2, $3, $4) returning id', [threadId, postName, author, text]);
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
  return db.one('INSERT INTO replies(postId, author, text) VALUES($1, $2, $3) returning id', [postId, author, text]);
};


// START OF TESTING
//---------------------------
const texti = getPostsInThread(1);
texti.then((data) => {
  console.log("--");
});

// just to test the functions
const svar = getRepliesInPost(1);
svar.then((data) => {
  console.log("--");
}).catch((e) => { console.log(e); });

/*
const thread = new Thread('this about bazookas', 'Mr. Bombastic', 'this text is describing things about using TNT instead of rockets.');
const insert3 = saveThread(thread);
insert3.then((data) => {
  console.log(data.id);
  console.log('virkar að vista Thread');
});

const post = new Post(1, 'this about bazookas', 'Mr. Bombastic', 'this text is describing things about using TNT instead of rockets.');
const insert2 = savePost(post);
insert2.then((data) => {
  console.log(data.id);
  console.log('virkar að vista post');
});

const reply = new Reply(1, 'Mr. Bombastic', 'this seems to work');
const insert = saveReply(reply);
insert.then((data) => {
  console.log(data.id);
  console.log('virkar að vista reply');
});
*/

module.exports = {
  Post,
  Reply,
  getThreads,
  threadWithPosts,
  getPostsInThread,
  getRepliesInPost,
  saveThread,
  savePost,
  saveReply,
};
