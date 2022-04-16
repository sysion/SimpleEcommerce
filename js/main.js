import products from "./products.js";


const main = document.querySelector('main');
const btn_label = "Add To Cart";

function createSection(product){
	var section = document.createElement('section');
	var section_title = document.createElement('h2');
	var section_img = document.createElement('img');
	var section_desc = document.createElement('p');
	var section_price = document.createElement('p');
	var section_button = document.createElement('button');

	section_title.innerHTML = product.name;
	section_img.innerHTML = product.img;
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
	for (let key in products){
		createSection(products[key]);
	}
}

//window.addEventListener('load', updatePage);
window.addEventListener('DOMContentLoaded', updatePage);