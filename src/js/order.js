import { checkLogin } from "./auth.mjs";
import { orderRequest } from "./externalServices.mjs";

const token = checkLogin();

let orders = orderRequest(token);

console.log(orders);
