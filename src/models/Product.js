const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const productDetailsSchema= new Schema(
    { 
        color:
        {
            type:String,
        },
        size:
        {
            type:String
        },
        picture :
        {
            type:String
        },
        stock:
        {
            type:Number,
        },
        price :
        {
            type:Number,
        }
    }
)


module.exports = mongoose.model('ProductDetails', productDetailsSchema) 


const productSchema= new Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        price:
        {
            type:Number,
            required:true
        },
        picture:
        {
            type:String,
            required:false
        },
        category:
        [
            {
                type: Schema.Types.ObjectId,
                ref:'Category',
                required:true
            }
        ],
        description :
        {
            type:String,
            required:false
        },
        quantity :
        {
            type:Number,
            required: false
        },
        details :
        [
           productDetailsSchema 
        ],
        // creer une valeur qui n'aura pas d'entrée
       created_date:
      {
        type: Date,
        default: Date.now
      },

   

    }
)


module.exports = mongoose.model('Product', productSchema) 

// nom
// prix
// description
//images
//stock

//color
//stock
//size
//images
//price



