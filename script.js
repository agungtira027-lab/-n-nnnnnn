// ================== DATA ==================
let cart = [];
let total = 0;

// ================== LOGIN ==================
function loginManual(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if(email === "" || password === ""){
        alert("Isi semua dulu!");
        return;
    }

    localStorage.setItem("user", email);
    showApp();
}

function showApp() {
    let user = localStorage.getItem("user");

    if(user){
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("app").style.display = "block";
        document.getElementById("user").innerText = "Halo, " + user;

        initSearch(); // aktifkan search setelah app muncul
    }
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}

// ================== CART ==================
function addToCart(name, price) {
    let item = cart.find(i => i.name === name);

    if(item){
        item.qty++;
    } else {
        cart.push({name, price, qty: 1});
    }

    updateCart();
}

function updateCart() {
    let list = document.getElementById("cartList");
    list.innerHTML = "";

    total = 0;

    cart.forEach((item, index) => {
        let subtotal = item.price * item.qty;
        total += subtotal;

        let li = document.createElement("li");
        li.innerHTML = `
            <b>${item.name}</b><br>
            Rp ${item.price} x ${item.qty} = <b>Rp ${subtotal}</b><br>
            <button onclick="tambahQty(${index})">+</button>
            <button onclick="kurangQty(${index})">-</button>
            <button onclick="removeItem(${index})">Hapus</button>
        `;
        list.appendChild(li);
    });

    document.getElementById("count").innerText =
        cart.reduce((a, b) => a + b.qty, 0);

    document.getElementById("total").innerText = total;
}

function tambahQty(i){
    cart[i].qty++;
    updateCart();
}

function kurangQty(i){
    if(cart[i].qty > 1){
        cart[i].qty--;
    } else {
        cart.splice(i,1);
    }
    updateCart();
}

function removeItem(i){
    cart.splice(i,1);
    updateCart();
}

// ================== CART UI ==================
function toggleCart(){
    document.getElementById("cartBox").classList.toggle("active");
}

// ================== THEME ==================
function toggleTheme(){
    document.body.classList.toggle("light-mode");
}

// ================== CHECKOUT ==================
function checkout(){
    if(cart.length === 0){
        alert("Keranjang kosong!");
        return;
    }

    alert("🎉 Checkout berhasil!\nTotal: Rp " + total);

    cart = [];
    total = 0;
    updateCart();
}

// ================== SEARCH ==================
function initSearch(){
    let searchInput = document.querySelector(".search");

    if(!searchInput) return;

    searchInput.addEventListener("keyup", function(){

        let keyword = this.value.toLowerCase();

        let cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            let title = card.querySelector("h3")
                .innerText
                .toLowerCase();

            if(title.includes(keyword)){
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });
}

// ================== AUTO LOGIN ==================
showApp();
initSearch();