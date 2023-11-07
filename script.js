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
    }

    function calculTotalWithDelivery() {

    }
})