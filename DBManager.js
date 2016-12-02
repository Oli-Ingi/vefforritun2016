const pgp = require('pg-promise')();

const env = process.env.DATABASE_URL;
const db = pgp(env || 'postgres://forum:forum@localhost:5432/forum');

const getThreads = () => db.any('select * from threads');

// returns an array of Post objects
const getPostsInThread = threadId =>
  db.any('select * from posts where threadid = $1 ', threadId);

const threadWithPosts = threadId =>
  db.task(t => t.batch([
    t.one('select * from threads where id = $1', threadId),
    t.any('select * from posts where threadid = $1', threadId),
  ]));

const postWithReplies = postId =>
  db.task(t => t.batch([
    t.one('select * from posts where id = $1', postId),
    t.any('select * from replies where postid = $1', postId),
  ]));


const getRepliesInPost = postId =>
  db.any('select * from replies where postid = $1', postId);

const getReply = replyId =>
  db.any('select * from replies where id = $1', replyId);

const saveThread = (thread) => 
  db.one('INSERT INTO threads(threadName, author, text) VALUES(${threadName}, ${author}, ${description}) returning id', thread);


const savePost = (post) =>
  db.one('INSERT INTO posts(threadId, postName, author, text) '
       + 'VALUES(${threadId}, ${postName}, ${author}, ${text}) returning id', post);

// reply has to have the properties postId, author and text.
// postId has to point to an id of a postId
// author and text can just be strings.
const saveReply = (reply) =>
  db.one('INSERT INTO replies(postId, author, text) VALUES(${postId}, ${author}, ${text}) returning id', reply);

module.exports = {
  getThreads,
  postWithReplies,
  threadWithPosts,
  getPostsInThread,
  getRepliesInPost,
  getReply,
  saveThread,
  savePost,
  saveReply,
};
