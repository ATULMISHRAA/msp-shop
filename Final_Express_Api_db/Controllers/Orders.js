const Orders = require('../Models/Orders');

exports.saveordersDetails = (req, res) => {
    const { placedBy, placedByUserId, placedOn, items, amount, resId } = req.body;

    let orderObj = new Orders({
        placedBy,
        placedByUserId,
        placedOn,
        items,
        Amount: amount,
        restaurantId: resId
    })

    orderObj.save()

        .then(response => {
            res.status(200).json(
                {
                    message: "  orders Added Succesfully",
                    order: response

                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })

}

exports.getordersByUserId = (req, res) => {
    const userId = req.params.userId;
    MenuItems.findById({ placedByUserId: userId })
        .then(response => {
            res.status(200).json(
                {
                    message: 'Orders Fatched Succesfully',
                    orders: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
