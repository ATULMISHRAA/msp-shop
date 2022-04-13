const Products = require('../Models/Products');

exports.getProductsByLocation = (req, res) => {
    const locId = req.params.locId;
    Products.find({product_id:locId})
        .then(response => {
            res.status(200).json(
                {
                    message: 'Restaurants Fatch Succesfilly',
                    products: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.productsFilter = (req, res) => {
    let {productType, location, brand, lcost, hcost, sort, page} = req.body;

    sort = sort ? sort:1;
    page = page ? page:1;

    const ItemsPerPage = 4;

    let startIndex = ItemsPerPage*page-ItemsPerPage;
    let endIndex = ItemsPerPage*page;

    //tackle the problem here

    let filterObj= {};
    productType && (filterObj['productType_id'] = productType);
    location && (filterObj['location_id']=location);
    brand && (filterObj['brand_id']={$in:brand});
    lcost && hcost && (filterObj['min_price'] = {$lte:hcost, $gte:lcost});

    
    Products.find(filterObj).sort({min_price:sort})
        .then(response => {

            //Pagination logic

            const paginatedRespose = response.slice(startIndex , endIndex);
            let arr=[];
            for(let i=1;i<=Math.ceil(response.length/ItemsPerPage);i++){
                arr.push(i);
            }


            res.status(200).json(
                {
                    message: 'Products Fatch Succesfully',
                    products: paginatedRespose,
                    pageCount:arr ,
                    currentPage :page
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
exports.getProductsDetailByProId = (req ,res) =>{
    const proId = req.params.proId;
    Products.findById(proId)
        .then(response => {
            res.status(200).json(
                {
                    message: 'Products Fatch Succesfilly',
                    product: response
                })
        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}