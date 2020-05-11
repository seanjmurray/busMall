'use strict';

var pElement = document.getElementById('products');

var products = [];
var images = ['bag', 'banana', 'bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var Products = function(image,title){
  this.filePath = image;
  this.title = title;
  this.alt = title;
  this.views = 0;
  this.votes = 0;
  products.push(this);
};

Products.prototype.render = function(){
  var img = document.createElement('img');
  img.src = this.filePath;
  img.title = this.title;
  img.alt = this.alt;
  pElement.appendChild(img);
  this.view++;
};
//////////////////////////////////HELPER/////////////////////////////////
function randomIndexer(max){
  return Math.floor(Math.random() * (max+1));
}

function makeProducts(){
  for(var i =0;i<images.length;i++){
    new Products(`images/${images[i]}.jpg`,`${images[i]}`);
  }
}
makeProducts();

function renderProduct(array){
  pElement.textContent = '';
  var ran1 = randomIndexer(array.length-1);
  var ran2 = randomIndexer(array.length-1);
  var ran3 = randomIndexer(array.length-1);
  while(ran1 === ran2 || ran1 === ran3 || ran2 === ran3){
    ran2 = randomIndexer(array.length-1);
    ran3 = randomIndexer(array.length-1);
  }
  products[ran1].render();
  products[ran2].render();
  products[ran3].render();
}
renderProduct(products);

var j = 0;
var rounds = 25;

document.getElementById('rounds').addEventListener('submit', function(){
  event.preventDefault();
  rounds = Number(event.target.num.value);
  return rounds;
});

pElement.addEventListener('click', function handler(){
  console.log(rounds);
  if(j<rounds){
    var iWasClicked = event.target.title;
    for(var i=0;i<products.length;i++){
      if(iWasClicked===products[i].title){
        products[i].votes++;
      }
    }
    renderProduct(products);
    console.log(j);
    j++;
  }else{
    this.removeEventListener('click',handler);
  }
});




