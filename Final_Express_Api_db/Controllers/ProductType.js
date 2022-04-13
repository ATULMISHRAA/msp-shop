const ProductType = require('../Models/ProductType');

exports.getProduct_Type = (req, res) => {
    ProductType.find()
        .then(response => {
            res.status(200).json(
                {
                    message: "ProductType fetch Succesfully",
                    productTypes: response

                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}