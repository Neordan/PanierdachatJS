document.addEventListener("DOMContentLoaded", function() {
    
    
    function calculTotalLine(productLine) {
        let price = parseFloat(productLine.querySelector('.price').textContent);
        let quantity = productLine.querySelector('.quantity').value;

        let total = (price * quantity);
        productLine.querySelector('.totalLine').textContent = total + '€';
        calculTotalProducts();
    }

    
    let tableLine = document.querySelectorAll('tbody tr');
    // boucle pour changer les prix des lignes en fonction des quantités choisies
    tableLine.forEach(function(tableLine) {
        let quantitySelect = tableLine.querySelector('.quantity');
        
        quantitySelect.addEventListener("change", function() {
            calculTotalLine(tableLine);
        });

        // Pour avoir le total pour un seul article à la base
        calculTotalLine(tableLine);
    });

    function calculTotalProducts() {
        let total = 0;
        let totalLines = document.querySelectorAll('.totalLine');
        // boucle pour récupérer les prix des lignes
        totalLines.forEach(function(item) {
            total += parseFloat(item.textContent);
        });
        document.getElementById('totalLines').textContent = total + '€';
        calculTotalDelivery()
    }
    
    function calculTotalDelivery() {
        let totalPrice = parseFloat(document.getElementById('totalLines').textContent);
        let selectedDelivery = document.getElementById('delivery').value;
        let deliveryPrice = (selectedDelivery === 'relais') ? 5 : 10;
    
        document.getElementById('totalDelivery').textContent = deliveryPrice + '€';
        document.getElementById('totalWithDelivery').textContent = (totalPrice + deliveryPrice) + '€';
    }

    // Evenement pour changer la livraison
    document.getElementById('delivery').addEventListener("change", function() {
        calculTotalDelivery();
    });  
})



// Validation du formulaire
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('deliveryForm');

    form.addEventListener('submit', function(event) {
        // Pas de rechargement 
        event.preventDefault();
        if (validateForm()) {
            console.log('Formulaire valide.');
        }
    });

})