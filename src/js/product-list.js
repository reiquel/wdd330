import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

let category = getParam("category");
productList(category, "ul.product-list");

document
  .querySelector(".products h2")
  .insertAdjacentText("beforeend", `: ${category}`);
