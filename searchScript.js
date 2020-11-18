const api = "https://api.punkapi.com/v2/beers";
const formElement = document.querySelector("form");
const listElement = document.querySelector("article.beerList");
const previous = document.querySelector("#prev");
const next = document.querySelector("#next");
let ulElement = document.querySelector("article.beerList > ul");
let pageCount = document.querySelector("#current-span");

pageCount.innerHTML = "";
formElement.addEventListener("submit", onSubmit);
let currentPage = 1;
let url;
let searchString;

function onSubmit(evt) {

  searchStr = evt.target[0].value;
  url = `${api}?beer_name=${searchStr}&page=${currentPage}&per_page=10`;
  getData(url, render);
  evt.preventDefault();
}
function getData(url, callback) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      callback(data);
    })
    .catch((error) => console.log(error));
}

function render(data) {
  while (ulElement.firstChild) {
    ulElement.removeChild(ulElement.firstChild);
  }
  ulElement.addEventListener("click", onUlClicked);

  for (let i = 0; i < data.length; i++) {
    const beer = data[i];
    const liElement = document.createElement("li");
    liElement.setAttribute("name", beer.id);
    liElement.textContent = beer.name;
    ulElement.appendChild(liElement);
  }
  listElement.appendChild(ulElement);
}

//calls when a list item is clicked
function onUlClicked(evt) {
  const id = evt.target.getAttribute("name");
  const url = `BeerDetails.html?name=${id}`;
  document.location.href = url;
}

//calls when Previous Page button is clicked
previous.onclick = function (evt) {
  if (currentPage !== 1) {
    url = `${api}?beer_name=${searchStr}&page=${currentPage - 1}&per_page=10`;
    getData(url, render);
    evt.preventDefault();
    currentPage--;
    pageCount.innerHTML = currentPage;
  }
};

//calls when Next Page button is clicked

next.onclick = function (evt) {
  if (ulElement.childElementCount == 10) {
    url = `${api}?beer_name=${searchStr}&page=${currentPage + 1}&per_page=10`;
    getData(url, render);
    evt.preventDefault();
    currentPage++;
    pageCount.innerHTML = currentPage;
  }
};