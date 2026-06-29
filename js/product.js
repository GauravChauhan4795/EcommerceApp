var urlParams = new URLSearchParams(window.location.search);
var productId = urlParams.get("id");

var URL = "https://dummyjson.com/products/" + productId;

fetch(URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(product) {
        showProduct(product);
    });

function showProduct(product) {
    var container = document.getElementById("detail");

    container.innerHTML =
        "<img src='" + product.thumbnail + "' alt='" + product.title + "' />" +
        "<div class='detail-info'>" +
            "<p class='category'>" + product.category + "</p>" +
            "<h2>" + product.title + "</h2>" +
            "<p class='price'>$" + product.price + "</p>" +
            "<p class='rating'>★ " + product.rating + "</p>" +
            "<p class='description'>" + product.description + "</p>" +
            "<p class='stock'>In Stock: " + product.stock + " units</p>" +
            "<div class='qty-row'>" +
                "<label>Qty:</label>" +
                "<input type='number' id='qty-input' value='1' min='1' max='" + product.stock + "' />" +
            "</div>" +
            "<button class='btn-add' onclick='handleAddToCart()'>Add to Cart</button>" +
            "<p id='added-msg' class='added-msg'></p>" +
        "</div>";

    window.currentProduct = product;
}

function handleAddToCart() {
    var qtyInput = document.getElementById("qty-input");
    var qty = parseInt(qtyInput.value);

    if (qty < 1) {
        qty = 1;
    }

    addToCart(window.currentProduct, qty);

    var msg = document.getElementById("added-msg");
    msg.textContent = "✓ Added " + qty + " item(s) to cart!";
}