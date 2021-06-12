const express = require('express');
const posts = require('./data/data');
const fs = require('fs');
// require('ejs');
require('pug');

const app = express();

require('dotenv').config();
const port = process.env.PORT || 3000;

// app.set('view engine', 'ejs');
app.set('view engine', 'pug');
app.use(
  express.json(),
  express.urlencoded({ extended: false }),
  express.static(__dirname + '/public')
);

app.get('/', (req, res) => {
  // render `home.ejs` with the list of posts
  res.render('home', { posts: posts });
});

app.get('/post/:id', (req, res) => {
  // find the post in the `posts` array
  const post = posts.filter((post) => {
    return post.id == req.params.id;
  })[0];
  // render the `post.ejs` template with the post content
  res.render('post', {
    author: post.author,
    title: post.title,
    body: post.body,
  });
});

app.listen(port, () => {
  console.log({ posts });
  console.log(`Listening on port http://localhost:${port}`);
});
