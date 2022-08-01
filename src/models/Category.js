const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = Schema(
    {
        name:
        {
            type: String,
            required: [true, 'Le champ nom est requis'],

        },
        // creer une valeur qui n'aura pas d'entrée
        created_date:
        {
            type: Date,
            default: Date.now
        }
    }
)
module.exports = mongoose.model('Category', categorySchema)