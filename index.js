var express = require('express');
var app = express();
var hbs = require('express-handlebars');
var fs = require('fs');
var _ = require('underscore');

var staticPath = 'clients';

//serve frontend js
app.use('/js',express.static('js'));
app.use('/css',express.static('css'));
//serve banners
app.use('/clients',express.static(staticPath));

//set views dir
app.set('views',__dirname + '/views')

//add and configure handlebars
app.engine('hbs',hbs({
	extname:'hbs',
	layoutsDir:__dirname + '/views'
}));
//set view engine to handlebars
app.set('view engine','hbs')

//on clients folder get
app.get('/clients/**',function(req,res){
	fs.readFile(__dirname + req.path + 'template.json','utf8',(err,data) =>{
		if(err){
			console.log(err)
			res.status(404)
			res.render('notfound',{
				page:req.path
			})
		} else{
			//template object
			var obj = JSON.parse(data);
			//read directory to get sizes
			fs.readdir(__dirname + req.path,(err,data)=>{
				data = _.without(data,'.DS_Store','template.json')
				obj.banners = {};
				//foreach banner size get w / h
				data.forEach((e,index)=>{
					obj.banners[e] = {
						width:e.split('x')[0],
						height:e.split('x')[1],
						// path:req.path.replace('/' + staticPath,'') + e
						path:req.path + e
					}
				})
				//render banner view
				res.render('banner',{
					json:obj
				})
			})
		}
	})
})


app.listen(3000)