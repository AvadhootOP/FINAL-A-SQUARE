let cart = [];
let discount = 0;

const products = [
  { name: "Classic PB 250g", price: 160 },
  { name: "Crunchy PB 250g", price: 170 },
  { name: "Chocolate PB 250g", price: 200 },
  { name: "Crunchy Chocolate PB", price: 210 },
  { name: "Protein Cookie", price: 40 }
];

/* LOAD PRODUCTS */
const grid = document.getElementById("productGrid");

products.forEach((p, i) => {
  let div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="add(${i})">Add</button>
  `;
  grid.appendChild(div);
});

function add(i){
  cart.push(products[i]);
  updateCart();
}

/* CART */
function updateCart(){
  document.getElementById("cartCount").innerText = cart.length;

  let html = "";
  let total = 0;

  cart.forEach(item => {
    html += `<p>${item.name} - ₹${item.price}</p>`;
    total += item.price;
  });

  let final = total - (total * discount);

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = "Total: ₹" + final;
}

/* CART TOGGLE */
function toggleCart(){
  document.getElementById("cart").classList.toggle("open");
}

/* COUPON */
function applyCoupon(){
  let code = document.getElementById("coupon").value;

  if(code === "ASquare10"){
    discount = 0.10;
    alert("Coupon Applied!");
  } else {
    alert("Invalid Coupon");
  }

  updateCart();
}

/* ORDER */
function placeOrder(){
  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let address = document.getElementById("address").value;

  let msg = `
A SQUARE ORDER
Name:${name}
Phone:${phone}
Email:${email}
Address:${address}
Items:${cart.map(c=>c.name).join(", ")}
`;

  window.open(`https://wa.me/8830626573?text=${encodeURIComponent(msg)}`);
}

/* BMI */
function calcBMI(){
  let h = document.getElementById("height").value/100;
  let w = document.getElementById("weight").value;

  let bmi = (w/(h*h)).toFixed(2);

  let status = bmi < 18.5 ? "Underweight" :
               bmi < 25 ? "Normal" : "Overweight";

  document.getElementById("bmiResult").innerText =
  `BMI: ${bmi} (${status})`;
}

/* PROTEIN */
function calcProtein(){
  let w = document.getElementById("pweight").value;
  let g = document.getElementById("goal").value;

  let protein = (w*g).toFixed(1);

  document.getElementById("proteinResult").innerText =
  `Daily Protein: ${protein}g`;
}

/* SCROLL */
function scrollToProducts(){
  document.getElementById("products").scrollIntoView({behavior:"smooth"});
  }
