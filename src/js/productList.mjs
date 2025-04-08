import { getProductsByCategory } from "./externalServices.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.NameWithoutBrand}</h2>
    <p class="product-card__price">$${product.FinalPrice}</p></a>
  </li>`;
}

/* function filterUnusedProducts(pList) {  
    const show = ["880RR", "985RF", "985PR", "344YJ"];

    return pList.filter(p => show.includes(p.Id));
} */

export default async function productList(category, selector) {
    var pList = await getProductsByCategory(category);
    //pList = filterUnusedProducts(pList);
    renderListWithTemplate(productCardTemplate, document.querySelector(selector), pList);
}