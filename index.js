const express= require('express');
const app = express();
const nunjucks=require('nunjucks');
const axios = require('axios');
const path = require('path');

const env = nunjucks.configure('views', {
    autoescape:true,
    express:app,
    watch:true
});

env.addGlobal('BASE_URL', 'http://localhost:3000/');

app.use(express.static(path.resolve(__dirname,'public')));

app.set('view engine', 'njk');

app.get('/',(req, res)=>{
    res.render('home');
})

app.get('/livros', async (req, res)=>{
    const { data:livros } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${req.query.busca}`)
    
    res.render('livros', {livros})
})

app.get('/livro/:id', async (req, res)=>{
    const { data:livro} = await axios.get(`https://www.googleapis.com/books/v1/volumes/${req.params.id}`)
  
    res.render('livro', {livro: livro.volumeInfo});
})

app.listen(3000);