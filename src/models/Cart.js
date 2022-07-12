// model contenant tous les chariots achetés par un utilisateur
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const cartSchema = Schema(
{
    userId:
    {
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    products:
    [{
        productId:{
            type: Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        name:{
            type:String,
            required:false
        },
        quantity:{
            type:Number,
            required:true,
            price:Number
        }
        // ,
        // bill:{
            
        // }

     }],
    created_date:
    {
         type: Date,
         default: Date.now
    }
})

module.exports=mongoose.model('Cart', cartSchema)