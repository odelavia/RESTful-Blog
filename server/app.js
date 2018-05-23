const bodyParser = require('body-parser'),
mongoose         = require('mongoose'),
express          = require('express'),
path             = require('path'),
app              = express();

//app config
mongoose.connect('mongodb://localhost/restful_blog');
app.set('view engine', 'ejs');
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

//RESTful routes


app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));
app.listen(5000, () => console.log('glasskey server is listening on port 5000!'));