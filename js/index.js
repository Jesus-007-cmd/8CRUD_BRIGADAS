//const buton = document.getElementById('content')  //trae un elemento nada mas
//const buton = document.getElementsByClassName('buton')  //trae muchos elementos, traet todos los elementos que tenga la clase buton
//const buton = document.querySelector('buton')  //trae los elementos de la clase buton declarada en index.html
/*buton.addEventListener('click', function(){
    console.log('click')
    
    });
*//*
//si se usa el enento content
document.addEventListener("DOMContentLoaded", function(){
console.log('click')
});
*/
//el siguiente regresa todos los divs:
const buton = document.querySelectorAll('.buton')
document.addEventListener("DOMContentLoaded", function(){
    console.log('click')
    });