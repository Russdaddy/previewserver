var express = require('express');
var app = express();
var hbs = require('express-handlebars');
var fs = require('fs');
var _ = require('underscore');
//static path for banners
var staticPath = 'clients';

//serve frontend js
app.use('/dist/js',express.static('dist/js'));
app.use('/dist/css',express.static('dist/css'));
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
		} else {
			//template object
			var obj = JSON.parse(data);
			//read directory to get sizes
			fs.readdir(__dirname + req.path,(err,data)=>{
				data = _.without(data,'.DS_Store','template.json')
				obj.banners = data;
				if(req.query.view){
					obj.view = req.query.view || data[0];
					obj.w = req.query.view.split('x')[0] 
					obj.h = req.query.view.split('x')[1] || data[0].split('x')[1];
					obj.path = req.path + req.query.view;
				}
				else{
					obj.view = data[0];
					obj.w = data[0].split('x')[0];
					obj.h = data[0].split('x')[1];
					obj.path = req.path + data[0];
				} 

				//render banner view
				res.render('banner',{
					json:obj,
				})
			})
		}
	})
})


app.listen(3000)