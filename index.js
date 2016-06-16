

var sessionSecret = "12345",
    Promise = require('es6-promise').Promise,
    mongo = require('mongodb'),
    mongoClient = mongo.MongoClient,
    url = process.argv[2] || "mongodb://localhost:27017/notes",
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    stylus = require('stylus'),
    bodyparser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session      = require('express-session'),
    flash        = require('req-flash'),

    // the port this app will be listening on
    port = process.argv[3] || 3000,

    // this has to be the fully-qualified path to a folder, typically "/public",
    // where public/static assets will be served from
    absolutePathToPublicAssets = path.join(__dirname, 'public'),

    // this has to be the fully-qualified path to a folder, typically "/templates",
    // where view templates will be found
    absolutePathToViewFolder = path.join(__dirname, 'views'),
    db = null,
    app = express(),
    startupPromise = new Promise(function(fulfill,reject){

        mongoClient.connect(url, function(err, database) {
            if(err){
                console.log("err while connecting to db: " + err);
                reject(err);
            }

            console.log("Connected succesfully to mongo at " + url);
            fulfill(database);
        });

    }).then(function(database){
        db = database;
        console.log('listening on port ' + port);
        app.listen(port);
    }).catch(function(error){
        console.log("Got this error starting up: " + error);
        process.exit();
    });

app.use(cookieParser());
app.use(session({ secret: sessionSecret }));
app.use(flash());
app.use(bodyparser.urlencoded({extended: false}));
app.use(express.static(absolutePathToPublicAssets));
app.use(stylus.middleware(absolutePathToPublicAssets));

var Note = function(params){
    params = params || {};
    this._id = typeof params._id === 'string' ? new mongo.ObjectID(params._id) : null;
    this.title = typeof params.title === 'string' ? params.title : null;
    this.body = typeof params.body === 'string' ? params.body : null;
}

function flashMessage(req,msg,level){
    if(!req) throw new Error("cannot flash w/o request");
    if(!msg) throw new Error("cannot flash w/o a msg");

    level = typeof level === 'string' ? level.toLowerCase() : "info";
    if(level !== 'success' && level !== 'info' && level !== 'warning' && level !== 'danger') 
        throw new Error("Level must be info,warning, or error");

    req.flash(level,msg);
}
function flashRedirect(req,res,url,msg,level){
    if(!res) throw new Error("Cannot redirect w/o a response object");
    if(!url) throw new Error("Cannot redirect w/o a url");
    flashMessage(req,msg,level);
    res.redirect(url);
}

// enable jade templates
app.set('views', absolutePathToViewFolder);
app.set('view engine', 'jade');

app.get('/', function(req,res){
    console.log("get /");

    var flash = req.flash();
    console.log("Flash is: " + JSON.stringify(flash));

    new Promise(function(fulfill,reject){
        db.collection('notes').find().sort({created:-1}).toArray(function(err,results){
            if(err)
                reject(err);
            else
                fulfill(results);
        });
    }).then(function(notes){
        res.render('index', {notes: notes, flash: flash, date: new Date().toDateString()});
    }).catch(function(err){
        flash.danger = err;

        res.render('index', {notes: null, flash: flash, date: new Date().toDateString()});
    });
});
app.get('/scratch', function(req,res){
    console.log("get /scratch");
    res.render('scratch');
});
app.get('/note', function(req,res){
    console.log("get /note");
    res.render('note');
});
app.post("/note/:id", function(req,res){
    console.log("updating note with id " + req.params.id);
    db.collection("notes").findOneAndUpdate({
        _id: new mongo.ObjectID(req.params.id)
    }, {
        '$set': {
            title: req.body.title,
            body: req.body.body
        }
    }).then(function(result){
        console.log("successfully updated");
        console.log(JSON.stringify(result));
        flashRedirect(req,res,"/", "Success updating", "success");
    }).catch(function(err){
        flashRedirect(req,res,"/", "Error updating: " + err, "danger");
    });
});
app.post('/note', function(req,res){
    if(!req.body){
        console.error("foo!?");
        // flash an error and redirect
        res.redirect("/note");
    }

    var title = req.body.title || '',
        body = req.body.body || '',
        collection = db.collection('notes');

    if(!title || !body)


    console.log("Got title: " + title);
    console.log("Got body: " + body);
    new Promise(function(fulfill,reject){
        collection.insert({
            title:title,
            body:body,
            created: new Date()
        }, function(err, result) {
            if(err)
                reject(err);
            else
                fulfill(result);
        })
    }).then(function(result){
        var id = result.insertedIds[0];
        console.log("created new note (" + id + ")");
        flashRedirect(req,res,"/","created new note (" + id + ")",'success');
    }).catch(function(err){
        console.log("got this err: " + err);
        flashRedirect(req,res,"/","got this error: " + err, "danger");
    });
});
app.get("/note/:id", function(req,res){
    console.log("Editing note " + req.params.id);
    new Promise(function(fulfill,reject){
        db.collection("notes").find({_id: new mongo.ObjectID(req.params.id)}).limit(1).next(function(err,note){
            if(err)
                reject(err);
            else
                fulfill(note);
        });
    }).then(function(note){
        res.render("note", {note: note});
    }).catch(function(err){
        flashRedirect(req,res,"/","got this error: " + err, "danger");
    });
});


