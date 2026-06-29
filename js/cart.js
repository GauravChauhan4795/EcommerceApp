function getCart() {
    var cart = localStorage.getItem("cart");
    if (cart) {
        return JSON.parse(cart);
    }
    return [];
}

function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(product, qty) {
    if (!qty) {
        qty = 1;
    }

    var cart = getCart();

    var found = false;
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === product.id) {
            cart[i].qty = cart[i].qty + qty;
            found = true;
            break;
        }
    }

    if (!found) {
        product.qty = qty;
        cart.push(product);
    }

    saveCart(cart);
}

function removeFromCart(productId) {
    var cart = getCart();
    var newCart = [];

    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== productId) {
            newCart.push(cart[i]);
        }
    }

    saveCart(newCart);
}

function increaseQty(productId) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            cart[i].qty = cart[i].qty + 1;
            break;
        }
    }
    saveCart(cart);
}

function decreaseQty(productId) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === productId) {
            if (cart[i].qty > 1) {
                cart[i].qty = cart[i].qty - 1;
            }
            break;
        }
    }
    saveCart(cart);
}