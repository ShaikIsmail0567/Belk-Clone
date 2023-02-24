let productsdata=[]
fetch("https://panicky-hosiery-tuna.cyclic.app/products?limit=20&page=1")
.then((res)=>{
    return res.json()
})
.then((data)=>{
   
    productsdata=data
    console.log(data)
    append(data);
})



  

  function append(productsdata){
    document.querySelector(".products").innerHTML="";
    productsdata.map(function(elem){
      var div = document.createElement("div");
      div.setAttribute("class","card")
      var img = document.createElement("img");
      img.setAttribute("src",elem.image[1]);
      var name = document.createElement("div");
      name.textContent=elem.product_name;
      var div2 = document.createElement("div");
      div2.setAttribute("class","div2")
      var mrp = document.createElement("p");
      mrp.textContent="Rs."+elem.retail_price
      var price=document.createElement("p");
      price.textContent="Rs."+elem.discounted_price;
      var discount=document.createElement("p");
      discount.textContent=elem.discount.toFixed(2)+"% Off";
      var rating=document.createElement("div")
      rating.setAttribute("class","rating")
      rating.innerHTML=`<i class="fas fa-star"></i><i class="fas fa-star"></i
      ><i class="fas fa-star"></i><i class="fas fa-star"></i
      ><i class="fa-regular fa-star"></i`
      let cart=document.createElement("button")
      cart.innerText="Wishlist"
      cart.addEventListener("click",()=>{
          let cartdata=JSON.parse(localStorage.getItem("Wishlistcart"))||[];
          let cartadded=false;
          for(let i=0;i<cartdata.length;i++){
            if(cartdata[i].id===elem.id){
              cartadded=true;
              break;
            }
          }
          if(cartadded==true){
            alert("Product Already in Wishlist")
          } else{
            cartdata.push({...elem})
            localStorage.setItem("Wishlistcart",JSON.stringify(cartdata))
            alert("Product Added To Wishlist")
          }
          append(productsdata)
      });
      let favourite=document.createElement("button")
      favourite.innerText="Add To Cart"

    
      favourite.addEventListener("click",()=>{
          let cartdata=JSON.parse(localStorage.getItem("Addtocart"))||[];
          let cartadded=false;
          for(let i=0;i<cartdata.length;i++){
            if(cartdata[i].id===elem.id){
              cartadded=true;
              break;
            }
          }
          if(cartadded==true){
            alert("Product Already in cart")
          } else{
            cartdata.push({...elem})
            localStorage.setItem("Addtocart",JSON.stringify(cartdata))
            alert("Product Added To Cart")
          }
          append(productsdata)
      });
      div2.append(mrp,price,discount);
      div.append(img,name,div2,rating,cart,favourite);
      document.querySelector(".products").append(div);
      img.addEventListener("click",function(){
        window.location.href="singleproduct.html";
      });

    });
  }
  
  function filter(){
    var select = document.querySelector(".sortby").value;

    if(select=="low"){
        productsdata.sort(function(a,b){
        return a.discounted_price-b.discounted_price;
      });
      
      append(productsdata);
    }

    if(select=="high"){
        productsdata.sort(function(a,b){
        return b.discounted_price-a.discounted_price;
      });
      
      append(productsdata);
    }

    if(select=="discount"){
        productsdata.sort(function(a,b){
        return b.discount-a.discount;
      });
      
      append(productsdata);
    }
  }
 let filterbtn= document.getElementById("filterbtn")
  filterbtn.addEventListener("click",()=>{

    let lower = document.getElementById("lower").value;
    let upper = document.getElementById("upper").value;
    
    let filtered = productsdata.filter((e,i)=>{
      if(e.discounted_price >= lower && e.discounted_price <=upper) return true;
      return false;
    })
    
    append(filtered);
    
    })
//searchcatergory
    function filter1(){

        let query = document.getElementById("query").value
         let copy_data=productsdata;
         copy_data=copy_data.filter(function(el){
         return el.product_name.toLowerCase().includes(query) || el.product_name.toUpperCase().includes(query)
        })
        append(copy_data)
           }