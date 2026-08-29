
/* =========================================
   PLATE & POUR
   RESTAURANT JAVASCRIPT
========================================= */


/* =========================================
   CART
========================================= */

let cart = [];


/* =========================================
   ELEMENTS
========================================= */

const cartCount = document.getElementById("cart-count");

const cartModal = document.getElementById("cart-modal");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const addButtons = document.querySelectorAll(".add-btn");

const categoryButtons =
    document.querySelectorAll(".category-btn");

const foodCards =
    document.querySelectorAll(".food-card");


/* =========================================
   ADD TO CART
========================================= */

addButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const name =
            button.getAttribute("data-name");

        const price =
            Number(button.getAttribute("data-price"));


        const existingItem =
            cart.find(function(item) {

                return item.name === name;

            });


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                quantity: 1

            });

        }


        updateCart();


        /* BUTTON FEEDBACK */

        const originalText =
            button.textContent;

        button.textContent = "Added ✓";


        setTimeout(function() {

            button.textContent =
                originalText;

        }, 900);


    });

});


/* =========================================
   UPDATE CART
========================================= */

function updateCart() {


    /* CART COUNT */

    let totalQuantity = 0;


    cart.forEach(function(item) {

        totalQuantity += item.quantity;

    });


    cartCount.textContent =
        totalQuantity;



    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <p class="empty-cart">
                Your cart is empty.
            </p>
        `;

        cartTotal.textContent =
            "Rs. 0";

        return;

    }



    /* CART ITEMS */

    cartItems.innerHTML = "";


    let total = 0;


    cart.forEach(function(item, index) {


        const itemTotal =
            item.price * item.quantity;


        total += itemTotal;


        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <br>

                <small>
                    Rs. ${item.price}
                    × ${item.quantity}
                </small>

            </div>


            <div>

                <strong>
                    Rs. ${itemTotal}
                </strong>

                <button
                    onclick="removeItem(${index})"
                    style="
                        margin-left:10px;
                        border:none;
                        background:none;
                        color:#5c4033;
                        cursor:pointer;
                        font-size:16px;
                    "
                    aria-label="Remove item">

                    ×

                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartTotal.textContent =
        "Rs. " + total;

}


/* =========================================
   REMOVE CART ITEM
========================================= */

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


/* =========================================
   OPEN CART
========================================= */

function openCart() {

    cartModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* =========================================
   CLOSE CART
========================================= */

function closeCart() {

    cartModal.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* =========================================
   CLOSE WHEN CLICKING OUTSIDE
========================================= */

cartModal.addEventListener(
    "click",
    function(event) {

        if (event.target === cartModal) {

            closeCart();

        }

    }
);


/* =========================================
   CATEGORY FILTER
========================================= */

categoryButtons.forEach(function(button) {


    button.addEventListener(
        "click",
        function() {


            /* ACTIVE BUTTON */

            categoryButtons.forEach(
                function(btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add(
                "active"
            );


            /* SELECT CATEGORY */

            const selectedCategory =
                button.getAttribute(
                    "data-category"
                );


            /* SHOW / HIDE CARDS */

            foodCards.forEach(
                function(card) {


                    const cardCategory =
                        card.getAttribute(
                            "data-category"
                        );


                    if (
                        selectedCategory ===
                        "all" ||
                        selectedCategory ===
                        cardCategory
                    ) {

                        card.style.display =
                            "block";


                        card.style.animation =
                            "cardAppear 0.5s ease";


                    } else {

                        card.style.display =
                            "none";

                    }

                }
            );


        }
    );

});


/* =========================================
   CHECKOUT
========================================= */

function checkout() {


    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add something delicious first!"
        );

        return;

    }


    let orderMessage =
        "Your Plate & Pour order has been received!";


    alert(orderMessage);


    cart = [];


    updateCart();


    closeCart();

}


/* =========================================
   ESC KEY CLOSES CART
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            closeCart();

        }

    }
);


/* =========================================
   INITIAL CART
========================================= */

updateCart();

