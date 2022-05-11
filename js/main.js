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
					<p for="first-name">No account?</p>
					<a href="" class="form-signup">Sign up</a>
				</div>`;

/**********************************************************************
*** This method of standalone function is OK                        ***
***********************************************************************
function createSection(key, product){
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
	//section_img.alt = img_alt + product.name;
	section_img.alt = img_alt + product.name + '_' + key;
	//section_img.setAttribute('src', product.img);               //ok also
	//section_img.setAttribute('alt', img_alt + product.name);    //ok also
	section_desc.innerHTML = product.desc;
	section_price.innerHTML = "N" + product.price;
	section_button.innerHTML = btn_label;
	section_button.addEventListener('click', addToCart);

	section.appendChild(section_title);
	section.appendChild(section_img);
	section.appendChild(section_desc);
	section.appendChild(section_price);
	section.appendChild(section_button);

	main.appendChild(section);
}

function updatePage(){
	for (let key in Products){
		createSection(key, Products[key]);
	}
}

window.addEventListener('DOMContentLoaded', updatePage);

//using event here because this is serving as callback for addEventListener
function addToCart(event){  
	var parent = event.target.closest('section'); 
	//console.log(parent);
	var product = {};

	if (parent.className === 'product-item'){
		********************************************************************************
		** using this method because element is dynamically created and 
		** getElementBy{*}/getElementsBy{*} and
		** document.querySelector/document.querySelectorAll are not working
		********************************************************************************
		var children = parent.children;      
		var title = children[0].innerHTML;
		var img = '.' + children[1].src.split(window.location.origin )[1];
		var key = children[1].alt.split('_')[1];
		var desc = children[2].innerHTML;
		var price = children[3].innerHTML;

		console.log("title => "+title);
		console.log("img => "+img);
		console.log("key => "+key);
		console.log("desc => "+desc);
		console.log("price => "+price);

		product[key] = {name: title, img: img, desc: desc, price: price};
		//console.log("product_key => "+product[key]+", product_value => "+product.value);
	}
}
*/


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
	//section_img.alt = img_alt + product.name;
	section_img.alt = img_alt + product.name + '_' + key;
	//section_img.setAttribute('src', product.img);               //ok also
	//section_img.setAttribute('alt', img_alt + product.name);    //ok also
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
		
		/*
		  for objects DON'T use any variable/string in addition to the object in console.log,
		  it will RESULT in [object Object] result as in below statement:

			console.log('Products['+key+'] => '+Products[key]);
		*/
		//BOTH Methods below are OK for console.log OBJECTS
		//console.log(Products[key]);  //ALWAYS console.log objects alone like this OR         
		//console.log("product => "+JSON.stringify(Products[key]));		//JSON.stringify(object)
		
	}

	//load previous session from local storage
	cart = getFromLocalStorage('cart');
	local_cart = getFromLocalStorage('local_cart');
	users = getFromLocalStorage('users');
	//console.log(local_cart);

	if (local_cart.length > 0){
		local_cart.forEach(function(item){
			cartEntry(item);
		});
		menu_item_cart_strong.innerHTML = cart.length;
		menu_item_cart_span.classList.remove('hide-cart-count');
		totalPurchase(local_cart);
	}
}


/********************************************************************************
 document.querySelector/document.querySelectorAll do not reference elements added 
 dynamically to the DOM by javascript - use other traditionally supported methods
 like getElementsBy{*} - https://codepen.io/VAggrippino/pen/draJzJ

let buttons = document.querySelectorAll('section > button'); 
********************************************************************************
let buttons = document.getElementsByClassName('add');      //not working
//let buttons = document.getElementsByTagName('img');       //not working
console.log("num_of_buttons => "+buttons.length);         

buttons.forEach(function(button){
	console.log('hi');
	button.addEventListener('click', addToCart);
});

for (var i=0; i<buttons.length; i++){
	console.log(buttons[i].width);
}
*********************************************************************************/

//using event here because this is serving as callback for addEventListener
let atc = function addToCart(event){  
	var parent = event.target.closest('section'); 
	//console.log(parent);
	//var product = {};
	var canAdd = true;

	if (cart){
		var cart_product_name = parent.getElementsByClassName('product-name')[0].innerHTML;
		//console.log('sibling => '+cart_product_name);
		var pn = cart.forEach(product => {
			if (product.name === cart_product_name){
				canAdd = false;
			}
		});
		//console.log('pn:');
		//console.log(pn);
	}
	//console.log('canAdd => '+canAdd);

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

		/*console.log("name => "+name);
		console.log("img => "+img);
		console.log("key => "+key);
		console.log("desc => "+desc);
		console.log("price => "+price);*/
		//cartEntry();

		//var id = 'key_' + key;
		//var product = {key: {name: name, img: img, desc: desc, price: price}};
		var product = {name: name, img: img, desc: desc, price: price};
		var local_product = {name: name, img: img, desc: desc, price: price, qty: 1};
		//cart[key] = product;
		//console.log(product.name);
		cart.push(product);
		local_cart.push(local_product);
		menu_item_cart_strong.innerHTML = cart.length;
		menu_item_cart_span.classList.remove('hide-cart-count');
		totalPurchase(local_cart);

		//add to local storage
		saveToLocalStorage('cart', cart);
		saveToLocalStorage('local_cart', local_cart);

		/*
		  for objects DON'T use any variable/string in addition to the object in console.log,
		  it will RESULT in [object Object] result as in below statement:

			console.log("product => "+product);
		*/
		//BOTH Methods below are OK for console.log OBJECTS
		//console.log(product);	//ALWAYS console.log objects alone like this OR         
		//console.log("product => "+JSON.stringify(product));		//JSON.stringify(object)
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
	//console.log('sibling className => '+sibling.className);
	//var itemCount = sibling.getElementsByClassName('.product-count')[0].innerHTML;  //not working
	var itemName = sibling.querySelector('.product-name').innerHTML;
	var itemCount = sibling.querySelector('.product-count').innerHTML;
	var itemPrice = sibling.querySelector('.product-price').innerHTML;
	itemPrice = parseFloat(itemPrice.substring(1));
	//console.log('itemCount => '+itemCount);
	//console.log('itemPrice => '+itemPrice);
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
	//console.log(local_cart);

	//add to local storage
	totalPurchase(local_cart);
	saveToLocalStorage('local_cart', local_cart);
}

function itemRemoveOne(event){
	var sibling = event.target.closest('div').previousSibling;
	//console.log('sibling className => '+sibling.className);
	var itemName = sibling.querySelector('.product-name').innerHTML;
	var itemCount = sibling.querySelector('.product-count').innerHTML;
	var itemPrice = sibling.querySelector('.product-price').innerHTML;

	if (parseInt(itemCount) === 1){
		deleteItem(event);
		//menu_item_cart_span.classList.add('hide-cart-count');
	}
	else{
		itemPrice = parseFloat(itemPrice.substring(1));
		//console.log('itemCount => '+itemCount);
		//console.log('itemPrice => '+itemPrice);
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
		//console.log(local_cart);

		//remove from local storage
		totalPurchase(local_cart);
		saveToLocalStorage('local_cart', local_cart);
	}
}

function deleteItem(event){
	//var cart_item = document.getElementsByClassName('cart-item')[0]; //targets first .cart-item
	var targetParent = event.target.parentElement.parentElement;   //targets .cart-item from which event is triggered
	var cart_main = document.querySelector('.cart-main');
	//console.log('targetParent => '+targetParent.className);
	
	//remove from cart and local_cart
	var cart_product_name = targetParent.getElementsByClassName('product-name')[0].innerHTML;
	//console.log('cart_product_name => '+cart_product_name);
	var product = cart.filter(product => {   //filter RETURNS an array
		//console.log('cart_product_name => '+cart_product_name);
		//console.log('product.name => '+product.name);
		return product.name === cart_product_name
	});
	//console.log('product.name:');
	//console.log(product);

	if (cart.length > 1){
		//console.log(product[0]);
		if (product[0].name === cart_product_name){
			var index = cart.indexOf(product[0]);
			//console.log('index => '+index);

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
	//console.log('cart:');
	//console.log(cart);

	cart_main.removeChild(targetParent);
}

function emptyCart(){
	var cart_main = document.querySelector('.cart-main');
	var cartItems = document.getElementsByClassName('cart-item');

	var empty = confirm('Empty All Cart Items?');

	if (empty){

		if (cartItems){
			//console.log('cartItems => '+typeof(cartItems));  //object
			//since cartItems is an object-like array use Array.from inorder to be able to use forEach
			//hence we get error 'forEach is not a function'
			Array.from(cartItems).forEach(function(cart_item){
				cart_main.removeChild(cart_item);
				//console.log('cart_item className => '+cart_item.className);
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
}

function totalPurchase(cart){
	var total = 0;

	local_cart.forEach(function(cartItem){
		total = (parseFloat(total) + parseFloat(cartItem.price.substring(1))).toFixed(2);
		//console.log('total => '+total);
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

empty_cart.addEventListener('click', emptyCart);
checkout.addEventListener('click', checkoutCart);

menu_login.addEventListener('click', handleMenuLogin);

function handleMenuLogin(event) {
	//var name = event.target.innerHTML;
	//console.log(name);
	event.preventDefault();
	event.stopPropagation();

	form_login_register.innerHTML = formHtml;
	form_login_register.classList.remove('hide-form');

	/* make this declaration after form_login_register.innerHTML = formHtml; to 
	   avoid "Uncaught TypeError: close_form is undefined"
	*/
	var close_form = document.getElementsByClassName('close-form')[0];
	var signup_form = document.getElementsByClassName('form-signup')[0];
	var email = document.getElementById('email');
	var password = document.getElementById('password');
	var confirm_password = document.getElementById('password-confirm');
	var button = document.querySelector('.form-submit button');
	var form_name = form_login_register.name;

	close_form.addEventListener('click', close_action);
	signup_form.addEventListener('click', signup_action);
	button.addEventListener('click', login_register_action);
}

function close_action(event){
	event.preventDefault();
	event.stopPropagation();

	//var confirm_password = form_login_register.getElementsByClassName('hide-element')[0];
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
	//var confirm_password = form_login_register.getElementsByTagName('input')[2];  //why is this not working???
	//var confirm_password = document.getElementById('password-confirm');           //why is this not working???
	//console.log(confirm_password.className);
	var button = form_login_register.querySelector('.form-submit button');

	form_login_register.name = 'register-form';
	confirm_password.classList.remove('hide-element');
	button.innerHTML = 'Register';
}

function login_action(event){
	event.preventDefault();
	event.stopPropagation();

	//var email = document.getElementById('email');
	//var password = document.getElementById('password');
	var e = email.value;
	var p = password.value;
	var close_form = document.getElementsByClassName('close-form')[0];
	console.log('email => '+e+', password => '+p);
	console.log('form_login_register name => '+form_login_register.name);

	var valid_user = false;

	users.forEach(function(user){
		if (user[email.value] === password.value){
			user['isLogin'] = 1;
			saveToLocalStorage('users', users);
			valid_user = true;
		}
	});

	if (valid_user){
		alert('valid user');
		close_form.click();
	}
	else {
		alert('Login incorrect, check login details and try again');
	}

	email.value = '';
	password.value = '';
}

function register_action(event){
	event.preventDefault();
	event.stopPropagation();

	var user = {};
	//var email = document.getElementById('email');
	//var password = document.getElementById('password');
	//var confirm_password = form_login_register.getElementsByTagName('password')[2];
	var confirm_password = form_login_register.querySelector('#password-confirm');
	var button = form_login_register.querySelector('.form-submit button');
	var confirm_password_row = form_login_register.getElementsByClassName('form-input')[2];
	var e = email.value;
	var p = password.value;
	var cp = confirm_password.value;
	console.log('email => '+e+', password => '+p+', confirm_password => '+cp);
	console.log('form_login_register name => '+form_login_register.name);

	if (password.value === confirm_password.value && password.value.length >= 4){
		user[email.value] = password.value;
		user['isLogin'] = 0;

		users.push(user);
		console.log(users);
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

function emailValidation(email){
	//valid email address
}

function passwordValidation(password1, password2){
	//minimum length (8)
	//alphanumerical
	//same
}



//window.addEventListener('load', up);
window.addEventListener('DOMContentLoaded', up);