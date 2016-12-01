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

app.get('/:client/:year/:campaign',function(req,res){
	//build view data from params
	var obj = {};
	obj.client = req.params.client;
	obj.year = req.params.year;
	obj.campaign = req.params.campaign;
	var conceptslist = [];
	//BANNERS
	try{
		dirs = fs.readdirSync(__dirname + '/digital' + req.path)
		dirs = _.without(dirs,'.DS_Store','template.json')

		fs.readdir(__dirname + '/digital' + req.path + dirs[0],function(err,data){
			if(err){
				res.render('notfound',{
					object:{
						reqpath:req.path
					}
				})
			} else {
				data = data.filter(item => !(/(^|\/)\.[^\/\.]/g).test(item));
				obj.banners = data;
				var statics = _.every(data,function(banner){
					return (banner.indexOf('.jpg') || banner.indexOf('.png'))
				})
				if (statics){
					//remove extensions
					obj.banners = _.map(obj.banners,function(banner){
						return banner.split('.')[0];
					})
				}
				//to lower array
				obj.conceptView = false;
				obj.conceptlist = dirs;
				//if view param
				if(req.query.view){
					obj.view = req.query.view || data[0];
					obj.w = req.query.view.split('x')[0] 
					obj.h = req.query.view.split('x')[1] || data[0].split('x')[1];
					if(statics){
						var sizeWithExtension = _.find(data,function(banner){
							return banner.split('.')[0] === (req.query.view)
						})
						obj.path = req.path + dirs[0] + '/' + sizeWithExtension;
					} else {
						obj.path = req.path + dirs[0] + '/' + req.query.view;
					}
					obj.currentView = req.query.view;
				}
				else if(data.length > 0){
					obj.view = data[0];
					obj.w = data[0].split('x')[0].split('.')[0];
					obj.h = data[0].split('x')[1].split('.')[0];
					obj.path = req.path + dirs[0] + '/' + data[0];
				}
				res.render('campaign',{
					object:obj,
				})
			}
		})
	} catch(err){
		res.render('notfound',{
			object:{
				reqpath:req.path
			}
		})
	}
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
	try{
		fs.readdir(__dirname + '/digital' + req.path + '../',function(err,data){
			if(err){
				res.render('notfound',{
					object:{
						reqpath:req.path
					}
				})
			} else{
				var dirs = _.without(data,'.DS_Store','template.json');
				obj.conceptlist = dirs;
				fs.readdir(__dirname + '/digital' + req.path,function(err,data){
					data = _.without(data,'.DS_Store','template.json');
					obj.banners = data;
					var statics = _.every(data,function(banner){
						return (banner.indexOf('.jpg') || banner.indexOf('.png'))
					})
					if (statics){
						//remove extensions
						obj.banners = _.map(obj.banners,function(banner){
							return banner.split('.')[0];
						})
					}
					if(req.query.view){
						obj.view = req.query.view || data[0];
						obj.w = req.query.view.split('x')[0]; 
						obj.h = req.query.view.split('x')[1];
						if(statics){
							var sizeWithExtension = _.find(data,function(banner){
								return banner.split('.')[0] === (req.query.view)
							})
							obj.path = req.path + sizeWithExtension;
						} else {
							obj.path = req.path + req.query.view;	
						}
						obj.currentView = req.query.view;
					}
					else if(data.length > 0){
						obj.view = data[0];
						obj.w = data[0].split('x')[0].split('.')[0];
						obj.h = data[0].split('x')[1].split('.')[0];
						obj.path = req.path + data[0];
					}
					res.render('concept',{
						object:obj
					})
				});
			}
		})
	} catch(err){
		res.render('notfound',{
			object:{
				reqpath:req.path
			}
		})
	}
})

app.get('*',function(req,res){
	res.render('notfound',{
		object:{
			reqpath:req.path
		}
	})
})

app.listen(PORT,function(){
	console.log('listening on port: ' + PORT)
})