const Cart = require('../models/Cart')
const { readOne, create } = require('../queries/CRUD')


// add Product to Cart
exports.createCart = (req, res) => {
  //Check if cart exist
  Cart.findOne({ userId: req.body.userId })
    .then(cart => {
      //Cart exist
      if (cart) {
        // Check if product exist in a cart
        req.body.products.forEach(element => {
          let indexProduct = cart.products.findIndex(elem => elem.productId == element.productId)
          //product exist
          if (indexProduct !== -1) {
            if (element.quantity <= 0) {
              cart.products.splice(indexProduct, 1)
            }
            else {
              // cart.products[indexProduct].quantity += element.quantity
              cart.products[indexProduct].quantity = element.quantity
              cart.products[indexProduct].subTotal = element.price * cart.products[indexProduct].quantity
            }
          }
          //product not exist 
          else {
            element.subTotal = element.price * element.quantity
            cart.products.push(element)
          }

        });
        cart.totalPrice = cart.products.map(item => item.subTotal).reduce((acc, nextElem) => acc + nextElem, 0);

        cart.save()
          .then(cart => { res.status(201).json(cart) })
      }
      //cart not exist
      else {
        let totalPrice = 0
        req.body.products.forEach(element => {
          element.subTotal = element.price * element.quantity
          totalPrice += element.subTotal
        });

        req.body.totalPrice = totalPrice
        create(Cart, req, res)
      }
    })
    .catch(err => { res.status(500).json(err) })
}

//read one cart
exports.getCartById = (req, res) => {
  readOne(Cart, req, res)
}