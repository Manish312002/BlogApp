import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

let posts = [
    { id: 1, title: 'First Post', content: 'This is the content of the first post.', author:'AIComp' }  
];

app.get('/',(req,res)=>{
    res.render("home.ejs",{posts:posts});
    console.log(posts.length)
})

app.get('/post',(req,res)=>{
    res.render("post.ejs");
})

app.post('/ret',(req,res)=>{
    const newPost = {
        id : posts.length+1,
        title : req.body["title"],
        author : req.body["author"],
        content : req.body["content"]
    }
    console.log(newPost);
    posts.push(newPost)
    res.redirect('/')
})

app.get('/delete',(req,res)=>{
    res.render("delete.ejs");
})

app.post('/del',(req,res)=>{
    const post_id = (parseInt(req.body['id'],10 ))
    posts = posts.filter(post => post.id !== post_id)
    res.redirect('/')
})

app.get('/edit/:id', (req, res) => {
    const postId = parseInt(req.params.id, 10);
    const post = posts.find(p => p.id === postId);
    if (post) {
        res.render('edit.ejs', { post: post });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/edit', (req, res) => {
    const postId = parseInt(req.body.id, 10);
    const updatedPost = {
        id: postId,
        title: req.body.title,
        author: req.body.author,
        content: req.body.content
    };

    // Find and update the post
    posts = posts.map(post => post.id === postId ? updatedPost : post);
    res.redirect('/');
});

app.get('/about',(req,res)=>{
    res.render('about.ejs')
})

app.listen(port,()=>{
    console.log("The port is connected... : http://localhost:"+port)
})