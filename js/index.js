var URL = "https://dummyjson.com/products?limit=194";

fetch(URL)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        displayProducts(data.products);
    });

function displayProducts(products) {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (var i = 0; i < products.length; i++) {
        var product = products[i];

        var card = document.createElement("div");
        card.className = "card";
        card.setAttribute("data-id", product.id);

        card.innerHTML =
            "<img src='" + product.thumbnail + "' alt='" + product.title + "' />" +
            "<h3>" + product.title + "</h3>" +
            "<p>$" + product.price + "</p>";

        card.addEventListener("click", function() {
            var id = this.getAttribute("data-id");
            window.location.href = "product.html?id=" + id;
        });

        grid.appendChild(card);
    }
}