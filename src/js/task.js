'use strict';

import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const btn = document.querySelector('#showMore');
const list = document.querySelector('.list');
const info = document.querySelector('.infoMsg');
let page = 1;
let totalPage;
let text = '';
info.style.display = 'none';
btn.style.display = 'none';

const lightbox = new SimpleLightbox('.listItem a', {
  captionsData: 'alt',
  captionDelay: 250,
  nav: true,
  close: true,
  showCounter: true,
});

function createItem(arr) {
  return arr
    .map(item => {
      return `<li class="listItem">
              <a href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}"/></a>
              <ul class="subList">
                <li class="sLItem"><span class="bold">Likes</span><span>${item.likes}</span></li>
                <li class="sLItem"><span class="bold">Views</span><span>${item.views}</span></li>
                <li class="sLItem"><span class="bold">Comments</span><span>${item.comments}</span></li>
                <li class="sLItem"><span class="bold">Downloads</span><span>${item.downloads}</span></li>
              </ul>
            </li>`;
    })
    .join('');
}

const srcParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
});
axios.defaults.baseURL = 'https://pixabay.com';
const requestKey = '55680112-662c4999a1e7b09f15363a282';

const fetchData = async (textPar, pagePar) => {
  return await axios.get(
    `/api/?key=${requestKey}&${srcParams}&q=${textPar}&page=${pagePar}`
  );
};

form.addEventListener('submit', event => {
  event.preventDefault();
  info.style.display = 'block';
  btn.style.display = 'none';
  page = 1;
  list.innerHTML = '';
  text = '';
  text = event.target.elements['searchText'].value;
  fetchData(text, page)
    .then(response => {
      info.style.display = 'none';
      if (response.data.hits.length === 0) {
        iziToast.show({
          message: `<div class='iconContainer'>
              <svg class='icon'><use href='../img/warning.svg'/></svg>
              <span class='message'>Sorry, there are no images matching<br>your search query.Please try again!</span>
              </div>`,
          position: 'topRight',
          messageColor: 'white',
          backgroundColor: 'rgba(239, 64, 64, 1)',
        });
        return;
      }
      btn.style.display = 'block';
      totalPage = Math.ceil(Number(response.data.total / 20));
      return response.data;
    })
    .then(data => {
      const htmlObj = createItem(data.hits);
      list.insertAdjacentHTML('beforeend', htmlObj);
      lightbox.refresh();
    })
    .catch(error => {
      console.log(error);
    });
  event.target.elements['searchText'].value = '';
});

btn.addEventListener('click', e => {
  e.preventDefault();
  page += 1;
  if (page > totalPage) {
    iziToast.show({
      message: `<div class="msgCon">
      <div class='izitosatIcon'>
              <svg class='icon2'><use href='../img/info.svg'/></svg>
              </div>
              <div class="message">
              <span class='message'>We're sorry, but you've reached the end of search results</span>
              </div>
              </div>
              `,
      position: 'topRight',
      messageColor: 'white',
      backgroundColor: 'rgb(20, 230, 238)',
    });
    btn.style.display = 'none';
    return;
  }
  fetchData(text, page)
    .then(response => {
      return response.data;
    })
    .then(data => {
      const htmlObj = createItem(data.hits);
      list.insertAdjacentHTML('beforeend', htmlObj);
      lightbox.refresh();
      const card = document.querySelector('.listItem');
      const cardHeight = card.getBoundingClientRect().height;
      console.log(cardHeight);
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      console.log(error);
    });
});
