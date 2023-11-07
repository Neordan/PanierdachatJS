document.addEventListener("DOMContentLoaded", function() {
    function calculTotalLine(productLine) {
        let price = parseFloat(productLine.querySelector('.price').textContent);
        let quantity = parseInt(productLine.querySelector('.quantity').value);

        let total = (price * quantity);
        productLine.querySelector('.totalLine').textContent = total + '€';
        calculTotalArticles();
    }

    function calculTotalArticles() {
        let total = 0;
        let totalLines = document.querySelectorAll('.totalLine');
        totalLines.forEach(function(item) {
            total += parseFloat(item.textContent);
        });
        document.getElementById('totalLines').textContent = total + '€';
        calculTotalWithDelivery()
    }

    function calculTotalWithDelivery() {
        let totalArticles = parseFloat(document.getElementById('totalLines').textContent);
        let selectedDelivery = document.getElementById('delivery').value;
        let deliveryPrice = (selectedDelivery === 'relais') ? 5 : 10;

        document.getElementById('totalDelivery').textContent = deliveryPrice + '€';
        document.getElementById('totalWithDelivery').textContent = (totalArticles + deliveryPrice) + '€';
    }
})