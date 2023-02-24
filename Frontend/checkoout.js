function next() {
    console.log("hey");
    event.preventDefault()
    // // console.log("hello")
    let obj = {
        email: form.email.value,
        first_name: form.first.value,
        last_name: form.last.value,
        street: form.street.value,
        city: form.city.value,
        state: form.state.value,
        zip: form.zip.value,
        country: form.country.value,
        number: form.ph.value
    }
    localStorage.setItem("userdata", JSON.stringify(obj))
    window.location.href = "./payment.html"
}
document.getElementById("form").addEventListener("submit", next)

let cart = JSON.parse(localStorage.getItem("Addtocart")) || []

var price = 0;
var count = 0;
show(cart)
function show(cart) {
    cart.forEach(function (el) {
        count++;
        price += el.discounted_price
        // console.log(el)
        var div = document.createElement("div");
        div.setAttribute("id", "cartbody")
        var div1 = document.createElement("div");

        var img = document.createElement("img");
        img.src = el.image[1];
        div1.append(img)
        var div2 = document.createElement("div");
        div2.setAttribute("id", "div2")
        var desc = document.createElement("div");
        desc.innerText = el.product_name;
        var quan = document.createElement("div");
        quan.setAttribute("id", "quan")
        quan.innerText = "qty = " + el.quantity;
        div2.append(desc, quan)
        var price = document.createElement("div");

        price.innerText = "price " + el.discounted_price;
        var div3 = document.createElement("div");
        div3.setAttribute("id", "div3")
        div3.append(price)
        // var img = document.createElement("div");

        div.append(div1, div2, div3)

        document.getElementById("summary").append(div)

    })


}



