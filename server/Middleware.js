const accessClient = function( app ) {
    app.use( function( req, res, next ) {
        res.setHeader( "Access-Control-Allow-Origin", "http://127.0.0.1:8887" );

        res.setHeader( "Access-Control-Allow-Methods", "GET, POST" );
        
        res.setHeader( "Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization" );
        
        res.setHeader( "Access-Control-Allow-Credentials", true );

        next( );
    } );
}

const setBodyParser = function( app, bodyParser ) {
    app.use( bodyParser.json( ) );
    app.use( bodyParser.urlencoded( { extended: true } ) );
}

const getUpload = function( ) {
    var multer = require( "multer" );
    var storage = multer.diskStorage( {
        destination: function( req, file, cb ) {
            cb( null, "./uploads" );
        },
        filename: function( req, file, cb ) {
            let name = removeExtension( file.originalname );
            cb( null, name + "-" + Date.now( ) + "." + getExtension( file.originalname ) ); 
        }
    } );
    var upload = multer( { storage: storage } );
    return upload;
}

module.exports.accessClient = accessClient;
module.exports.setBodyParser = setBodyParser;
module.exports.getUpload = getUpload;

function getExtension( name ){
    var re = /(?:\.([^.]+))?$/;
    return re.exec( name )[ 1 ];
}

function removeExtension( name  ){
    var re = /(.*)\.[^.]+$/ ;
    return re.exec( name )[ 1 ];
}
