const pages = {
    "home": {
        template: "../app/templates/movieList.html",
        controller: MovieListController
    },
    "form": {
        template: "../app/templates/movieForm.html",
        controller: MovieFormController
    },
}

Llama.init( pages );
Llama.setDefault( "home" );