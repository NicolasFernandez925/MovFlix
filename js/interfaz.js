class Interfaz {

    
    constructor(){
 
        this.listado = document.getElementById('resultado');
        this.listadoPelisSimilares = document.getElementById('resultado-2');
        this.divSearch = document.getElementById('divSearch');
        this.divProxEstrenos = document.getElementById('resultado-3'); 
        this.divImgBanner = document.querySelector('.div-banner');
    }

    MostrarMensaje(mensaje, clases){

        const div = document.createElement('div');
        div.classList = clases;
        div.appendChild(document.createTextNode(mensaje));
        const guardarDiv = document.querySelector('.alert-error');

        guardarDiv.appendChild(div);

        setTimeout( () => {
            this.LimpiarMensaje();
        },7000 );
        
    }

    LimpiarMensaje(){
        const alert = document.querySelector('.alert');
        if(alert){
            alert.remove();
        }
    }

    LimpiarResultados(){
       
        this.listado.innerHTML = '';
    }
    LimpiarResultadosDivSearch(){
       
        this.divSearch.innerHTML = '';
    }

    LimpiarDivImgBanner(){
        this.divImgBanner.innerHTML = '';
    }

    
    MostrarPeliculas(peliculas) {
        
     
        document.querySelector('.contenedor-gif').style.display = "block";
        setTimeout( () => {

            this.AgregarTitulo("Results found...","resultado");
            peliculas.forEach(pelicula => {
                this.listado.innerHTML += (pelicula.poster_path != null) ? 
            
            `<div class="col-6 col-lg-4 pt-5 ">
                <div class="card m-0 hover-movie">
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top img-open img-responsive" alt="">
                      <div class="card-body">
                        <h5 class="card-title"> <strong>${pelicula.title}</strong></h5>
                        <span class="text-white d-block card-text badge badge-color text-wrap">Year ${pelicula.release_date}</span>
                        <button id="btnMore" value="${pelicula.id}" class="text-center mt-3 ">See more</button>
                    </div>
                </div>
            </div>         
            `                          
            : ''
            });

            document.querySelector('.contenedor-gif').style.display = "none";        

        }, 3000);      
                            
    }

    AgregarImagenBanner(poster) {
     
      const img = document.createElement('img');
      img.setAttribute("src", `https://image.tmdb.org/t/p/original/${poster.file_path}`);
      img.classList.add('img-banner-header');
      this.divImgBanner.appendChild(img);
    }

    MostrarResultadosDeBusquedaEnElInput(peliculas) {
        
        peliculas.forEach(pelicula => {

            let filterPelicula = pelicula.original_title.toUpperCase();
            this.divSearch.innerHTML +=  
           `                   
              <li class="movie-selected" value="${pelicula.id}"><i class="fas fa-search mr-3"></i><span class="title-movie-li">${filterPelicula} </span></li>
           
           `                          
        });
       
    }

    PeliculasAExtrenar(peliculasAEstrenar) {

        const divPeliculasAEstrenar = document.querySelector('.carousel-movie');
        peliculasAEstrenar.forEach( pelicula => {
            divPeliculasAEstrenar.innerHTML +=  

            `      
            <div class="pelicula">
                <a href="#"><img class="img-estrenos" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path} " alt=""></a>
                <button id="btnMore" value="${pelicula.id}" class="text-center mt-3 ">See more</button>
            </div>
        
            `
         
        });
       
    }

    MostrarDetallePelicula(pelicula, videos , poster){

        const genres = pelicula.genres;
       
        var newarray = genres.map((actor) => { return(actor.name) }); // Saco los actores 
        newarray.join(); // convierto el array de actores a una cadena de string
      
        
        let video = ( videos.length > 0 ) ? videos[0] : ''; // me trigo solamente si los videos existen en la pelicula
        
        this.listado.innerHTML = 
        `
        <div class="col-6 pt-5 col-lg-4 text-white img-responsive">
            <img class="mb-3 img-open img-responsive"  src="https://image.tmdb.org/t/p/w500/${pelicula.poster_path}" alt="">
        </div>
        <div  class="col-6 pt-5 d-lg-none mt-4"> 
           <div class="row">
               <div class="col-8 offset-2">
                    <div class="row">
                        <div class="col-12">
                            <div class="star d-flex"> 
                                <i class="far fa-star text-warning"></i>
                                <i class="far fa-star text-warning"></i>
                                <i class="far fa-star text-warning"></i>
                                <i class="far fa-star text-warning"></i>
                                <i class="far fa-star"></i>
                            </div>
                        </div>
                        <div class="col-12">
                            <span class="text-white count-vote">(${pelicula.vote_count} votos, promedio ${pelicula.vote_average})</span>
                        </div>
                    </div>             
               </div>
           </div>
        </div>
        <img class="mb-3 img-bg backrops img-responsive"  src="https://image.tmdb.org/t/p/original/${poster.file_path}" alt="">
        <div class="col-12  col-lg-8 text-white">
            <h3 class="font-weight-bold mt-3 ">${pelicula.original_title} (${pelicula.release_date.substring(0,4)})</h3>         
            <p>${pelicula.tagline}</p> 
            <p class="genre-movie">${newarray}</p> 
            <hr></hr>  
            <p class="mt-3 mb-3 descripcion-movie">${pelicula.overview}</p>
            <div class="inf-movie ">
                <span><strong>Year</strong>: ${pelicula.release_date}</span>
                <span ><strong>Language</strong>: ${pelicula.original_language}</span>
                <span><strong>Duration</strong>: ${pelicula.runtime} min</span> 
                <div class="d-none d-lg-block">
                    <div class="star mt-3 d-flex  "> 
                        <i class="far fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <i class="far fa-star text-warning"></i>
                        <i class="far fa-star"></i>
                    </div>  
                    <span class="text-white count-vote">(${pelicula.vote_count} votos, promedio ${pelicula.vote_average})</span>
                </div>      
                
            </div>  
        </div>
        <div class="col-12 col-lg-8 offset-lg-2 py-4">
            <div class="video">
                <h4 class="title-video text-center">${video.name}</h4>
                <iframe width="${video.size}" height="415" src="https://www.youtube.com/embed/${video.key}" frameborder="0" allow="accelerometer; autoplay;   encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>    
        </div>

        `      
    }

    MostrarPeliculasSimilares(peliculas){

        const peliculasSimilares = peliculas.results;

        this.AgregarTitulo("Maybe you are interested...", "resultado-2");
        peliculasSimilares.forEach(pelicula => {
        
            this.listadoPelisSimilares.innerHTML += (pelicula.poster_path != null) ? `
            <div class="col-6 col-lg-4 card-movies-similares">   
                <div class="card m-0">
                    <img src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}" class="card-img-top img-open img-responsive" alt="">
                    <div class="card-body">
                        <h5 class="card-title"> <strong>${pelicula.original_title}</strong></h5>
                        <span class="text-white d-block card-text badge badge-color text-wrap">Year: ${pelicula.release_date}</span>
                        <button id="btnMore" value="${pelicula.id}" class="text-center mt-3 verPelisimilar">See more</button>
                    </div>
                </div>
            </div>`  

        : '';
       
        });
       
    }


    AgregarTitulo(titulo, id){
        
        let h3 = document.createElement("h3");        
        h3.appendChild(document.createTextNode(titulo));
        h3.classList.add('title-releases', 'mt-5' ,'col-12');
        document.getElementById(id).appendChild(h3);

      
    }
    
}

