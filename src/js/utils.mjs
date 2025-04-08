// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function clearLocalStorage(key) {
  localStorage.removeItem(key);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true) {
  var htmlList = list.map(templateFn);
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlList.join(""));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear=true) {
  // get template using function...no need to loop this time.
  if (clear) {
      parentElement.innerHTML = "";
  }
  const htmlList = await templateFn(data);
  parentElement.insertAdjacentHTML(position, htmlList);
  if(callback) {
      callback(data);
  }
}

function loadTemplate(path) {
  // wait what?  we are returning a new function? 
  // this is called currying and can be very helpful.
  return async function () {
      const res = await fetch(path);
      if (res.ok) {
      const html = await res.text();
      return html;
      }
  };
} 



export async function loadHeaderFooter() {

  const headerTemplateFn = loadTemplate("/partials/header.html");
  const footerTemplateFn = loadTemplate("/partials/footer.html");
  const headerE1 = document.querySelector("#main-header");
  const footerE1 = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, headerE1);
  renderWithTemplate(footerTemplateFn, footerE1);

}

export async function alertMessage(message, scroll=true) {
  const alert = document.createElement("div");

  alert.classList.add("alert");
  alert.innerHTML = `<p>${message}</p><p>X</p>`;

  // add a listener to the alert to see if they clicked on the X
  // if they did then remove the child
  alert.addEventListener('click', function(e) {
    if(e.target.innerText === "X") { 
      // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
      main.removeChild(this);
    }
  })

  const main = document.querySelector('main');
  main.prepend(alert);
  // make sure they see the alert by scrolling to the top of the window
  //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
  if(scroll)
    window.scrollTo(0,0);
}

