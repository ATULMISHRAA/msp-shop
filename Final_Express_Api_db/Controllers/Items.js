const Items = require('../Models/Items');

exports.getItemsByresId = (req, res) => {
    const proId = req.params.proId;
    Items.find({ productId: proId })
        .then(response => {
            res.status(200).json(
                {
                    message: 'Items Fatch Succesfilly',
                    items: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}