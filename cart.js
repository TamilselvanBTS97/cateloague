// cart
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')
cartIcon.addEventListener('click',()=>{
	cart.classList.add('cart-active');

})
closeCart.addEventListener('click',()=>{
	cart.classList.remove('cart-active');
})

document.addEventListener('DOMContentLoaded',loadproduct);

function loadproduct()
{
	loadcontent();
}


function loadcontent()
{
	let butremove =document.querySelectorAll('.cart-remove');

	butremove.forEach((but)=>{
		but.addEventListener('click',removeitem)
	});

	let qtyelement=document.querySelectorAll('.cart-quantity')
	qtyelement.forEach((input)=>{
		input.addEventListener('change',changeQty);
	});

	let cartbutton=document.querySelectorAll('.add-cart')
	cartbutton.forEach((carton)=>{
		carton.addEventListener('click',addcart)
	});

	let orders=document.querySelector('.btn-buy');

	orders.addEventListener('click',placeorder);

	updatetotal();
}

function placeorder()
{
	if (confirm('Your Order Has been Placed')) {
		console.log("Thank You");
	}
}

function removeitem()
{
	if(confirm('Are you Sure to Remove')){
		let title=this.parentElement.querySelector('.cart-product-title').innerHTML;
		itemlist=itemlist.filter(el=>el.title!=title);
		this.parentElement.remove();
		loadcontent();
	}
}
// function removeitem()
// {
// 	if(confirm('Are you Sure to Remove')){
// 		let title=this.parentElement.querySelector('.cart-dress-title').innerHTML;
// 		itemlist=itemlist.filter(el=>el.title!=title);
// 		this.parentElement.remove();
// 		loadcontent();
// 	}
// }
function changeQty()
{
	if(isNaN(this.value) || this.value<1)
	{
		this.value =1;
	}
	loadcontent();
}

let itemlist=[];

function addcart()
{
	let a=this.parentElement;
	//console.log(a);

	let title=a.querySelector('.cart-product-title').innerHTML;
	let price=a.querySelector('.cart-price').innerHTML;
	let imgsrc=a.querySelector('.cart-img').src;

	//console.log(title,price,imgsrc);

	let newproduct={title,price,imgsrc}

	let newproductel=createcartproduct(title,price,imgsrc);

	let newElement=document.createElement('div')
	newElement.innerHTML=newproductel;
	let cartbasket=document.querySelector('.cart-content');
	cartbasket.append(newElement);

	loadcontent();
	
}

function createcartproduct(title,price,imgsrc)
{
	return`
	 <div class="cart-box">
						<img src="mob1.jpg" alt="" class="cart-img">
					     <div class="detail-box">
							<div class="cart-product-title">Vivo Y18</div>
							<div class="cart-price">$100</div>
							<input type="number" value="1" class="cart-quantity">
						</div>
						<i class="fa-solid fa-trash cart-remove"></i>
	 </div>`;
}


function updatetotal()
{
	const cartitem =document.querySelectorAll('.cart-box');
	const totalvalue =document.querySelector('.total-price');

	let total=0;

	cartitem.forEach(product=>{
		let priceEle=product.querySelector('.cart-price');
		let price=parseFloat(priceEle.innerHTML.replace("$.",""));
		let qty=product.querySelector('.cart-quantity').value;
		total+=(price*qty);
		product.querySelector('.cart-amt').innerText="$."+price*qty;
	});

	totalvalue.innerHTML='$.'+total;
}