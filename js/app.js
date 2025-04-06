import '../sass/style.scss';

class Doggo{

    constructor(){
          // Sets the base API URL for the Dog API
        this.apiUrl = 'https://dog.ceo/api';

        // Selects DOM elements for the featured dog image, background, tiles, and spinner
        this.imgEl = document.querySelector('.featured-dog img');
        this.backgroundEl = document.querySelector('.featured-dog__background')
        this.tilesEl = document.querySelector('.tiles');
        this.spinnerEl = document.querySelector('.spinner');
        
        // Initializes the application
        this.init();
    }

    showLoading(){
        this.spinnerEl.classList.add('spinner--visible');
    }
    hideLoading(){
        this.spinnerEl.classList.remove('spinner--visible');
    }
    // Fetches the list of all dog breeds from the API
     listBreeds(){
        return fetch(`${this.apiUrl}/breeds/list/all`)
          .then( resp => resp.json())
          .then( data => data.message)
      }
     
       // Fetches a random dog image from the API
       getRandomImage(){
          return fetch(`${this.apiUrl}/breeds/image/random`)
          .then( resp => resp.json())
          .then( data => data.message)
      }
       
      // Fetches a random dog image for a specific breed from the API
       getRandomImageByBreed(breed){
          return fetch(`${this.apiUrl}/breed/${breed}/images/random`)
              .then(resp => resp.json())
              .then(data => data.message);
      }

      init(){
        this.showLoading();
        this.getRandomImage()
            .then(img =>{
                this.showImageWhenReady(img)}
            );
            

            this.showAllBreeds();
            
      }
    // Displays the fetched image and update the background
      showImageWhenReady(image){
        this.imgEl.setAttribute('src', image)
        this.backgroundEl.style.background = `url(${image})`;
        this.hideLoading()
      }
    //Adds a breed or sub-breed to the tiles section
      addBreed(breed, subBreed){
        let name;
        let type;
        if(typeof subBreed === 'undefined'){
            name = breed;
            type = breed;
        }else{
            name = `${breed} ${subBreed}`;
            type = `${breed}/${subBreed}`;
        }

        const tile = document.createElement('div');
        tile.classList.add('tiles__tile');

        const tileContent =  document.createElement('div');
        tileContent.classList.add('tiles__tile-content');

        tileContent.innerText = name;

          // Adds a click event to fetch and display a random image for the breed
        tileContent.addEventListener('click', ()=>{
            window.scrollTo(0,0);
            this.showLoading()
            this.getRandomImageByBreed(type)
            .then(img =>{
                this.showImageWhenReady(img)});
        });
 // Appends the content to the tile and the tile to the tiles section
        tile.appendChild(tileContent);
        this.tilesEl.appendChild(tile);

      }
    // Fetches and display all breeds and sub-breeds
      showAllBreeds(){
        this.listBreeds().then(breeds =>{
            for(const breed in breeds){
                if(breeds[breed].length === 0) {
                    this.addBreed(breed)
                }
                else{
                   for(const subBreed of breeds[breed]){
                    this.addBreed(breed, subBreed)
                    console.log(breed + '/' + subBreed )
                   }  
            }
                
            }
        })
    
      
      }
}
// Waits for the DOM to load before initializing the Doggo class
document.addEventListener('DOMContentLoaded', ()=>{
    new Doggo();
})


 
