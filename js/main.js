import Products from "./Products.js";


const main = document.querySelector('main');
const btn_label = "Add To Cart";
const img_alt = "Image for ";
let cart = [];


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

let up = function updatePage(){
	for (let key in Products){
		cs(key, Products[key]);
	}
}

//window.addEventListener('load', up);
window.addEventListener('DOMContentLoaded', up);


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
	var product = {};

	if (parent.className === 'product-item'){
		/********************************************************************************
		** using this method because element is dynamically created and 
		** getElementBy{*}/getElementsBy{*} and
		** document.querySelector/document.querySelectorAll are not working
		********************************************************************************/
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
		//cartEntry();

		//product[key] = {name: title, img: img, desc: desc, price: price};
		//console.log("product_key => "+product[key]+", product_value => "+product.value);

		
	}
}

function cartEntry(){
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

	product_name.innerHTML = "product-01"; 	
	product_desc.innerHTML = "first product item";
	product_count.innerHTML = "1";
	product_price.innerHTML = "N123.45";
	add_item.innerHTML = "+";
	minus_item.innerHTML = "-";
	delete_item.innerHTML = "x";

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

function saveToLocalStorage(){}

function getFromLocalStorage(){}