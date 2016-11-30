DROP TABLE IF EXISTS replies;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS threads;
CREATE TABLE threads(id serial PRIMARY KEY,
                    threadName varchar(64) not null,
                    author varchar(64) not null,
                    text text,
                    date timestamp with time zone not null default current_timestamp
);
CREATE TABLE posts(id serial PRIMARY KEY,
                  threadId integer references threads(id),
                  postName varchar(64) not null,
                  author varchar(64) not null,
                  text text,
                  date timestamp with time zone not null default current_timestamp
);
CREATE TABLE replies(id serial primary key,
                    postId integer references posts(id),
                    author varchar(64) not null,
                    text text,
                    date timestamp with time zone not null default current_timestamp
);
INSERT INTO threads(threadname, author, text) VALUES('Jokes', 'the joker', 'This thread is only for jokes!');
INSERT INTO threads(threadname, author, text) VALUES('Food', 'master Ch3f', 'all about delishious food');
INSERT INTO threads(threadname, author, text) VALUES('Gaming', 'pewdiepie', 'POWND EZ PZ! git gud N00B');
INSERT INTO threads(threadname, author, text) VALUES('Books', 'daNerdz007', 'only bookworms allowed here');
INSERT INTO threads(threadname, author, text) VALUES('Movies', 'imdb', 'movieFnatics, *spolier alert*');
INSERT INTO threads(threadname, author, text) VALUES('Science', 'Albert Einstein', 'the world is constantly changing, try to keep up');
INSERT INTO threads(threadname, author, text) VALUES('Bad dates', 'Casanova', 'we have all had that horrible date, share you story');
INSERT INTO threads(threadname, author, text) VALUES('Fitness', 'Arnold Schwarzenegger', 'while you are fooling around, someone out there is working hard and getting better.');
INSERT INTO posts(threadid, postname, author, text) VALUES(1, 'A telephone rang. "Hello! Is your phone number 444-4444?"', 'funnyGuy', '"Yes, it is," came the reply. "Thank Goodness! Could you call 911 for me? I super-glued my finger to the phone."');
INSERT INTO posts(threadid, postname, author, text) VALUES(1, 'tell me good jokes', 'lazy guy', 'tell me good jokes in the replies');
INSERT INTO posts(threadid, postname, author, text) VALUES(1, 'Give it to me, I''m soo wet give it to me!', 'dirty joker', 'She could scream all she wanted but the umbrella was mine.');
INSERT INTO posts(threadid, postname, author, text) VALUES(2, 'recipe for salmon', 'fishboy101', '1. GET FISH, 2. get pan, 3. ?????, 4. profit');
INSERT INTO posts(threadid, postname, author, text) VALUES(2, 'recipe for steak', 'fishboy101', '1. GET COW, 2. get pan, 3. ?????, 4. profit');
INSERT INTO posts(threadid, postname, author, text) VALUES(2, 'recipe for lasagne', 'fishboy101', '1. GET ITALIAN, 2. get pan, 3. ?????, 4. profit');
INSERT INTO posts(threadid, postname, author, text) VALUES(2, 'recipe for hot dogs', 'fishboy101', '1. GET DOG, 2. get pan, 3. ?????, 4. profit');
INSERT INTO posts(threadid, postname, author, text) VALUES(3, 'STARCRAFT', 'JaeDong', 'get better macro, win the game');
INSERT INTO posts(threadid, postname, author, text) VALUES(3, 'Rocket League', 'Kronovi', 'im the best, discuss');
INSERT INTO posts(threadid, postname, author, text) VALUES(4, 'lord of the rings', 'Dildo Swaggins', 'Im not a troll, I love little hobbits');
INSERT INTO posts(threadid, postname, author, text) VALUES(5, 'lord of the rings', 'Dildo Swaggins', 'the book is not as good as the movies... im not a troll.');
INSERT INTO posts(threadid, postname, author, text) VALUES(6, 'The Big Bang', 'Carl Sagan', 'Science is more then a body of knowledge, its a way of thinking, a way of sceptically interrogating the universe');
INSERT INTO posts(threadid, postname, author, text) VALUES(7, 'how I shit my pants when dating my crush', 'BadLuckBrian', 'I was on a date with a 10, when she started to tickle me and... I got diarrhea');
INSERT INTO posts(threadid, postname, author, text) VALUES(8, 'Rule nr 1', 'Arnold Schwarzenegger', 'Trust your self');
INSERT INTO replies(postid, author, text) VALUES(1, 'comedian', 'wow, thats really not funny man... I lost a finger in vietnam!');
INSERT INTO replies(postid, author, text) VALUES(1, 'jimmy Carr', 'dont be such a pussy man, you can use that finger as an earplug');
INSERT INTO replies(postid, author, text) VALUES(1, 'michael mcintyre', 'that is not ok man!');
INSERT INTO replies(postid, author, text) VALUES(2, 'American', 'What is the biggest city in the USA? Obesity!');
INSERT INTO replies(postid, author, text) VALUES(3, 'lonleyGuy', 'hahahahaha, are you a girl? can I have you myspace?');
INSERT INTO replies(postid, author, text) VALUES(4, 'realChef', 'I have to try that one');
INSERT INTO replies(postid, author, text) VALUES(5, 'realChef', 'I have to try that one');
INSERT INTO replies(postid, author, text) VALUES(6, 'realChef', 'I have to try that one');
INSERT INTO replies(postid, author, text) VALUES(7, 'realChef', 'I have to try that one');
INSERT INTO replies(postid, author, text) VALUES(8, 'Idra', 'I have the best macro... RAGEQUIT!');
INSERT INTO replies(postid, author, text) VALUES(8, 'Boxer', 'lol, 1v1 me man, ill PWN YOU');
INSERT INTO replies(postid, author, text) VALUES(9, 'Kronovi', 'no one can beat me');
INSERT INTO replies(postid, author, text) VALUES(9, 'Kronovi', 'for real... is no one gonna challenge me?');
INSERT INTO replies(postid, author, text) VALUES(10, 'goodGuyGreg', 'I totally agree, hobbits are cool');
INSERT INTO replies(postid, author, text) VALUES(11, 'PRESIDENT TRUMP', 'I am going to ban all movies that have mexicans in acting in them!');
INSERT INTO replies(postid, author, text) VALUES(12, 'Carl Sagan', 'if you are not able to ask sceptical questions, be sceptical of authority, then we''re up for grabs');
INSERT INTO replies(postid, author, text) VALUES(13, 'overly attached girlfriend', 'im still in love with you man');
INSERT INTO replies(postid, author, text) VALUES(14, 'Arnold Schwarzenegger', 'Rule nr 2... BREAK THE RULES');
