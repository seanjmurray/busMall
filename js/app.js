'use strict';

var pElement = document.getElementById('products');
var products = [];
var results = [];
var views = [];
var images = ['bag', 'banana', 'bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];

var Products = function(image,title,views,votes){
  this.filePath = image;
  this.title = title;
  this.alt = title;
  this.views = views;
  this.votes = votes;
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
  results.push(this.votes);
  views.push(this.views);
};
//////////////////////////////////HELPER/////////////////////////////////
function randomIndexer(max){
  return Math.floor(Math.random() * max);
}

function makeProducts(){
  for(var i =0;i<images.length;i++){
    new Products(`images/${images[i]}.jpg`,`${images[i]}`,0,0);
  }
}
function isLocal(){
  var sProducts;
  if(localStorage.getItem('sProducts')){
    console.log('if');
    sProducts = JSON.parse(localStorage.getItem('sProducts'));
    for(var i =0;i<sProducts.length;i++){
      new Products(sProducts[i].filePath,sProducts[i].title,sProducts[i].views,sProducts[i].votes);
    }
  }else{
    console.log('else');
    makeProducts();
  }
}

var indexArray = [];
function productIndex(array){
  var index = randomIndexer(array.length);
  while(indexArray.includes(index)){
    index = randomIndexer(array.length);
  }
  indexArray.push(index);
  if(indexArray.length > 9){
    indexArray.shift();
  }
  return index;
}
function renderProduct(){
  var index = productIndex(products);
  products[index].render();
}



var j = 1;

var rounds = document.getElementById('rounds').addEventListener('submit', function(){
  event.preventDefault();
  rounds = Number(event.target.num.value);
  isLocal();
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
      myChartThing();
      localStorage.setItem('sProducts', JSON.stringify(products));
    }
  }
});


function myChartThing(){
  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: images,
      datasets: [{
        label: '# of Votes',
        data: results,
        backgroundColor: [
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(153, 102, 255, 0.75)',
          'rgba(255, 99, 132, 0.75)',
          'rgba(54, 162, 235, 0.75)',
          'rgba(255, 206, 86, 0.75)',
          'rgba(75, 192, 192, 0.75)',
          'rgba(255, 159, 64, 0.75)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: views,
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

