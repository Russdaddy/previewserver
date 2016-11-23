var express = require('express');
var app = express();
var ejs = require('ejs');
var fs = require('fs');
var _ = require('underscore');
var send = require('send');
var appendQuery = require('append-query');

var PORT = process.env.PORT || 3000;

//serve banners as static files
app.use('/',express.static(__dirname + '/digital'));
// app.use('/2017',express.static(__dirname + '/2017'));

//serve frontend static files
app.use('/dist/js',express.static('dist/js'));
app.use('/dist/css',express.static('dist/css'));
app.use('/dist/img',express.static('dist/img'));
//serve banners

//set views dir
app.set('views',__dirname + '/views')

//set view engine to ejs
app.set('view engine','ejs');

app.get('/',function(req,res){
	res.render('notfound',{
		object:{}
	})
})

app.get('/:client/:year/:campaign',function(req,res){
	//build view data from params
	var obj = {};
	obj.client = req.params.client;
	obj.year = req.params.year;
	obj.campaign = req.params.campaign;
	var conceptslist = [];

	// console.log('CAMPAIGN VIEW')

	dirs = fs.readdirSync(__dirname + '/digital' + req.path)
	dirs = _.without(dirs,'.DS_Store','template.json')
	// dirs = _.map(dirs,function(dir){
	// 	return dir.toUpperCase();
	// })

	fs.readdir(__dirname + '/digital' + req.path + dirs[0],function(err,data){
		data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
		obj.banners = data;
		//to lower array
		obj.conceptView = false;
		obj.conceptlist = dirs;
		//if view param
		if(req.query.view){
			obj.view = req.query.view || data[0];
			obj.w = req.query.view.split('x')[0] 
			obj.h = req.query.view.split('x')[1] || data[0].split('x')[1];
			obj.path = req.path + dirs[0] + '/' + req.query.view;
		}
		else{
			obj.view = data[0];
			obj.w = data[0].split('x')[0];
			obj.h = data[0].split('x')[1];
			obj.path = req.path + dirs[0] + '/' + data[0];
		}
		res.render('campaign',{
			object:obj,
		})
	})
})

function toProperCase(){	
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

//CONCEPT SPECIFIC ENDPOINT
app.get('/:client/:year/:campaign/:concept',function(req,res){
	//build view data from params
	var obj = {};
	obj.year = req.params.year;
	obj.client = req.params.client;
	obj.campaign = req.params.campaign;
	obj.concept = req.params.concept;
	obj.currentConcept = req.params.concept;

	// console.log('CONCEPT VIEW')

	fs.readdir(__dirname + '/digital' + req.path + '../',function(err,data){
		if(err){
			res.render('notfound',{
				object:obj
			})
		} else{
			var dirs = _.without(data,'.DS_Store','template.json');
			obj.conceptlist = dirs;
			fs.readdir(__dirname + '/digital' + req.path,function(err,data){
				data = _.without(data,'.DS_Store','template.json');
				obj.banners = data;
				// obj.conceptlist = _.map(obj.conceptlist,function(concept){
				// 	return concept.toUpperCase();
				// })
				if(req.query.view){
					obj.view = req.query.view || data[0];
					obj.w = req.query.view.split('x')[0] 
					obj.h = req.query.view.split('x')[1] || data[0].split('x')[1];
					obj.path = req.path + req.query.view;
					obj.currentView = req.query.view;
				}
				else{
					obj.view = data[0];
					obj.w = data[0].split('x')[0];
					obj.h = data[0].split('x')[1];
					obj.path = req.path + data[0];
				}
				res.render('concept',{
					object:obj
				})
			});
		}
	})
})

app.listen(PORT,function(){
	console.log('listening on port: ' + PORT)
})