import Products from "./Products.js";


const main = document.querySelector('main');
const btn_label = "Add To Cart";
const img_alt = "Image for ";

function createSection(product){
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
	section_img.alt = img_alt + product.name;
	//section_img.setAttribute('src', product.img);               //ok also
	//section_img.setAttribute('alt', img_alt + product.name);    //ok also
	section_desc.innerHTML = product.desc;
	section_price.innerHTML = "N" + product.price;
	section_button.innerHTML = btn_label;

	section.appendChild(section_title);
	section.appendChild(section_img);
	section.appendChild(section_desc);
	section.appendChild(section_price);
	section.appendChild(section_button);

	main.appendChild(section);
}

function updatePage(){
	for (let key in Products){
		createSection(Products[key]);
	}
}

/*
let cs = function createSection(product){
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
	section_desc.innerHTML = product.desc;
	section_price.innerHTML = "N" + product.price;
	section_button.innerHTML = btn_label;

	section.appendChild(section_title);
	section.appendChild(section_img);
	section.appendChild(section_desc);
	section.appendChild(section_price);
	section.appendChild(section_button);

	main.appendChild(section);
}

let up = function updatePage(){
	for (let key in Products){
		cs(Products[key]);
	}
}
*/

//window.addEventListener('load', updatePage);
window.addEventListener('DOMContentLoaded', updatePage);
//window.addEventListener('DOMContentLoaded', up);