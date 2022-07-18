// model contenant tous les chariots achetés par un utilisateur
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const itemSchema = Schema(
    {
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: {
            type: String,
            required: false
        },
        quantity: {
            type: Number,
            required: true,
            price: Number
        },
        subTotal: {
            type: Number
        }
    }
)
const cartSchema = Schema(
    {
        userId:
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        products:
            [itemSchema],
        totalPrice: {
            type: Number,
        },
        created_date:
        {
            type: Date,
            default: Date.now
        }
    })

module.exports = mongoose.model('Cart', cartSchema)