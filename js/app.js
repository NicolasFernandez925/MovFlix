
window.onload = () => {

        OcultarPreLoader()
        
        // ? ----- -----  Instancias. ----- -----
        const movieDb = new MovieDB();
        const ui = new Interfaz();
     
        const inputSearch = document.getElementById('text-search');
        const divSearch = document.getElementById('divSearch');
        const peliculasSimilares = document.getElementById('resultado-2');
        const fila = document.querySelector('.contenedor-carousel');
        const flechaIzquierda = document.getElementById('flecha-izquierda');
        const flechaDerecha = document.getElementById('flecha-derecha');
        const iconSearch = document.querySelector('.icon-search');
        const contenedor_search = document.querySelector('.contenedor-resultados-buscador');
        // ? ----- ----- Variables Modal. ----- -----
        const cerrar = document.querySelector(".cerrar-x");
        const modalContenido = document.querySelector(".content-modal");
        const modalContainer = document.querySelector(".modal-contenedor");
        const imagenModal = document.querySelector('.img-movie');
    
        // ? ----- -----  Cargo todas las películas de estreno. ----- -----
        ProximosExtrenos()

        // ? ----- ----- Event para desplegar el input de busqueda. ----- -----
        iconSearch.addEventListener('click', (e) => {
        
            e.preventDefault(); 
            contenedor_search.classList.toggle('active'); 
           
            if(contenedor_search.className.includes('active')) {
                iconSearch.classList.remove("fas","fa-search");
                iconSearch.classList.add("fas","fa-times");                
            } 
            else{
                iconSearch.classList.remove("fas","fa-times");
                iconSearch.classList.add("fas","fa-search");
            }         
            if(divSearch.childElementCount > 1 ){
                divSearch.style.display = "none";
            }
                        
         });
          
        // ? ----- ----- Event que se dispara cuando apretas la tecla ENTER y se busacan los resultados. ----- -----

        document.body.addEventListener("keypress", (e) => {

           if(e.keyCode == 13 && inputSearch.value != '') {
                const searchResult = inputSearch.value;
                
                iconSearch.classList.remove("fas","fa-times");
                iconSearch.classList.add("fas","fa-search");     
                contenedor_search.classList.toggle('active'); 
                MostrarPeliculas(searchResult);
               
            }
           
        });


        // ? ----- ----- Event Listener para detectar que boton se dio click muestro los detalles de la películas que selecciono. 
        //  Los datos son traídos de la API. ----- -----

        document.body.addEventListener('click', e => {   
            e.preventDefault();
            if(e.target.id === 'btnMore'){

                const idPelicula = e.target.value; 
               // ui.LimpiarDivImgBanner();
                TraerPeliculaSeleccionada(idPelicula);
                
            
            }

        // ? ----- -----  Event cuando le doy click alguna pelicula en el buscador. ----- -----
        if(e.target.className === 'movie-selected'){
            const idPeliculaSeleccionada = e.target.value; 
            movieDb.ObtenerPeliculaAPI(idPeliculaSeleccionada)
                .then( pelicula  => {
                         
                    contenedor_search.classList.remove('active');
                    iconSearch.classList.remove("fas","fa-times");
                    iconSearch.classList.add("fas","fa-search");
                    window.scrollTo({
                        top:424,
                        behavior: 'smooth'
                    });
                    divSearch.style.display = "none";
                    inputSearch.value = "";
                    peliculasSimilares.innerHTML = '';
                         
                    // Compruebo que haya almenos 1 poster
                    let img_backdrops = (pelicula.objetosApis[3].backdrops.length > 0) ? pelicula.objetosApis[3].backdrops[0] : ''; 
                    ui.LimpiarResultados()
                    ui.MostrarDetallePelicula(pelicula.objetosApis[0],pelicula.objetosApis[2].results, img_backdrops);        
                    ui.MostrarPeliculasSimilares(pelicula.objetosApis[1]);                     
                });
            }
        });

        // ? ----- -----  Event cuando ingreso algun texto en el campo de búsqueda. ----- -----
        inputSearch.addEventListener('keyup', debounce((event) => {       
            const palabraClave = event.target.value;
            console.log(palabraClave)
            if(palabraClave !== ""){
                movieDb.BuscarPeliculaClave(palabraClave)
                    .then( data => {    
                        divSearch.style.display = "block";                                      
                        ui.LimpiarResultadosDivSearch();
                        ui.MostrarResultadosDeBusquedaEnElInput(data);            
                    });
            }
            else{
                 divSearch.style.display = "none";
            }            
        }, 500));
         
        
        // ? ----- ----- Event al hacer click en una imagen la amplía. ----- -----       
        document.body.addEventListener('click', e => {
          
            if(e.target.classList.contains( 'img-open' )){          
                const imagenes = document.querySelectorAll('.img-open');          
                imagenes.forEach( img  => {
                 
                    // ? ----- ----- Event para abrir el modal con la imagen que se dio click. ----- -----
                    img.addEventListener('click', (e) => {
                        e.stopPropagation();    
                        const rutaImg = e.target.getAttribute('src');
                        imagenModal.setAttribute("src", rutaImg);
                        modalContainer.style.opacity = "1";
                        modalContainer.style.visibility = "visible";
                        modalContenido.classList.toggle('modal-close');     
                    });
                });
            }               
        });      
         
        // ? ----- -----  Event para cerrar el modal . ----- -----                
        cerrar.addEventListener('click', e => {
            
            modalContenido.classList.toggle('modal-close');   
            setTimeout( function() {
                modalContainer.style.opacity = "0";
                modalContainer.style.visibility = "hidden";
            },600);
         
        });
         
        // ? ----- -----  Event paara cuando da click en cualquier lado de la pantalla se cierra el modal . ----- ----- 
        window.addEventListener('click', e =>{        
            e.preventDefault();
            if(e.target == modalContainer){   
                modalContenido.classList.toggle('modal-close'); 
               
                setTimeout( () =>{
                    modalContainer.style.opacity = "0";
                    modalContainer.style.visibility = "hidden";
                },900);    
            }     
        });
               
        // ? ----- -----  Event al hacer scroll aparece el icono UP con una funcion debounce para que no se dispare todo el tiempo el . ----- -----
         window.addEventListener('scroll', debounce((event) => {
         
             if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {             
                 document.querySelector('.go-top-container')
                     .classList.add('show');
             }
             else {
                 document.querySelector('.go-top-container')
                     .classList.remove('show');              
             }          
         }, 200));


        // ? ----- -----  Event cuando haces click va hacia arriba con efecto lento. ----- -----
         document.querySelector('.go-top-container') 
             .addEventListener('click', () => {
                 window.scrollTo({
                     top:0,
                     behavior: 'smooth'
                 });
             });
         
         
        // ? ----- -----  Event para ir hacia la imagen principal cuando se da click en una películas de interés. ----- -----
        document.body.addEventListener('click', (e) => {
             
             if(e.target.className == 'text-center mt-3 verPelisimilar') {      
                 window.scrollTo({
                     top:480,
                     behavior: 'smooth'
                 });
             }       
         });

        // ? ----- ----- Event Listener para la flecha derecha del carousel. ----- -----
        flechaDerecha.addEventListener('click', () => {
                fila.scrollLeft += fila.offsetWidth;
        });
                
        // ? ----- ----- Event Listener para la flecha izquierda del carousel. ----- -----
        flechaIzquierda.addEventListener('click', () => {
                fila.scrollLeft -= fila.offsetWidth;
        });
        
        // ? ----- ----- Función de los próximos estrenos. ----- -----
        function ProximosExtrenos() {
            movieDb.ProximosEstrenos()
                .then( proxEstrenos => {                  
                    ui.PeliculasAExtrenar(proxEstrenos);
            });
        }
        // ? ----- ----- Función de ocultar el preLoader. ----- -----
        function OcultarPreLoader() {              
            document.getElementById('onload').classList.add('ocultarPreLoading');
              
        }
        
        // ? ----- ----- Función debounce. ----- -----
        function debounce(callback, wait) {
            let timeout;
            return (...args) => {
                const context = this;
                clearTimeout(timeout);
                timeout = setTimeout(() => callback.apply(context, args), wait);
            };
        }   

        // ? ----- ----- Función mostrar todas las películas con el resulado que viene por parametro. ----- -----
        function MostrarPeliculas(searchResult){
            movieDb.buscarPeliculasAPI(searchResult)
                .then( data => {                   
                    if(data.length > 0){
                        inputSearch.value = "";
                        ui.LimpiarResultados();
                        ui.MostrarPeliculas(data);
                        
                    }
                    else{
                      bootbox.alert({
                        message: "¡No se encontraron resultados!"
                       
                    })
                        ui.LimpiarResultados();      
                        inputSearch.value = ""; 
                    }
                });
        }
          // ? ----- ----- Función traer todas las películas con el id que viene por parametro. ----- -----
        function TraerPeliculaSeleccionada(idPelicula){
            movieDb.ObtenerPeliculaAPI(idPelicula)
                .then( pelicula  => {                   
            
                    divSearch.style.display = "none";
                    peliculasSimilares.innerHTML = '';
                    //envia a la posicion de la info de la pelicula
                    window.scrollTo({
                        top:435,
                        behavior: 'smooth'
                    });
    
                    // Compruebo que haya almenos 1 poster
                    let img_backdrops = (pelicula.objetosApis[3].backdrops.length > 0) ? pelicula.objetosApis[3].backdrops[1] : ''; 
                    console.log(img_backdrops);
                    ui.LimpiarResultados()
                    //ui.AgregarImagenBanner(img_backdrops);
                    ui.MostrarDetallePelicula(pelicula.objetosApis[0], pelicula.objetosApis[2].results, img_backdrops);     
                    ui.MostrarPeliculasSimilares(pelicula.objetosApis[1]);                         
                });
        }
}