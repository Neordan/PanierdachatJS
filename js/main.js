document.addEventListener("DOMContentLoaded", function () {

    async function productsDisplay() {
        let reponse = await fetch("./products.json");
        let products = await reponse.json();
        let tbody = document.querySelector("tbody");
        
        // Affichage des produits
        for (let product of products) {
            createLineProducts(product, tbody);
        }
    }

    function createLineProducts(item, DOM_location) {
        let lineProduct = document.createElement("tr");
        lineProduct.classList.add("cart_product");
        lineProduct.innerHTML = `
            <td>${item.name}</td>
            <td class="unit_price" data-unit-price="${item.price}">
                <span class="value">${item.price}</span> €
            </td>
            <td class="quantity">
                <input type="number" class="influent-price-on-change" value="1" />
            </td>
            <td class="total_price" data-total-price="${item.price}"></td>
            <td>
                <select class="influent-price-on-change">
                    <option>1</option>
                    <option>2</option>
                </select>
            </td>
            <td>
                <button class="remove_product">X</button>
            </td>
        `;
        DOM_location.appendChild(lineProduct);
    }


    /**
     * Calcul le total d'une ligne dans le tableau
     * @param {Element} tr_cart_product
     * @returns {number}
     */
    function calculTotalProduct(tr_cart_product) {
        let quantity = tr_cart_product.querySelector('.quantity input').value;
        let unit_price = parseFloat(tr_cart_product.querySelector('.unit_price').dataset.unitPrice);

        quantity = (quantity < 0) ? 0 : quantity;
        tr_cart_product.querySelector('.quantity input').value = quantity;

        let total = quantity * unit_price;

        tr_cart_product.querySelector('.total_price').textContent = total + '€';
        tr_cart_product.querySelector('.total_price').dataset.totalPrice = total;

        console.log("Quantity:", quantity);
        console.log("Unit Price:", unit_price);

        return total;
    }

    /**
     * 
     * Calcule le prix en fonction de la quantité choisie 
     */
    function changePriceLineProduct(tr_cart_product) {
        tr_cart_product.querySelectorAll('.influent-price-on-change').forEach((element) => {
            element.addEventListener('change', function (event) {
                calculTotalProduct(tr_cart_product);
                calculTotalCart();
            })
        })
    }

    /**
     * Calcul le total du panier
     */
    function calculTotalCart() {
        let dom_total_prices = document.querySelectorAll('.cart_product .total_price')
        let total = 0;
        dom_total_prices.forEach(function (dom_total_price) {
            total += parseFloat(dom_total_price.dataset.totalPrice);
        });

        document.querySelector('#cart .total_cart').textContent = total + "€";
        calculTotalDelivery()
    }

    /**
     * Supprime une ligne de produit de la commande
     */
    function deleteProduct(tr_cart_product) {
        tr_cart_product.querySelector('.remove_product').addEventListener('click', function () {
            tr_cart_product.remove();
            console.log(tr_cart_product.querySelector('.remove_product'))
            calculTotalCart();
        });
    }

    /**
     * Calcule des frais de livraison
     */
    function calculTotalDelivery() {
        let totalPrice = parseFloat(document.querySelector('.total_cart').textContent);
        let selectedModeDelivery = document.getElementById('delivery_choice').value;
        let deliveryPrice = (selectedModeDelivery === 'relais') ? 5 : 10;
        if (totalPrice > 0) {
            document.getElementById('deliveryPrice').textContent = deliveryPrice + ' €';
            document.getElementById('totalWithDelivery').textContent = (totalPrice + deliveryPrice) + ' €';
        } else {
            document.getElementById('deliveryPrice').textContent = '0 €';
            document.getElementById('totalWithDelivery').textContent = '0 €';
        }
        // Evenement pour changer la livraison
        document.getElementById('delivery_choice').addEventListener("change", calculTotalDelivery)
    }

    /**
     * Initialise le code
     */
    function init() {
        productsDisplay();
        let tr_cart_products = document.querySelectorAll('.cart_product');
        tr_cart_products.forEach(function (tr_cart_product) {
            
            calculTotalProduct(tr_cart_product);

            changePriceLineProduct(tr_cart_product);

            deleteProduct(tr_cart_product);
        })
        calculTotalCart();
    }

    init()

    // Validation du formulaire de livraison
    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById('deliveryForm');

        form.addEventListener('submit', function (event) {
            if (validateForm()) {
                alert('Formulaire valide.');
            }
        });

        function validateForm() {
            const nom = document.getElementById('nom').value;
            const prenom = document.getElementById('prenom').value;
            const rue = document.getElementById('rue').value;
            const codePostal = document.getElementById('codePostal').value;
            const ville = document.getElementById('ville').value;
            const email = document.getElementById('email').value;
            const telephone = document.getElementById('telephone').value;

            // Vérification des champs obligatoires
            if (nom.trim() === '' || prenom.trim() === '' || rue.trim() === '' || codePostal.trim() === '' || ville.trim() === '' || (email.trim() === '' && telephone.trim() === '')) {
                alert('Veuillez remplir tous les champs obligatoires.');
                return false;
            }

            return true;
        }
    })
})
