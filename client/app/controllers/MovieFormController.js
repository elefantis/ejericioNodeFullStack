function MovieFormController( ) {
    var _fileSelector = document.getElementById( "imgSelector" );
    var _previewImage = document.getElementById( "imgPreview" );
    var _btnCreate = document.getElementById( "btnCreate" );
    var _btnRead = document.getElementById( "btnRead" );
    var _btnUpdate = document.getElementById( "btnUpdate" );
    var _btnDelete = document.getElementById( "btnDelete" );
    var _file = null;
    const URL = "http:///localhost:3000/", DANGER = 0, SUCCESS = 1;

    const _previewFile = function() {
        var reader = new FileReader( );
        _file = _fileSelector.files[ 0 ];

        reader.addEventListener( "load", function( e ) {
            _previewImage.src = reader.result;
        }, false );

        if( _file ) {
            reader.readAsDataURL( _file );
        }
    }

    _fileSelector.addEventListener( "change", function( e ) {
        _previewFile( );
    }, false ); 

    _btnCreate.addEventListener( "click", function( e ) {
        window.scrollTo( 0, 0 );
        Llama.post( URL + "create", {
            name: document.getElementById( "txtName" ).value,
            year: document.getElementById( "txtYear" ).value,
            cover: _file
        }, 1 ).then( ( data ) => {
            window.scrollTo( 0, 0 );
            showAlert( "Película Guardada", SUCCESS );
            clear( );
        } ).catch( ( error ) => {
            showAlert( "No se pudo guardar la película" );
        } );
    }, false );

    _btnRead.addEventListener( "click", function( e ) {
        window.scrollTo( 0, 0 );
        Llama.post( URL + "read", {
            id: document.getElementById( "txtId" ).value
        } ).then( ( data ) => {
            showAlert( "Película Encontrada", SUCCESS );
            data = data[ 0 ];
            document.getElementById( "txtName" ).value = data.Title;
            document.getElementById( "txtYear" ).value = data.Year;
            _previewImage.src = data.Img;
        } ).catch( ( error ) => {
            showAlert( "No se pudo buscar la película" );
        } );
    }, false );

    _btnUpdate.addEventListener( "click", function( e ) {
        window.scrollTo( 0, 0 );
        Llama.post( URL + "update", {
            id: document.getElementById( "txtId" ).value,
            name: document.getElementById( "txtName" ).value,
            year: document.getElementById( "txtYear" ).value,
            cover: _file,
            img: _previewImage.src
        }, 1 ).then( ( data ) => {
            showAlert( "Película actualizada", SUCCESS );
            clear();
        } ).catch( ( error ) => {
            showAlert( "No se pudo actualizar la película" );
        } );
     }, false );

     _btnDelete.addEventListener( "click", function( e ) {
        window.scrollTo( 0, 0 );
        Llama.post( URL + "delete", {
            id: document.getElementById( "txtId" ).value
        } ).then( ( data ) => {
            showAlert( "Película eliminada", SUCCESS );
            clear();
        } ).catch( ( error ) => {
            showAlert( "No se pudo eliminar la película" );
        } );
     }, false );

    const clear = function( ) {
        document.getElementById( "txtId" ).value = "";
        document.getElementById( "txtName" ).value = "";
        document.getElementById( "txtYear" ).value = "";
        _previewImage.src = "";
    }

    const showAlert = function( message, type ) {
        let alert = document.getElementById( "alert" );
        let alertType = DANGER;
        alert.style.display = "block";
        if( type ) {
            alertType = type;
        }
        if( alertType === DANGER ) {
            alert.className = "alert-danger";
        } else if ( alertType === SUCCESS ) {
            alert.className = "alert-success";
        }
        alert.innerHTML = message;
    }
}