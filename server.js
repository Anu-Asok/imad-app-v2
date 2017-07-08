var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;

var config = {
  user:'anu-asok',
  host:'localhost',
  password:process.env.DB_PASSWORD,
  database:'anu-asok',
  port:'5432'
};

var pool = new Pool(config);

app.get('/test-db',function(){
  pool.query('select * from article',function(err,result){
    if(err){
      res.status(500).send(err.toString());
    }
    else{
      res.send(JSON.stringify(result));
    }
  });
});

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var counter=0;
app.get('/counter',function (req,res) {
  counter += 1;
  res.send(counter.toString());
});

app.get('/ui/:filename', function (req, res) {
  var file = req.params.filename;
  res.sendFile(path.join(__dirname, 'ui', file));
});

var articles={
  'article-one':{
    title:'Blog | Article one',
    heading:'Article one',
    date:'Sept 5 2016',
    content:`<p>
      <h4>What is Lorem Ipsum?</h4>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type
      specimen book. It has survived not only five centuries, but also the leap
      into electronic typesetting, remaining essentially unchanged. It was
      popularised in the 1960s with the release of Letraset sheets containing Lorem
      Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker
      including versions of Lorem Ipsum.
    </p>
    <p>
      <h4>Where does it come from?</h4>
      Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in
      a piece of classical Latin literature from 45 BC, making it over 2000 years old.
      Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked
      up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage,
      and going through the cites of the word in classical literature, discovered the
      undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
      Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This
      book is a treatise on the theory of ethics, very popular during the Renaissance.
      The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
      in section 1.10.32.
    </p>`
  },
  'article-two':{
    'title':'Blog | Article two',
    heading:'Article two',
    date:'Sept 10 2016',
    content:`
      <p>
        This is article two.
      </p>
    `
  }
};

function createTemplate(data){
  var htmlTemplate=`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${data['title']}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.10/semantic.min.css">
    </head>
    <body>
      <h1>${data.heading}</h1>
      ${data.date}
      <hr>
      <div class="ui justified container">
        ${data.content}
      </div>
    </body>
    </html>
  `;
  return htmlTemplate;
}

app.get('/articles/:articlename',function(req,res){
  var articleName=req.params.articlename;
  res.send(createTemplate(articles[articleName]));
});

app.get('/articles/GST/part-1',function(req,res){
  res.send("Article thre will be served here!");
});

var names=[];
app.get('/submit-name',function (req,res) {
  var name = req.query.name;
  names.push(name);
    res.send(JSON.stringify(names));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
