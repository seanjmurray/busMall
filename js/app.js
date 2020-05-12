'use strict';

var pElement = document.getElementById('products');
var rElement = document.getElementById('results');
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
  this.views++;
};
Products.prototype.results = function(){
  var p = document.createElement('p');
  p.textContent = `${this.title} was shown ${this.views} and was picked ${this.votes}`;
  rElement.appendChild(p);
};
//////////////////////////////////HELPER/////////////////////////////////
function randomIndexer(max){
  return Math.floor(Math.random() * max);
}

function makeProducts(){
  for(var i =0;i<images.length;i++){
    new Products(`images/${images[i]}.jpg`,`${images[i]}`);
  }
}
makeProducts();

var indexArray = [];
function productIndex(array){
  var index = randomIndexer(array.length);
  while(indexArray.includes(index)){
    index = randomIndexer(array.length);
  }
  indexArray.push(index);
  if(indexArray.length > 6){
    indexArray.shift();
  }
  return index;
}
function renderProduct(){
  var index = productIndex(products);
  products[index].render();
}



var j = 0;

var rounds = document.getElementById('rounds').addEventListener('submit', function(){
  event.preventDefault();
  rounds = Number(event.target.num.value);
  renderProduct();
  renderProduct();
  renderProduct();
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
    pElement.textContent = '';
    renderProduct();
    renderProduct();
    renderProduct();
    console.log(j);
    j++;
  }else{
    this.removeEventListener('click',handler);
    pElement.textContent = '';
    for(var k = 0; k<products.length;k++){
      products[k].results();
    }
  }
});




