const movieDao = require( "../Dao/Movie" );

const getMovies = function( res ) {
    movieDao.getMovies( ).then( ( data ) => {
        console.log( data );
        res.status( 200 ).send( data );
    } ).catch( ( error ) => {
        console.log( error );
        res.status( 500 ).send( error );
    } );
}

const createMovie = function( res, title, year, cover ) {
    movieDao.createMovie( title, year, cover ).then( ( data ) => {
        res.status( 200 ).send( { message: "ok" } );
    } ).catch( ( error ) => {
        res.status( 500 ).send( error );
    } );
}

const readMovie = function( res, idMovie ) {
    movieDao.readMovie( idMovie ).then( ( data ) => {
        res.status( 200 ).send( data );
    } ).catch( ( error ) => {
        res.status( 500 ).send( error );
    } );
}

const updateMovie = function( res, idMovie, title, year, cover ) {
    movieDao.updateMovie( idMovie, title, year, cover ).then( ( data ) => {
        res.status( 200 ).send( { message: "ok" } );
    } ).catch( ( error ) => {
        res.status( 500 ).send( error );
    } );
}

const deleteMovie = function( res, idMovie ) {
    movieDao.deleteMovie( idMovie ).then( ( data ) => { 
        res.status( 200 ).send( data );
    } ).catch( ( error ) => {
        res.status( 500 ).send( error );
    } );
}

module.exports.getMovies = getMovies;
module.exports.createMovie = createMovie;
module.exports.readMovie = readMovie;
module.exports.updateMovie = updateMovie;
module.exports.deleteMovie = deleteMovie;