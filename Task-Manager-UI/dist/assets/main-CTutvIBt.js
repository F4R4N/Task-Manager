import{a as e,c as t,i as n,l as r,n as i,o as a,r as o,t as s}from"./api-BS3n0N4v.js";var c=`
    <div class="user-info" id="userMenu">
        <div class="user-toggle">
            <img src="" class="avatar">
            <span class="username"></span>
        </div>
        <div class="user-dropdown">
            <a href="#" id="logoutBtn" class="no-pico btn">Logout</a>
        </div>
    </div>
`;async function l(e,n){try{e.innerHTML=c;let r=e.querySelector(`#userMenu`),i=r.querySelector(`.avatar`),a=r.querySelector(`.username`);i.src=n.gravatar,a.textContent=n.username,r.addEventListener(`click`,e=>{e.preventDefault(),r.classList.toggle(`active`)}),document.addEventListener(`click`,e=>{r.contains(e.target)||r.classList.remove(`active`)}),r.querySelector(`#logoutBtn`).addEventListener(`click`,async e=>{e.preventDefault(),await t(),window.location.href=`index.html`})}catch(e){console.error(`Error loading user menu:`,e)}}var u=`
    <nav class="navbar" id="navbar">
        <button id="hamburgerBtn" class="hamburger" aria-label="Toggle sidebar">☰</button>
        <a class="logo-container" href="/index.html">
            <img class="logo" src="/assets/images/Logo.png" alt="Logo">
        </a>
        <div id="navbarUser"></div>
    </nav>
`;async function d(e){let t=document.getElementById(`navbarUser`);e&&e.ok?l(t,await e.json()):t.innerHTML=`
            <a class="btn login-btn" href="/login.html">Login</a>
        `}async function f(e){try{document.body.insertAdjacentHTML(`afterbegin`,u);let t=document.getElementById(`hamburgerBtn`),n=document.getElementById(`sideMenu`);d(e),t.addEventListener(`click`,()=>{n&&n.classList.toggle(`open`)})}catch(e){console.error(`Failed to load navbar:`,e)}}var p=`
    <div id="sideMenu" class="side-menu">
        <div class="menu">
            <ul>
                <li><a href="/index.html">Tasks</a></li>
            </ul>
        </div>
    </div>
`;async function m(e){try{e.insertAdjacentHTML(`afterbegin`,p)}catch(e){console.error(`Failed to load side menu:`,e)}}function h(e){return new Date(e).toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`})}function g(e){return new Date(e).toLocaleDateString(`en-GB`,{day:`2-digit`,month:`short`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})}function _(e){return e[0].toUpperCase()+e.slice(1)}async function v(e,t){let n=e.querySelector(`#modalActionBtn`),r={title:e.querySelector(`#title`).value,description:e.querySelector(`#description`).value,status:e.querySelector(`#statusSelect`).value,priority:e.querySelector(`#prioritySelect`).value,assignee_id:e.querySelector(`#assigneeSelect`).value};n.dataset.action===`create`?await s(r):n.dataset.action===`edit`&&await o(t,r),window.location.href=`index.html`}function y(e){e.classList.add(`hide`)}async function b(e,t,n){let r=document.getElementById(`modalOverlay`),i=r.querySelector(`#modalActionBtn`);i.dataset.action=e,i.textContent=_(e),r.style.display=`flex`,Array.from(r.querySelector(`.modal-content`).children).forEach(e=>{y(e)}),e===`delete`?w(r,t):e===`search`?C(r):(S(r),e===`create`?T(r,n):e===`edit`&&(r.querySelector(`#modalHeader`).textContent=`Edit Task`,r.querySelector(`.task-modal`).classList.remove(`hide`),x(r,await(await a(`/task/${t}`,{method:`GET`})).json())))}function x(e,t){if(e.querySelector(`#title`).value=t.title,e.querySelector(`#description`).value=t.description,t.assignee!==null){let n=e.querySelector(`#assigneeSelect`);n.querySelector(`option[value="${t.assignee.id}"]`).selected=!0}let n=e.querySelector(`#statusSelect`);n.querySelector(`option[value="${t.status}"]`).selected=!0;let r=e.querySelector(`#prioritySelect`);r.querySelector(`option[value="${t.priority}"]`).selected=!0}async function S(e){let t=await(await a(`/users`)).json(),n=e.querySelector(`#assigneeSelect`);n.innerHTML=``,t.unshift({id:null,username:null,email:null}),t.forEach(e=>{let t=document.createElement(`option`);t.value=e.id||``,t.textContent=`${e.username||`--`}${e.username?` (${e.email})`:``}`,n.appendChild(t)})}function C(e){e.querySelector(`#modalHeader`).textContent=`Search Task`,e.querySelector(`.search-modal`).classList.remove(`hide`),e.querySelector(`#searchInput`).focus()}function w(e,t){e.querySelector(`#modalHeader`).textContent=`Are you sure you want to delete this task?`;let n=e.querySelector(`button`);n.dataset.id=t,n.classList.remove(`hide`)}function T(e,t){E(e),e.querySelector(`#modalHeader`).textContent=`Create Task`,e.querySelector(`#statusSelect`).value=t,e.querySelector(`.task-modal`).classList.remove(`hide`)}function E(e){e.querySelector(`#title`).value=``,e.querySelector(`#description`).value=``;let t=e.querySelector(`#assigneeSelect`);t.querySelector(`option:first-child`).selected=!0;let n=e.querySelector(`#statusSelect`);n.querySelector(`option[value="todo"]`).selected=!0;let r=e.querySelector(`#prioritySelect`);r.querySelector(`option[value="medium"]`).selected=!0}function D(e){e.classList.remove(`is-visible`),document.body.style.overflow=``}function O(e,t){let n=document.getElementById(`modalTaskContent`);n.innerHTML=``,t?n.innerHTML=`
                <h2 class="task-title">${t.title}</h2>
                <div class="task-detail-item">
                    <strong>Description:</strong>
                    <p>${t.description||`N/A`}</p>
                </div>
                <div class="task-detail-item">
                    <strong>Assignee:</strong>
                    ${t.assignee?`<span>
                            <img src="${t.assignee.gravatar}" alt="${t.assignee.username} Profile Picture" class="assignee-avatar"> 
                            ${t.assignee.username}
                           </span>`:`<span>N/A</span>`}
                </div>
                <div class="task-detail-item">
                    <strong>Priority:</strong>
                    <span class="badge badge-${t.priority}">${_(t.priority)}</span>
                </div>
                <div class="task-detail-item">
                    <strong>Status:</strong>
                    <span>${_(t.status).replace(`_`,` `)}</span>
                </div>
                <div class="task-detail-item">
                    <strong>Created:</strong>
                    <span>${g(t.created_at)} (Last Updated at: ${g(t.updated_at)})</span>
                </div>
            `:n.innerHTML=`<p>Could not load task details.</p>`,e.classList.add(`is-visible`),document.body.style.overflow=`hidden`}async function k(e){let t=document.getElementById(`sideModal`);document.getElementById(`modalOverlay`).style.display=`none`,t.querySelector(`#deleteBtn`).dataset.id=e,t.querySelector(`#editBtn`).dataset.id=e;let r=await n(e);O(t,r),A(t,r)}async function A(e,t){let n=await a(`/auth/account/`),r=e.querySelector(`.action-container`);if(n.ok){let e=JSON.parse(localStorage.getItem(`user`));e==null?r.style.display=`none`:t.owner.id===e.id?r.style.display=`flex`:r.style.display=`none`}else r.style.display=`none`}function j(e){let t=document.getElementById(`task-template`);if(!t)return;let n=t.content.cloneNode(!0),r=n.querySelector(`.card-title`);r.textContent=e.title,r.title=e.title,n.querySelector(`.created-at`).textContent=h(e.created_at);let i=n.querySelector(`.badge`);if(i.textContent=_(e.priority),i.classList.add(`badge-`+e.priority),e.assignee!=null){n.querySelector(`.assignee-username`).textContent=e.assignee.username;let t=n.querySelector(`.assignee-profile-pic`);t.src=e.assignee.gravatar,t.alt=e.assignee.username+` profile`}else n.querySelector(`.assignee`).remove();let a=n.querySelector(`.card`);return a.dataset.id=e.id,a.addEventListener(`click`,e=>{k(e.currentTarget.dataset.id)}),n}function M(e){let t=j(e);document.getElementById(e.status).querySelector(`.cards`).appendChild(t)}async function N(){(await e()).forEach(e=>M(e))}async function P(e){let t=document.querySelectorAll(`.add`);e&&e.ok?t.forEach(e=>{e.addEventListener(`click`,()=>{b(`create`,null,e.dataset.status)})}):t.forEach(e=>{e.style.display=`none`})}async function F(e){let t=j(e);document.querySelector(`.search-results`).appendChild(t)}async function I(e){if(e.length===0){let e=document.querySelector(`.search-results`),t=document.createElement(`p`);t.textContent=`No results`,t.classList.add(`no-results`),e.appendChild(t)}e.forEach(e=>{F(e)})}async function L(){let e=document.getElementById(`searchInput`);e.addEventListener(`keyup`,async t=>{t.key===`Enter`&&(t.preventDefault(),R(),I(await r(e.value)))}),document.getElementById(`searchBtn`).addEventListener(`click`,()=>{R(),b(`search`)})}function R(){let e=document.querySelector(`.search-results`);e.innerHTML=``}function z(){let e=document.getElementById(`modalOverlay`),t=document.getElementById(`sideModal`);document.addEventListener(`click`,async n=>{if(n.target.matches(`#deleteBtn`)&&b(`delete`,n.target.dataset.id),n.target.matches(`#editBtn`)&&b(`edit`,n.target.dataset.id),n.target.matches(`.confirm-delete`)){let e=document.querySelector(`.confirm-delete`);e.disabled=!0,await i(n.target.dataset.id),e.disabled=!1,window.location.href=`index.html`}n.target.matches(`#closeBtn`)&&(e.style.display=`none`),n.target.matches(`#modalOverlay`)&&(e.style.display=`none`),n.target.matches(`#sideModal`)&&n.target===t&&D(t),n.target.matches(`#sideModalCloseBtn`)&&D(t)}),document.addEventListener(`submit`,t=>{if(t.target.matches(`#taskForm`)){t.preventDefault();let n=document.getElementById(`modalActionBtn`);n.disabled=!0;let r=document.getElementById(`editBtn`).dataset.id;v(e,r),n.disabled=!1}}),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&t.classList.contains(`is-visible`)&&D(t)})}async function B(){m(document.getElementById(`app`)),z();try{let e=await a(`/auth/account`);f(e),P(e)}catch{f(),P()}N(),L()}B();