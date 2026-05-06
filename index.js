import{S as b,a as p,i as g}from"./assets/vendor-BAQQTdrx.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function a(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(s){if(s.ep)return;s.ep=!0;const t=a(s);fetch(s.href,t)}})();const v=document.querySelector(".form"),n=document.querySelector("#showMore"),d=document.querySelector(".list"),u=document.querySelector(".infoMsg");let r=1,h,i="";u.style.display="none";n.style.display="none";const m=new b(".listItem a",{captionsData:"alt",captionDelay:250,nav:!0,close:!0,showCounter:!0});function f(o){return o.map(e=>`<li class="listItem">
              <a href="${e.largeImageURL}"><img src="${e.webformatURL}" alt="${e.tags}"/></a>
              <ul class="subList">
                <li class="sLItem"><span class="bold">Likes</span><span>${e.likes}</span></li>
                <li class="sLItem"><span class="bold">Views</span><span>${e.views}</span></li>
                <li class="sLItem"><span class="bold">Comments</span><span>${e.comments}</span></li>
                <li class="sLItem"><span class="bold">Downloads</span><span>${e.downloads}</span></li>
              </ul>
            </li>`).join("")}const L=new URLSearchParams({image_type:"photo",orientation:"horizontal",safesearch:!0});p.defaults.baseURL="https://pixabay.com";const w="55680112-662c4999a1e7b09f15363a282",y=async(o,e)=>await p.get(`/api/?key=${w}&${L}&q=${o}&page=${e}`);v.addEventListener("submit",o=>{o.preventDefault(),u.style.display="block",n.style.display="none",r=1,d.innerHTML="",i="",i=o.target.elements.searchText.value,y(i,r).then(e=>{if(u.style.display="none",e.data.hits.length===0)throw g.show({message:`<div class='iconContainer'>
              <svg class='icon'><use href='../img/warning.svg'/></svg>
              <span class='message'>Sorry, there are no images matching<br>your search query.Please try again!</span>
              </div>`,position:"topRight",messageColor:"white",backgroundColor:"rgba(239, 64, 64, 1)"}),new Error("No results found");return n.style.display="block",h=Math.ceil(Number(e.data.totalHits/20)),e.data}).then(e=>{const a=f(e.hits);d.insertAdjacentHTML("beforeend",a),m.refresh()}).catch(e=>{console.log(e)}),o.target.elements.searchText.value=""});n.addEventListener("click",o=>{if(o.preventDefault(),r+=1,r>h){g.show({message:`<div class="msgCon">
      <div class='izitosatIcon'>
              <svg class='icon2'><use href='../img/info.svg'/></svg>
              </div>
              <div class="message">
              <span class='message'>We're sorry, but you've reached the end of search results</span>
              </div>
              </div>
              `,position:"topRight",messageColor:"white",backgroundColor:"rgb(20, 230, 238)"}),n.style.display="none";return}y(i,r).then(e=>e.data).then(e=>{const a=f(e.hits);d.insertAdjacentHTML("beforeend",a),m.refresh();const s=document.querySelector(".listItem").getBoundingClientRect().height;console.log(s),window.scrollBy({top:s*2,behavior:"smooth"})}).catch(e=>{console.log(e)})});
//# sourceMappingURL=index.js.map
