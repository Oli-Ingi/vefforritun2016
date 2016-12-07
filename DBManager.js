const pgp = require('pg-promise')();

const env = process.env.DATABASE_URL;
const db = pgp(env || 'postgres://forum:forum@localhost:5432/forum');


const getThreads = () => db.any('select * from threads');

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

const saveThread = thread =>
  db.one('INSERT INTO threads(threadName, author, text)'
         // eslint-disable-next-line no-template-curly-in-string
       + 'VALUES(${threadName}, ${author}, ${description}) returning id', thread);

const savePost = post =>
  db.one('INSERT INTO posts(threadId, postName, author, text) '
         // eslint-disable-next-line no-template-curly-in-string
       + 'VALUES(${threadId}, ${postName}, ${author}, ${text}) returning id', post);

const saveReply = reply =>
  db.one('INSERT INTO replies(postId, author, text)'
         // eslint-disable-next-line no-template-curly-in-string
       + 'VALUES(${postId}, ${author}, ${text}) returning id', reply);

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
