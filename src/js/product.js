import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";

let productID = getParam("product");
productDetails(productID);
