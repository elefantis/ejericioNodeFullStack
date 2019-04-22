function MovieListController( ) {
    const URL = "http://localhost:3000/";
    Llama.get( URL ).then( ( data ) => {
        const moviesContainer = document.getElementById( "moviesContainer" );
        moviesContainer.innerHTML = "";
        for( let i in data ) {
            let movie = data[ i ];
            // Create elemet for the movie
            let movieColumn = document.createElement( "div" );
            let movieContainer = document.createElement( "div" );
            let movieTitle = document.createElement( "h2" );
            let imgContainer = document.createElement( "div" );
            let movieImg = document.createElement( "img" );
            let movieText = document.createElement( "p" );
            // Set properties
            movieContainer.className = "movie";
            movieColumn.className = "movieColumn";
            movieTitle.innerHTML = movie.Title;
            movieImg.src = movie.Img;
            movieText.innerHTML = "<b>Year: </b>" + movie.Year;
            imgContainer.className = "imgContainer";
            // Append Elements
            movieContainer.appendChild( movieTitle );
            imgContainer.appendChild( movieImg );
            movieContainer.appendChild( imgContainer );
            movieContainer.appendChild( movieText );
            movieColumn.appendChild( movieContainer );
            moviesContainer.appendChild( movieColumn );
            // Draw the last border
            if( i === data.length - 1 ) {
                movieContainer.style.borderRight = "Solid 1px #081E65";
            }
        }
    } ).catch( ( error ) => {
        console.log( error );
    } );
}