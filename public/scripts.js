const generateCouponBtn = document.getElementById('generateCouponBtn');
const containerDisplayer = document.getElementById('container-displayer');
const codeDisplayer = document.getElementById('code-displayer');


generateCouponBtn.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:3000/coupon', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
        });
        if (!response.ok) {
            throw new Error('Request faild');

        }
        const coupon = await response.json();
        console.log(coupon);
        displayCode(coupon.code);
        return coupon;
    } catch (err) {
        console.log(err);
    }
});

function render() {
    containerDisplayer.style.display = 'none';
}

function displayCode(code) {
    containerDisplayer.style.display = 'block';
    codeDisplayer.textContent = code;
}

