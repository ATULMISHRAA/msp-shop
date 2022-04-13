import React from "react";
import "../Styles/Filter.css";
import queryString from "query-string";
import axios from "axios";
//import {withRouter} from "react-router-dom";

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            productType: undefined,
            brand: [],
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            pageCount: []
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { productType } = qs;

        const filterObj = {
            productType: Number(productType)
        };

        axios({
            method: "POST",
            url: 'http://localhost:1122/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ products: response.data.products, productType, pageCount: response.data.pageCount });
            })
            .catch()
    }

    handleSortChange = (sort) => {
        const { productType, location, brand, lcost, hcost, page, } = this.state;

        const filterObj = {
            productType: Number(productType),
            location,
            brand: brand.length==0?undefined:brand,
            lcost,
            hcost,
            page,
            sort: sort
        };
        axios({
            method: "POST",
            url: 'http://localhost:1122/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ products: response.data.products, sort, pageCount: response.data.pageCount });
            })
            .catch()
    }



    handleCostChange = (lcost, hcost) => {

        const { productType, location, brand, sort, page, } = this.state;

        const filterObj = {
            productType: Number(productType),
            location,
            brand: brand.length==0?undefined:brand,
            lcost,
            hcost,
            page,
            sort: sort
        };
        axios({
            method: "POST",
            url: 'http://localhost:1122/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ products: response.data.products,lcost, hcost, pageCount: response.data.pageCount});
            })
            .catch()
    }

    handleBrandChange = (brandId) => {

        const { productType, location, brand, lcost, hcost, sort, page } = this.state;

        const index=brand.indexOf(brandId);
        if(index==-1){
            brand.push(brandId);
        }
        else{
            brand.splice(index,1);
        }
        const filterObj = {
            productType: Number(productType),
            location,
            brand: brand.length==0?undefined:brand,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:1122/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ products: response.data.products, brand, pageCount: response.data.pageCount });
            })
            .catch()

    }
    handlePageChange=(page)=>{
        const { productType, location, brand, lcost, hcost, sort,} = this.state;

        const filterObj = {
            productType: Number(productType),
            brand: brand.length==0?undefined:brand,
            location,
            sort,
            page,
            lcost,
            hcost
        };
        axios({
            method: "POST",
            url: 'http://localhost:1122/filter',
            headers: { 'Content-Type': 'application/json' },
            data: filterObj
        })
            .then(response => {
                this.setState({ products: response.data.products, page, pageCount: response.data.pageCount });
            })
            .catch()
    }
    handleNavigate=(resId)=>{
        this.props.history.push(`/details?product=${resId}`);
    }
    render() {
        const { products,pageCount} = this.state;
        return (
            <div className="container-fluid">
                <div className="heading">Mobile Parts</div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="filter-section">
                            <div>
                                <span className="text-style filter">Filter/Sort</span>
                                <span className="fa fa-angle-double-down filter-icon" data-bs-toggle="collapse"
                                    data-bs-target="#target"></span>
                                <div id="target" className="collapse-show">

                                    <div className="text-style sub-heading">Brand</div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleBrandChange(1)} /><span className="filter-option">Mi</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleBrandChange(2)} /><span className="filter-option">vivo</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleBrandChange(3)} /><span className="filter-option">samsung</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleBrandChange(4)}/><span className="filter-option">realme</span>
                                    </div>
                                    <div>
                                        <input type="checkbox" className="click-box" onChange={() => this.handleBrandChange(5)}/><span className="filter-option">oppo</span>
                                    </div>
                                    <div className="text-style sub-heading">Price</div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(1, 50)} />
                                        <span className="filter-option">Less than &#8377;50</span>
                                            
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(50, 100)} />
                                        <span className="filter-option">&#8377;50 to &#8377;100</span>
                                            
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(100, 150)} />
                                        <span className="filter-option">&#8377;100 to &#8377;150</span>
                                            
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(150, 200)} />
                                        <span className="filter-option">&#8377;150 to &#8377;200</span>
                                    </div>
                                    <div>
                                        <input type="radio" className="click-box" name="sort" onChange={() => this.handleCostChange(200, 500)} />
                                        <span className="filter-option">&#8377;200 to &#8377;500</span>
                                            
                                    </div>
                                    <div className="text-style sub-heading">Sort</div>
                                    <div>
                                        <input type="radio" name="sort" className="click-box" onChange={() => this.handleSortChange(1)} /><span className="filter-option">Price low to
                                            high</span>
                                    </div>
                                    <div>
                                        <input type="radio" name="sort" className="click-box" onChange={() => this.handleSortChange(-1)} /><span className="filter-option">Price high to
                                            low</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div style={{ position: "absolute", left: "22%" }}>
                        {products.length>0 ?products.map(item => {
                            return <div className="item1" onClick={()=>this.handleNavigate(item._id)}>
                                <div className="box1">
                                    <div className="img1">
                                        <img src={`./${item.image}`} style={{ width: "100%", height: "100%", borderRadius: "10px" }} alt="" />
                                    </div>
                                    <div className="text">Product purches by msp_shop</div>

                                </div>

                                <div className="box2">
                                    <div className="box2-list">
                                        <div style={{ color: "gray" }}>{item.content}</div>
                                        <div>&#8377;{item.min_price}</div>

                                    </div>
                                </div>
                            </div>
                        }):<div className="No-record">No Records Found...</div>}

                        {products.length > 0 ?
                            <div className="pagination">
                                <span className="fas fa-hand-point-left page"></span>
                                {pageCount.map(pageNo => {
                                    return <span className="page" onClick={()=>this.handlePageChange(pageNo)}>{pageNo}</span>
                                })}

                                <span className="fas fa-hand-point-right page"></span>
                            </div> : null}
                        






                        
                    </div>



                    

                </div>

            </div>
        )
    }
}
export default Filter;