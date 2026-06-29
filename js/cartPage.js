showCart();

function showCart() {
    var cart = getCart();
    var container = document.getElementById("cartContent");

    if (cart.length === 0) {
        container.innerHTML =
            "<div class='empty-cart'>" +
                "<p>Your cart is empty!</p>" +
                "<a href='index.html'>Continue Shopping</a>" +
            "</div>";
        return;
    }

    var itemsHTML = "<div class='cart-items'>";

    for (var i = 0; i < cart.length; i++) {
        var item = cart[i];
        var itemTotal = item.price * item.qty;

        itemsHTML +=
            "<div class='cart-item'>" +
                "<img src='" + item.thumbnail + "' alt='" + item.title + "' />" +
                "<div class='cart-item-info'>" +
                    "<h3>" + item.title + "</h3>" +
                    "<p>$" + item.price + " each</p>" +
                "</div>" +
                "<div class='qty-controls'>" +
                    "<button onclick='handleDecrease(" + item.id + ")'>-</button>" +
                    "<span>" + item.qty + "</span>" +
                    "<button onclick='handleIncrease(" + item.id + ")'>+</button>" +
                "</div>" +
                "<div class='item-total'>$" + itemTotal.toFixed(2) + "</div>" +
                "<button class='remove-btn' onclick='handleRemove(" + item.id + ")'>✕</button>" +
            "</div>";
    }

    itemsHTML += "</div>";

    // Calculate totals
    var subtotal = 0;
    for (var j = 0; j < cart.length; j++) {
        subtotal = subtotal + cart[j].price * cart[j].qty;
    }

    var delivery = subtotal < 50 ? 4.99 : 0;
    var tax = subtotal * 0.08;
    var total = subtotal + delivery + tax;

    var summaryHTML =
        "<div class='bill-summary'>" +
            "<h2>Bill Summary</h2>" +
            "<div class='bill-row'><span>Subtotal</span><span>$" + subtotal.toFixed(2) + "</span></div>" +
            "<div class='bill-row'><span>Delivery</span><span>" + (delivery === 0 ? "FREE" : "$" + delivery.toFixed(2)) + "</span></div>" +
            "<div class='bill-row'><span>Tax (8%)</span><span>$" + tax.toFixed(2) + "</span></div>" +
            "<hr class='bill-divider' />" +
            "<div class='bill-total'><span>Total</span><span>$" + total.toFixed(2) + "</span></div>" +
            "<button class='btn-checkout' onclick='handleCheckout()'>Proceed to Checkout</button>" +
        "</div>";

    container.innerHTML = itemsHTML + summaryHTML;
}

function handleIncrease(productId) {
    increaseQty(productId);
    showCart();
}

function handleDecrease(productId) {
    decreaseQty(productId);
    showCart();
}

function handleRemove(productId) {
    removeFromCart(productId);
    showCart();
}

function handleCheckout() {
    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    showCart();
}