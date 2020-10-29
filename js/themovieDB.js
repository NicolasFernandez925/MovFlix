class MovieDB {

    constructor(){
        this.token_auth = '7af35d93fba9975862bf6f8434da9227'
    }

    async ProximosEstrenos(){

        try {

            const proximosEstrenos = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${this.token_auth}&language=en-US&page=1`);
            const { results:peliculas } = await proximosEstrenos.json();          

            return peliculas;
        }catch  (err){

            throw(err);

        }
    }    

   async buscarPeliculasAPI(textBuscado) {

        try{

            const respuesta= await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${this.token_auth}&language=en-US&query=${textBuscado}&page=1&include_adult=false`);

            const { results:peliculas } = await respuesta.json();
            console.log(peliculas)
            return peliculas;
          
            
        } catch( err ) {

            throw err;
        }       
    }
  
    async ObtenerPeliculaAPI(id){
        
          try{

            const repuestaEvento = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${this.token_auth}`);
  
            const peliculaBuscadaJson = await repuestaEvento.json();
  
            //Peticion a peliculas similares
            const repuestaEvento2 = await fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${this.token_auth}&language=en-US&page=1`);
            const peliculasSimilaresJson = await repuestaEvento2.json();

            const respuestaVideos = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${this.token_auth}&language=en-US`);
            const videosJson = await respuestaVideos.json();

            const respuestaImagenes = await fetch (`https://api.themoviedb.org/3/movie/${id}/images?api_key=${this.token_auth}&language=en-US&include_image_language=en,null`)
            const imgJson = await respuestaImagenes.json();

            //Armo un objeto con las respuestas de las peticiones a la API
            let objetosApis = {
                0 :  peliculaBuscadaJson,
                1 :  peliculasSimilaresJson,
                2 :  videosJson,
                3 :  imgJson
            }  
  
            return {
               objetosApis
            }

          } catch( err ) {

                throw err;
          }
         
      
    }
  
    //Busca las peliculas segun lo que ingrese en el input y lo muestra en un div
    async BuscarPeliculaClave(textBuscado){

        try{
          
            const resp = await fetch(` https://api.themoviedb.org/3/search/movie?api_key=${this.token_auth}&language=en-US&query=${textBuscado}`);
           
            const { results:peliculas } = await resp.json();
                console.log(peliculas)
            return peliculas;

        } catch ( err ){

            throw err;
        }

    }

}
