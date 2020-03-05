'use strict';

window.onload = function () {
    renderBagStatus();
};
window.onresize = function () {
    renderBagStatus();
};

function renderBagStatus() {
    var totalPrice = document.getElementById("totalPrice");
    var totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
}

