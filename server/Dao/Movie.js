const connectionString = require( "../Dao/Connection" ).connectionString;
const sql = require( "msnodesqlv8" );

const getMovies = function( ) {
    return new Promise( ( resolve, reject ) => {
        const query = "SELECT * FROM GET_MOVIES;";

        sql.query( connectionString, query, ( err, rows) => { 
            if( err ) {
                console.log( err );
                reject( err );
            }
            resolve( rows );
        } );
     } );
}

const createMovie = function( name, year, cover ) {
    return new Promise( ( resolve, reject ) => {
        sql.open( connectionString, function( err, conn ) {
            if( err ) {
                reject( err );
            }
            var pm = conn.procedureMgr();
            pm.callproc( "ADD_MOVIE", [ name, year, cover ], function( err, results, output ) {
                if( err ){
                    reject( err );
                }
                resolve( results );
            })
        } );
    } );
}

const readMovie = function( idMovie ) {
    return new Promise( ( resolve, reject ) => {
        const query = "SELECT * FROM READ_MOVIE( ? );";

        sql.query( connectionString, query, [ idMovie ], ( err, rows ) => {
            if( err ) {
                reject( err );
            }
        resolve( rows );
        } );

    } );
}

const updateMovie = function( id, name, year, cover ) {
    return new Promise( ( resolve, reject ) => {
        sql.open( connectionString, ( err, conn ) => {
            var pm = conn.procedureMgr( );
            if( err ) {
                reject( err );
            }
            pm.callproc( "UPDATE_MOVIE", [ id, name, year, cover ], function( err, results, output ) {
                if( err ) {
                    reject( err );
                }
                resolve( results );
            } );
        } );
    } );
}

const deleteMovie = function( idMovie ) {
    return new Promise( ( resolve, reject ) => {
        sql.open( connectionString, function( err, conn ){
            var pm = conn.procedureMgr();
            if( err ){
                reject( err );
            }
            pm.callproc( "DELETE_MOVIE", [ idMovie ], function( err, results, output ) {
                if( err ){
                    reject( err );
                }
                resolve( results );
            } );
         } );
    } );
}

module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.readMovie = readMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;