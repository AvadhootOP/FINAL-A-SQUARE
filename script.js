/*==========================================
A Square Premium Website
script.js
Version : V3 Ultra Premium
==========================================*/

// ================= LOADER =================

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("loader").style.opacity="0";

setTimeout(()=>{

document.getElementById("loader").style.display="none";

},500);

},1200);

});

// ================= SCROLL BAR =================

window.addEventListener("scroll",()=>{

const scrollTop=document.documentElement.scrollTop;

const height=document.documentElement.scrollHeight-document.documentElement.clientHeight;

const progress=(scrollTop/height)*100;

document.getElementById("progressBar").style.width=progress+"%";

});

// ================= BACK TO TOP =================

const topBtn=document.getElementById("topBtn");

window.addEventListener("scroll",()=>{

if(window.scrollY>400){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

// ================= CART =================

let cart=[];

const cartItems=document.getElementById("cartItems");

const subtotal=document.getElementById("subtotal");

const grandTotal=document.getElementById("grandTotal");

const cartCount=document.getElementById("cartCount");

// ================= PRODUCT PRICE UPDATE =================

document.querySelectorAll(".product-card").forEach(card=>{

const select=card.querySelector(".size-select");

const price=card.querySelector(".price span");

const btn=card.querySelector(".cart-btn");

if(select){

select.onchange=()=>{

price.innerText=select.value;

btn.dataset.price=select.value;

};

}

});

// ================= ADD TO CART =================

document.querySelectorAll(".cart-btn").forEach(btn=>{

btn.onclick=()=>{

const card=btn.closest(".product-card");

const qty=parseInt(card.querySelector("input").value);

const item={

name:btn.dataset.name,

price:parseInt(btn.dataset.price),

qty:qty

};

cart.push(item);

updateCart();

};

});

// ================= UPDATE CART =================

function updateCart(){

cartItems.innerHTML="";

let total=0;

cart.forEach((item,index)=>{

total+=item.price*item.qty;

cartItems.innerHTML+=`

<div class="cart-item">

<h4>${item.name}</h4>

<p>

₹${item.price}

×

${item.qty}

</p>

<button onclick="removeItem(${index})">

Remove

</button>

</div>

`;

});

subtotal.innerText="₹"+total;

grandTotal.innerText="₹"+total;

cartCount.innerText=cart.length;

localStorage.setItem("cart",JSON.stringify(cart));

}

// ================= REMOVE ITEM =================

function removeItem(index){

cart.splice(index,1);

updateCart();

}

// ================= LOAD CART =================

if(localStorage.getItem("cart")){

cart=JSON.parse(localStorage.getItem("cart"));

updateCart();

}

// ================= CART DRAWER =================

document.getElementById("cartBtn").onclick=()=>{

document.getElementById("cartDrawer").classList.add("open");

};

document.getElementById("closeCart").onclick=()=>{

document.getElementById("cartDrawer").classList.remove("open");

};
/*==========================================
A Square Premium Website
script.js - Part 2
==========================================*/

// ---------------- Quantity Buttons ----------------

document.querySelectorAll(".product-card").forEach(card=>{

const minus=card.querySelector(".minus");
const plus=card.querySelector(".plus");
const input=card.querySelector("input");

if(minus && plus && input){

plus.addEventListener("click",()=>{

input.value=parseInt(input.value)+1;

});

minus.addEventListener("click",()=>{

if(parseInt(input.value)>1){

input.value=parseInt(input.value)-1;

}

});

}

});

// ---------------- Coupon System ----------------

const couponInput=document.getElementById("coupon");
const couponBtn=document.getElementById("applyCoupon");

let discount=0;

couponBtn.onclick=()=>{

const code=couponInput.value.trim().toUpperCase();

if(code==="ASQUARE10"){

discount=10;

alert("🎉 Coupon Applied Successfully! 10% OFF");

}else{

discount=0;

alert("❌ Invalid Coupon");

}

updateTotal();

};

function updateTotal(){

let total=0;

cart.forEach(item=>{

total+=item.price*item.qty;

});

const final=Math.round(total-(total*discount/100));

subtotal.innerText="₹"+total;

grandTotal.innerText="₹"+final;

}

// ---------------- WhatsApp Checkout ----------------

document.getElementById("checkout").onclick=()=>{

if(cart.length===0){

alert("Your cart is empty.");

return;

}

document.getElementById("checkoutPopup").style.display="flex";

};

document.getElementById("placeOrder").onclick=()=>{

const name=document.getElementById("customerName").value.trim();
const phone=document.getElementById("customerPhone").value.trim();
const address=document.getElementById("customerAddress").value.trim();
const city=document.getElementById("customerCity").value.trim();
const pin=document.getElementById("customerPin").value.trim();

if(!name||!phone||!address||!city||!pin){

alert("Please fill all details.");

return;

}

let order="";

let total=0;

cart.forEach(item=>{

order+=`${item.name} x ${item.qty} = ₹${item.price*item.qty}\n`;

total+=item.price*item.qty;

});

const final=Math.round(total-(total*discount/100));

const msg=

`🛒 *A Square Order*

👤 Name : ${name}

📞 Phone : ${phone}

🏠 Address :
${address}

🏙 City : ${city}

📮 Pincode : ${pin}

━━━━━━━━━━━━━━

${order}

━━━━━━━━━━━━━━

Subtotal : ₹${total}

Discount : ${discount}%

Total : ₹${final}

🚚 Delivery Charges :
Will be shared manually.

Thank You ❤️
Fuel Your Day, A Healthy Way`;

window.open(

"https://wa.me/918830626573?text="+encodeURIComponent(msg),

"_blank"

);

};

// ---------------- Wishlist ----------------

document.querySelectorAll(".wishlist").forEach(btn=>{

btn.onclick=()=>{

btn.classList.toggle("active");

btn.innerHTML=

btn.classList.contains("active")

?'<i class="fa-solid fa-heart"></i>'

:'<i class="fa-regular fa-heart"></i>';

};

});

// ---------------- Product Search ----------------

const search=document.getElementById("productSearch");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".product-card").forEach(card=>{

card.style.display=

card.innerText.toLowerCase().includes(value)

?"block":"none";

});

});

}

// ---------------- BMI + Protein Calculator ----------------

function calculateHealth(){

const height=parseFloat(document.getElementById("height").value);

const weight=parseFloat(document.getElementById("weight").value);

const result=document.getElementById("healthResult");

if(!height||!weight){

result.innerHTML="<div class='result-card'>Please enter height and weight.</div>";

return;

}

const bmi=weight/((height/100)*(height/100));

let status="";
let color="";

if(bmi<18.5){

status="🔵 Underweight";
color="#3498db";

}

else if(bmi<25){

status="🟢 Normal Weight";
color="#27ae60";

}

else if(bmi<30){

status="🟠 Overweight";
color="#f39c12";

}

else{

status="🔴 Obese";
color="#e74c3c";

}

const protein=Math.round(weight*1.2);

result.innerHTML=

`<div class="result-card">

<h2 style="color:${color};">${status}</h2>

<h1>${bmi.toFixed(1)}</h1>

<h3>BMI</h3>

<hr>

<h2>${protein} g/day</h2>

<p>Recommended Daily Protein Intake</p>

<br>

<p>

🥜 A Square Peanut Butter contains <b>25% Protein</b>.

</p>

<p>

🍪 Protein Cookie contains <b>7g Protein</b>.

</p>

</div>`;

}

// ---------------- Counter Animation ----------------

document.querySelectorAll(".counter").forEach(counter=>{

const target=+counter.dataset.target;

let count=0;

const speed=target/100;

const update=()=>{

count+=speed;

if(count<target){

counter.innerText=Math.floor(count);

requestAnimationFrame(update);

}else{

counter.innerText=target;

}

};

update();

});

// ---------------- Theme Toggle ----------------

const themeBtn=document.getElementById("themeBtn");

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

themeBtn.innerHTML=

document.body.classList.contains("dark")

?'<i class="fa-solid fa-sun"></i>'

:'<i class="fa-solid fa-moon"></i>';

};

// ---------------- Newsletter ----------------

const newsBtn=document.querySelector(".newsletter-form button");

if(newsBtn){

newsBtn.onclick=()=>{

const email=document.querySelector(".newsletter-form input").value;

if(email===""){

alert("Enter your email.");

return;

}

alert("🎉 Thank you for subscribing!");

document.querySelector(".newsletter-form input").value="";

};

}
