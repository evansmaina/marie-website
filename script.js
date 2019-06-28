//search filter
const searchbox=document.forms['searchbox'].querySelector('input')

const availableProducts=document.querySelector('.all-available');
searchbox.addEventListener('keyup',function(e){
    
    const term=e.target.value.toLowerCase();
  const productContainer=availableProducts.getElementsByClassName('product-container');
    Array.from(productContainer).forEach(function(search){
        const title=search.lastElementChild.children[0].textContent;
    if(title.toLowerCase().indexOf(term)!=-1){
        search.style.display='block'
    }
        else{
            search.style.display='none';
        }
        
    })
})


///cart button
const cartBtn=document.getElementById('cart-info');
const cartContainer=document.getElementById('cart-container');
const cartOverlay=document.getElementById('overlay');
cartBtn.addEventListener('click',function(e){
    cartOverlay.classList.toggle('transparentBcg');
    cartContainer.classList.toggle('showcart');
    cartBtn.classList.toggle('cliked')
    
})

cartContainer.addEventListener('click',function(e){
    //remove button
    if(e.target.className=='remove-item'){
        const div=e.target.parentElement.parentElement.parentElement;
        div.parentNode.removeChild(div)
        showTotals();
    }
    //increament button
else if(e.target.className=='increment'){
     const valu=1;
     const value=e.target.previousElementSibling;
  let car=parseFloat(value.textContent);
 value.innerText=car+valu;
    updateTotals();
    
 }
    //decrement button
else if(e.target.className=='decrement'){
       const valu=1;
 const value=e.target.nextElementSibling;
  let car=parseFloat(value.textContent);
    if(car>1){
        value.innerText=car-valu;
    }
    updateTotals();
    }
    
});

///totals
function updateTotals(){
const cart=cartContainer.getElementsByClassName('cart-item');
var total=0;
for(var i=0; i<cart.length; i++){
    var cartItems=cart[i];
    var storeItems=document.getElementById('cart-items')
    var value=parseFloat(storeItems.textContent);
    value.textContent=cartItems;
    var cartPrice=cartItems.getElementsByClassName('cart-item-price')[0];
    var quantityELement=cartItems.getElementsByClassName('item-amount')[0]
    var price=parseFloat(cartPrice.innerText);
    var quantity=quantityELement.innerText;
        total= total+(price*quantity);
}
    total=Math.round(total*100)/100;

    document.getElementsByClassName('cart-total')[0].innerText=total;

}



///add cart button function
var addCartItemButtn=document.getElementsByClassName('store-item-icon');
for(var i=0; i<addCartItemButtn.length; i++){
    
    var button=addCartItemButtn[i];
    button.addEventListener('click',function(event){
        
        
        var shopItem=event.target.parentElement.parentElement.parentElement.parentElement.parentElement;
        var title=shopItem.getElementsByClassName('card-title')[0].innerText;
        var priceName=shopItem.getElementsByClassName('shop-item-price')[0].innerText;
        var finalPrice=parseFloat(priceName.slice(6).trim());
        var imageView=shopItem.getElementsByClassName('card-img-top')[0].src;   
        
       addItemsToCart(title,finalPrice,imageView);
        showTotals();
        
    })
}

///add items to cart

function addItemsToCart(title,finalPrice,imageView){
    var cartDiv=document.createElement('div');
    var cartContent=document.getElementById('cart')
    //to prevent items from repeating
    
     var carttitleItems=document.getElementsByClassName('prodTitle')
     for(var i=0; i<carttitleItems.length; i++){
         

        if(carttitleItems[i].textContent==title){
            alert('This item has already been added to the cart!!!')
            return;
        }
        
     }
    
    var cartItems=`<div class="cart-item">
                    <img src="${imageView}" class="cart-imgy">
                    <div>
                        <h4 class="prodTitle">${title}</h4>
                        <h5 class="cart-item-price" id="cart-item-price">${finalPrice}</h5>
                        <span class="remove-item"><img src="delete-button.png" class="remove-item"></span>
                    </div>
                    <div>
                        
                <img class="decrement" src="prev.png" width="25" height="25">
                        <span id="item-amount" class="item-amount"><strong>1</strong></span>
                  <img class="increment" src="next.png" width="25" height="25">
                    </div>
                </div>`
    cartDiv.innerHTML=cartItems;
    cartContent.append(cartDiv);
    
    
}

//show totals
function showTotals(){
    const total=[];
    const items=document.querySelectorAll(".cart-item-price");
    items.forEach(function(item){
        total.push(parseFloat(item.textContent));
    })
      const totalprice=total.reduce(function(total,item){                                         
          total+=item;
          return total;
      },0)
     document.getElementById('cart-total').textContent=totalprice;
    document.getElementById('cart-items').textContent=total.length;
    
}

// clear Button
const clearCartbtn=document.getElementById('clear-cart')
clearCartbtn.addEventListener('click',function(event){
    const cart=event.target.parentElement.previousElementSibling
    while(cart.hasChildNodes){
        cart.removeChild(cart.firstChild);
        showTotals();
    }
})
//purchaseBtn
 const purchaseBtn=document.getElementById('purchase-cart');
purchaseBtn.addEventListener('click',function(e){
    alert('thankyou for the purchase.... you will receive your products instanly!!')
     const cart=event.target.parentElement.previousElementSibling
    while(cart.hasChildNodes){
        cart.removeChild(cart.firstChild);
        showTotals();
    }
})
