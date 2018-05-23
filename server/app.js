const bodyParser = require('body-parser'),
mongoose         = require('mongoose'),
express          = require('express'),
path             = require('path'),
app              = express();

//app config
mongoose.connect('mongodb://localhost/restful_blog');
app.set('view engine', 'ejs');  //allows us to use EJS and also not have to type .EJS
app.use(express.static(__dirname + '../client/dist'));
app.use(bodyParser.urlencoded({extended: true}));

//mongoose model config
var blogSchema = new mongoose.Schema({
  title: String,
  image: {type: String, default: 'placeholderimage.jpg'},
  body: String,
  created: {type: Date, default: Date.now}
})
var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
//   title: 'Test Blog',
//   image: 'https://images.unsplash.com/photo-1514828260103-1e9bf9a58446?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f36a98f5f1b150a523b924915c1544a5&auto=format&fit=crop&w=1050&q=80',
//   body: 'test blog post'
// })

//RESTful routes

app.get('/', (req, res) => {
  res.redirect('/blogs');
})
//  index route. Displays a list of all blogs
app.get('/blogs', (req, res) => {
  // res.render('../client/src/views/index');
  Blog.find({}, (err, allBlogs) => {
    if(err){
      console.log('err')
    } else {
      res.render('../client/src/views/index', {blogs: allBlogs});
    }
  });
});

// create route. Add new blog post to DB.
// app.post('/blogs', (req, res) => {
//   var title = req.body.title;
//   var image = req.body.image;
//   var body = req.body.body;
//   var created = req.body.created;
//   var newBlogPost = {title: title, image: image, body: body, created: created}
//   // create a new company and save to db
//   Blog.create(newBlogPost, (err, newlyCreated) => {
//     if(err) {
//       console.log('err');
//     } else {
//       // redirect back to the companies page
//       res.redirect('/blogs');
//     }
//   });
// });

// new route. Displays form to make a new blog post
// app.get('/blogs/new', (req, res) => res.render('../client/src/views/new.ejs'));

// //show route. shows more info about one blog post
// app.get('/blogs/:id', (req, res) => {
//   Blog.findById(req.params.id, (err, foundBlog) => {
//     if(err) {
//       console.log(err);
//     } else {
//       res.render('../client/src/views/show', {company: foundBlog});
//     }
//   });
// })

app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.listen(5000, () => console.log('glasskey server is listening on port 5000!'));