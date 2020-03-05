'use strict';


window.onload = () => {
    renderBagStatus()
};
window.onresize = () => {
    renderBagStatus()
};

function renderBagStatus() {
    let totalPrice = document.getElementById("totalPrice");
    let totalPriceMobile = document.getElementById("totalPriceMobile");
    totalPrice.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
    totalPriceMobile.innerHTML = "Bag £" + shoppingBag.price + " (" + shoppingBag.size + ")";
}

function showImage(imgName) {
    let curImage = document.getElementById('galleryMain');
    curImage.src = imgName;
}