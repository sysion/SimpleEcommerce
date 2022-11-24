import Products from "./Products.js";


const main = document.querySelector('main');
const empty_cart = document.querySelector('.empty-cart');
const checkout = document.querySelector('.checkout');
const menu_item_cart = document.querySelector('nav ul li:last-child a');  //cart menu item
const menu_item_cart_span = document.querySelector('nav ul li:last-child a span');
const menu_item_cart_strong = document.querySelector('nav ul li:last-child a strong');
const cart_page = document.querySelector('.cart'); 
const close_cart = document.querySelector('.close-cart');
const cart_total = document.querySelector('.cart-total strong');
const btn_label = "Add To Cart";
const img_alt = "Image for ";
let cart = [];
let local_cart = [];
let users = [];
const menu_login = document.querySelector('nav ul li:nth-child(3)');
const form_login_register = document.querySelector('#login-register');
const cart_checkout = document.querySelector('.cart-checkout');
const cart_checkout_ul = document.querySelector('.purchases ul');
const cart_checkout_total = document.querySelector('.cart-checkout p strong');
const cancel_checkout_btn = document.querySelector('.cancel-checkout-btn');
const continue_checkout_btn = document.querySelector('.continue-checkout-btn');
var current_user = 'nobody';
var baseUrl = 'http://127.0.0.1:8080/';			// development
//var baseUrl = 'https://github.com/sysion/SimpleEcommerce/';			// production

const formHtml = `<div class="form-header">
					<a href="index.html"><img src="image/logo4.png" alt="Logo image" /></a>
					<h2>Login</h2>
					<a href="" class="close-form">X</a>
				</div>

				<div class="form-input">
					<label for="email">Email</label>
					<input type="email" id="email" placeholder="abc@xyz.org" required />
				</div>

				<div class="form-input">
					<label for="password">Password</label>
					<input type="password" id="password" required />
				</div>

				<div class="form-input hide-element">
					<label for="password-confirm">Confirm Password</label>
					<input type="password" id="password-confirm" required />
				</div>

				<div class="form-submit">
					<button type="submit">Login</button>
				</div>

				<div class="form-switch">
					<p>No account?</p>
					<a href="#" class="form-signup">Sign up</a>
				</div>

				<div class="form-logout">
					<a href="#" class="form-logout-link">Log Out</a>
				</div>`;

/**********************************************************************
*** This method of assign functions to variables is OK              ***
***********************************************************************/
let cs = function createSection(key, product){
	var section = document.createElement('section');
	var section_title = document.createElement('h2');
	var section_img = document.createElement('img');
	var section_desc = document.createElement('p');
	var section_price = document.createElement('p');
	var section_button = document.createElement('button');

	section.classList.add('product-item');
	section_title.classList.add('product-name');
	section_img.classList.add('product-img');
	section_desc.classList.add('product-desc');
	section_price.classList.add('product-price');
	section_button.classList.add('add');
	
	section_title.innerHTML = product.name;
	section_img.src = product.img;
	section_img.alt = img_alt + product.name + '_' + key;
	section_desc.innerHTML = product.desc;
	section_price.innerHTML = "N" + product.price;
	section_button.innerHTML = btn_label;
	section_button.addEventListener('click', atc);				//ok also

	section.appendChild(section_title);
	section.appendChild(section_img);
	section.appendChild(section_desc);
	section.appendChild(section_price);
	section.appendChild(section_button);

	main.appendChild(section);
}

//load data from Products.js
let up = function updatePage(){
	for (let key in Products){
		cs(key, Products[key]);
	}

	//load previous session from local storage
	cart = getFromLocalStorage('cart');
	local_cart = getFromLocalStorage('local_cart');
	users = getFromLocalStorage('users');
	
	users.forEach(user => {	//arrow function variant
		if (user['isLogin'] === 1){
			current_user = Object.keys(user)[0];
		}
	});

	if (local_cart.length > 0){
		local_cart.forEach(function(item){
			cartEntry(item);
		});
		menu_item_cart_strong.innerHTML = cart.length;
		menu_item_cart_span.classList.remove('hide-cart-count');
		totalPurchase(local_cart);
	}
}

//using event here because this is serving as callback for addEventListener
let atc = function addToCart(event){  
	var parent = event.target.closest('section'); 
	var canAdd = true;

	if (cart){
		var cart_product_name = parent.getElementsByClassName('product-name')[0].innerHTML;
		var pn = cart.forEach(product => {
			if (product.name === cart_product_name){
				canAdd = false;
			}
		});
	}

	if (parent.className === 'product-item' && canAdd){
		/********************************************************************************
		** using this method because element is dynamically created and 
		** getElementBy{*}/getElementsBy{*} and
		** document.querySelector/document.querySelectorAll are not working
		********************************************************************************/
		var children = parent.children;      
		var name = children[0].innerHTML;
		var img = '.' + children[1].src.split(window.location.origin )[1];
		var key = children[1].alt.split('_')[1];
		var desc = children[2].innerHTML;
		var price = children[3].innerHTML;

		var product = {name: name, img: img, desc: desc, price: price};
		var local_product = {name: name, img: img, desc: desc, price: price, qty: 1};
		cart.push(product);
		local_cart.push(local_product);
		menu_item_cart_strong.innerHTML = cart.length;
		menu_item_cart_span.classList.remove('hide-cart-count');
		totalPurchase(local_cart);

		//add to local storage
		saveToLocalStorage('cart', cart);
		saveToLocalStorage('local_cart', local_cart);

		cartEntry(product);
	}
}

function cartEntry(product){
	//element already in DOM (parent of elements to be added)
	var cart_main = document.querySelector('.cart-main');

	//elements dynamically added to DOM
	var cart_item = document.createElement('div');
	var cart_detail = document.createElement('div');
	var product_name = document.createElement('span');
	var product_desc = document.createElement('span');
	var product_count = document.createElement('span');
	var product_price = document.createElement('span');
	var cart_number = document.createElement('div');
	var add_item = document.createElement('button');
	var minus_item = document.createElement('button');
	var delete_item = document.createElement('button');

	cart_item.classList.add('cart-item');
	cart_detail.classList.add('cart-detail');
	product_name.classList.add('product-name', 'cart-detail-span');
	product_desc.classList.add('product-desc', 'cart-detail-span');
	product_count.classList.add('product-count', 'cart-detail-span');
	product_price.classList.add('product-price', 'cart-detail-span');
	cart_number.classList.add('cart-number');
	add_item.classList.add('add-item', 'cart-number-btn');
	minus_item.classList.add('minus-item', 'cart-number-btn');
	delete_item.classList.add('delete-item', 'cart-number-btn');

	product_name.innerHTML = product.name; 	
	product_desc.innerHTML = product.desc;
	if (product.qty){
		product_count.innerHTML = product.qty;	
	}
	else{
		product_count.innerHTML = 1;
	}
	product_price.innerHTML = product.price;
	add_item.innerHTML = "+";
	minus_item.innerHTML = "-";
	delete_item.innerHTML = "x";

	add_item.addEventListener('click', itemAddOne);
	minus_item.addEventListener('click', itemRemoveOne);
	delete_item.addEventListener('click', deleteItem);

	cart_detail.appendChild(product_name);
	cart_detail.appendChild(product_desc);
	cart_detail.appendChild(product_count);
	cart_detail.appendChild(product_price);
	cart_number.appendChild(add_item);
	cart_number.appendChild(minus_item);
	cart_number.appendChild(delete_item);

	cart_item.appendChild(cart_detail);
	cart_item.appendChild(cart_number);

	cart_main.appendChild(cart_item);
}

function itemAddOne(event){
	var sibling = event.target.closest('div').previousSibling;
	var itemName = sibling.querySelector('.product-name').innerHTML;
	var itemCount = sibling.querySelector('.product-count').innerHTML;
	var itemPrice = sibling.querySelector('.product-price').innerHTML;
	itemPrice = parseFloat(itemPrice.substring(1));
	itemPrice = "N" + (itemPrice + (itemPrice/itemCount)).toFixed(2);
	itemCount = parseFloat(itemCount) + 1;
	sibling.querySelector('.product-count').innerHTML = itemCount;
	sibling.querySelector('.product-price').innerHTML = itemPrice;

	//add to local_cart (cart does not contain item count)
	local_cart.forEach(function(item){
		if(item.name === itemName){
			item.price = itemPrice;
			item.qty = itemCount;
			return;
		}
	});

	//add to local storage
	totalPurchase(local_cart);
	saveToLocalStorage('local_cart', local_cart);
}

function itemRemoveOne(event){
	var sibling = event.target.closest('div').previousSibling;
	var itemName = sibling.querySelector('.product-name').innerHTML;
	var itemCount = sibling.querySelector('.product-count').innerHTML;
	var itemPrice = sibling.querySelector('.product-price').innerHTML;

	if (parseInt(itemCount) === 1){
		deleteItem(event);
	}
	else{
		itemPrice = parseFloat(itemPrice.substring(1));
		itemPrice = "N" + (itemPrice - (itemPrice/itemCount)).toFixed(2);
		itemCount = parseFloat(itemCount) - 1;
		sibling.querySelector('.product-count').innerHTML = itemCount;
		sibling.querySelector('.product-price').innerHTML = itemPrice;

		//remove from local_cart (cart does not contain item count)
		local_cart.forEach(function(item){
			if(item.name === itemName){
				item.price = itemPrice;
				item.qty = itemCount;
				return;
			}
		});

		//remove from local storage
		totalPurchase(local_cart);
		saveToLocalStorage('local_cart', local_cart);
	}
}

function deleteItem(event){
	var targetParent = event.target.parentElement.parentElement;   //targets .cart-item from which event is triggered
	var cart_main = document.querySelector('.cart-main');
	
	//remove from cart and local_cart
	var cart_product_name = targetParent.getElementsByClassName('product-name')[0].innerHTML;
	var product = cart.filter(product => {   //filter RETURNS an array
		return product.name === cart_product_name
	});

	if (cart.length > 1){
		if (product[0].name === cart_product_name){
			var index = cart.indexOf(product[0]);

			if (index !== -1){
				cart.splice(index, 1);
				local_cart.splice(index, 1);	//since cart/local_cart have same entry except for qty
				menu_item_cart_strong.innerHTML = cart.length;
				totalPurchase(local_cart);
				saveToLocalStorage('cart', cart);
				saveToLocalStorage('local_cart', local_cart);
			}
			else {
				cart = [];
				local_cart = [];

				//remove from local storage
				saveToLocalStorage('cart', cart);
				saveToLocalStorage('local_cart', local_cart);

				menu_item_cart_span.classList.add('hide-cart-count');
				cart_total.innerHTML = 'N0.00';
			}	
		}
	}
	else {
		cart = [];
		local_cart = [];

		//remove from local storage
		saveToLocalStorage('cart', cart);
		saveToLocalStorage('local_cart', local_cart);

		menu_item_cart_span.classList.add('hide-cart-count');
		cart_total.innerHTML = 'N0.00';
	}

	cart_main.removeChild(targetParent);
}

function emptyCart(){
	var cart_main = document.querySelector('.cart-main');
	var cartItems = document.getElementsByClassName('cart-item');

	var empty = confirm('Empty All Cart Items?');

	if (empty){

		if (cartItems){
			Array.from(cartItems).forEach(function(cart_item){
				cart_main.removeChild(cart_item);
			});
			
			cart = [];
			local_cart = [];

			//clear localStorage also
			saveToLocalStorage('cart', cart);
			saveToLocalStorage('local_cart', local_cart);

			menu_item_cart_span.classList.add('hide-cart-count');
			cart_total.innerHTML = 'N0.00';
		}
	}	
}

function checkoutCart(){
	//display summary of purchase e.g. 3 items (total 6 quantities) - COST
	//payment by card(VISA, MASTER etc)
	//redirect to Payment Gateway/Service (check if Dummy/Demo API available)
	//redirect back to own site after successful/failed payment with result
	cart_checkout_ul.innerHTML = '';
	local_cart.forEach(function(item) {
		var li = document.createElement('li');
		var item_summary = item['name'] + ' (' + item['desc'] + '), ' + 'qty: ' + item['qty'] + ', ' + 'price: ' + item['price'];
		li.innerHTML = item_summary;
		cart_checkout_ul.appendChild(li);
	});

	cart_checkout_total.innerHTML = cart_total.innerHTML;
	cart_page.classList.remove('show-cart');
	cart_checkout.classList.remove('hide-form');
}

function continueCheckout(){
	//display summary of purchase e.g. 3 items (total 6 quantities) - COST
	//payment by card(VISA, MASTER etc)
	//redirect to Payment Gateway/Service (check if Dummy/Demo API available)
	//redirect back to own site after successful/failed payment with result

	users = getFromLocalStorage('users');
	var user_is_login = false;

	users.forEach(user => {	//arrow function variant
		if (user[current_user] && user['isLogin'] === 1){
			user_is_login = true;
		}
	});

	if (!user_is_login){
		cancel_checkout_btn.click();
		menu_login.click();
	}
	else{
		//do paystack stuff here
		var purchase_amount = Math.ceil(cart_checkout_total.innerHTML.substring(1) * 100);
		payWithPaystack(purchase_amount);
	}
}

function totalPurchase(cart){
	var total = 0;

	local_cart.forEach(function(cartItem){
		total = (parseFloat(total) + parseFloat(cartItem.price.substring(1))).toFixed(2);
	});

	total = 'N' + total;
	cart_total.innerHTML = total;
}

function saveToLocalStorage(name, cart){
	localStorage.setItem(name, JSON.stringify(cart));
}

function getFromLocalStorage(name){
	return JSON.parse(localStorage.getItem(name)) || [];
}

menu_item_cart.addEventListener('click', function(){
	cart_page.classList.add('show-cart');
});

close_cart.addEventListener('click', function(){
	cart_page.classList.remove('show-cart');
});

cancel_checkout_btn.addEventListener('click', function(){
	cart_checkout.classList.add('hide-form');
});

empty_cart.addEventListener('click', emptyCart);
checkout.addEventListener('click', checkoutCart);

menu_login.addEventListener('click', handleMenuLogin);

continue_checkout_btn.addEventListener('click', continueCheckout);

function handleMenuLogin(event) {
	event.preventDefault();
	event.stopPropagation();

	form_login_register.innerHTML = formHtml;	//ok if no element in form_login_register
	form_login_register.classList.remove('hide-form');

	/* make this declaration after form_login_register.innerHTML = formHtml; to 
	   avoid "Uncaught TypeError: close_form is undefined"
	*/
	var close_form = document.getElementsByClassName('close-form')[0];
	var signup_form = document.getElementsByClassName('form-signup')[0];
	var logout_action_link = document.getElementsByClassName('form-logout-link')[0];
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var confirm_password = document.getElementById('password-confirm');
	var button = document.querySelector('.form-submit button');
	var form_name = form_login_register.name;

	close_form.addEventListener('click', close_action);
	signup_form.addEventListener('click', signup_action);
	logout_action_link.addEventListener('click', logout_action);
	button.addEventListener('click', login_register_action);
}

function close_action(event){
	event.preventDefault();
	event.stopPropagation();

	var confirm_password = form_login_register.querySelector('#password-confirm');
	var button = form_login_register.querySelector('.form-submit button');

	form_login_register.classList.add('hide-form');
	form_login_register.innerHTML = '';

	button.innerHTML = 'Login';
	confirm_password.classList.add('hide-element');
	form_login_register.name = 'login-form';
}

function signup_action(event){
	event.preventDefault();
	event.stopPropagation();

	var confirm_password = form_login_register.getElementsByClassName('hide-element')[0];
	var form_switch = form_login_register.getElementsByClassName('form-switch')[0];
	var button = form_login_register.querySelector('.form-submit button');

	form_login_register.name = 'register-form';
	confirm_password.classList.remove('hide-element');
	button.innerHTML = 'Register';
	form_switch.classList.add('hide-form');
}

function login_action(event){
	event.preventDefault();
	event.stopPropagation();

	var e = email.value;
	var p = password.value;
	var close_form = document.getElementsByClassName('close-form')[0];
	var valid_user = false;

	users.forEach(function(user){
		if (user[email.value] === password.value){
			user['isLogin'] = 1;
			saveToLocalStorage('users', users);
			valid_user = true;
			current_user = email.value;
		}
	});

	if (!valid_user){
		alert('Login incorrect, check login details and try again');
	}

	email.value = '';
	password.value = '';

	close_form.click();
}

function register_action(event){
	event.preventDefault();
	event.stopPropagation();

	var user = {};   //user object => {email key: password, isLogin key: 0}
	var confirm_password = form_login_register.querySelector('#password-confirm');
	var button = form_login_register.querySelector('.form-submit button');
	var confirm_password_row = form_login_register.getElementsByClassName('form-input')[2];
	var e = email.value;
	var p = password.value;
	var cp = confirm_password.value;

	if (password.value === confirm_password.value && password.value.length >= 4){
		user[email.value] = password.value;
		user['isLogin'] = 0;

		users.push(user);
		saveToLocalStorage('users', users);
	}
	else {
		alert('Passwords don\'t match or password length less than 4.');
	}

	email.value = '';
	password.value = '';
	confirm_password.value = '';

	button.innerHTML = 'Login';
	confirm_password_row.classList.add('hide-element');
	form_login_register.name = 'login-form';


	var form_switch = form_login_register.getElementsByClassName('form-switch')[0];
	form_switch.classList.remove('hide-form');
}

function login_register_action(event){
	var form_name = form_login_register.name;

	if (form_name === 'login-form'){
		login_action(event);
	}
	else{
		register_action(event);
	}
}

function logout_action(){
	var close_form = document.getElementsByClassName('close-form')[0];
	users = getFromLocalStorage('users');

	users.forEach(user => {	//arrow function variant
		user['isLogin'] = 0;
	});
	saveToLocalStorage('users', users);
	close_form.click();
}

function emailValidation(email){
	//valid email address
}

function passwordValidation(password1, password2){
	//minimum length (8)
	//alphanumerical
	//same
}

function payWithPaystack(amt){
	var handler = PaystackPop.setup({
		key: 'pk_test_gfgfgf545556gfgfgf5565fg7676',

		//must be a valid email
		email: 'abc@xyz.com',	

		//the amount value is multiplied by 100 to convert to the lowest currency unit
		amount: amt,
		currency: 'NGN',

		//generates a pseudo-unique reference. Please replace with a reference you generated. 
		//Or remove the line entirely so our API will generate one for you
		ref: ''+Math.floor((Math.random() * 1000000000) + 1), 
		callback: function(response) {
			//this happens after the payment is completed successfully
			var reference = response.reference;
			alert('Payment complete! Reference: ' + reference);
			//Make an AJAX call to your server with the reference to verify the transaction

			cart = [];
			local_cart = [];
			saveToLocalStorage('cart', cart);
			saveToLocalStorage('local_cart', local_cart);

			window.location.href = baseUrl;
		},
		onClose: function() {
			alert('Transaction was not completed, window closed.');
		},
	});

	cart_checkout.classList.add('hide-form');
	handler.openIframe();
}

window.addEventListener('DOMContentLoaded', up);