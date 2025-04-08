import { setLocalStorage, getLocalStorage } from "./utils.mjs";
import {findProductById} from "./externalServices.mjs"

let product = {};

export default async function productDetails(productID) {
    // use findProductById to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    product = await findProductById(productID);
    // once we have the product details we can render out the HTML
    renderProductDetails();
    // add listener to Add to Cart button
    document.getElementById("addToCart").addEventListener("click", addToCart);
}


function addToCart() {
    let products = getLocalStorage("so-cart");
    if (!Array.isArray(products)) { 
        products = [products];
        products.shift();
    }
    products.push(product);
    setLocalStorage("so-cart", products);
    console.log(product);
}

function renderProductDetails() {
    if (product) {
        document.getElementById("productName").innerText = product.Brand.Name;
        document.getElementById("productNameWithoutBrand").textContent = product.NameWithoutBrand;
        document.getElementById("productImage").src = product.Images.PrimaryLarge;
        document.getElementById("productImage").alt = product.Name;
        document.getElementById("productFinalPrice").textContent = product.FinalPrice;
        document.getElementById("productColorName").textContent = product.ColorName;
        document.getElementById("productDescriptionHtmlSimple").innerHTML = product.DescriptionHtmlSimple;
        document.getElementById("addToCart").setAttribute("data-id", product.Id);
    }

}

  