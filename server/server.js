const express = require( "express" );
const app = express( );
const bodyParser = require( "body-parser" );
const movieController = require( "./Controller/Movie" );
const middleware = require( "./Middleware" );
const path = require( "path" );
const PORT = 3000;
const upload = middleware.getUpload( );
const URL = "http://localhost:" + PORT + "/";

var dir = path.join( __dirname, "uploads" );
app.use( express.static( dir ) );

middleware.accessClient( app );
middleware.setBodyParser( app, bodyParser );

app.get( "/", function( req, res ) {
    movieController.getMovies( res );
} );

app.post( "/create", upload.single( "cover" ), function( req, res ) {
    movieController.createMovie( res, req.body.name, req.body.year, URL + req.file.filename );
} );

app.post( "/read", function( req, res ) {
    movieController.readMovie( res, req.body.id );
} );

app.post( "/update", upload.single( "cover" ), function( req, res ) {
    let filename = null;
    
    if( req.file ){
        filename = URL + req.file.filename;
    } else if( req.body.img ) {
        filename = req.body.img;
    }

    movieController.updateMovie( res, req.body.id, req.body.name, req.body.year, filename );
} );

app.post( "/delete", function( req, res ) {
    movieController.deleteMovie( res, req.body.id );
} );

app.listen( PORT );