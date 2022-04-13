import React from "react";
import queryString from "query-string";
import axios from "axios";
import "../Styles/Details.css";
import Modal from 'react-modal';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-10%',
        transform: 'translate(-50%, -50%)',
        background: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            product: {},
            items: [],
            galleryModalIsopen: false,
            itemsModalIsopen: false,
            formModalIsopen: false,
            subTotal: 0,
            name:undefined,
            email:undefined,
            contactNumber:undefined,
            address:undefined
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { product } = qs;
        axios({
            method: "GET",
            url: `http://localhost:1122/product/${product}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ product: response.data.product });
            })
            .catch()
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value })
    }
    handleOrder = (proId) => {
        axios({
            method: "GET",
            url: `http://localhost:1122/items/${proId}`,
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => {
                this.setState({ items: response.data.items, itemsModalIsopen: true });
            })
            .catch()
    }
    addItems = (index, operationType) => {
        let total = 0;
        // Spread Operator - Copy of Reference Types
        const items = [...this.state.items];
        const item = items[index];

        if (operationType == 'add') {
            item.qty++;
        }
        else {
            item.qty--;
        }
        items[index] = item;
        items.map((item) => {
            total += item.qty * item.price;
        })
        this.setState({ items: items, subTotal: total });
    }
    handleInputChange=(state, event)=>{
        this.setState({ [state]: event.target.value })
        
    }

    isDate(val){
        return Object.prototype.toString.call(val)==='[object Data]'
    }

    isObj=(val)=>{
        return typeof val ==='object'
    }

    stringifyValue=(val)=>{
        if(this.isObj(val) && !this.isDate(val)){
            return JSON.stringify(val)
        }
        else{
            return val
        }
    }

    buildForm=({action,params})=>{
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action',action)

        Object.keys(params).forEach(key=>{
            const input = document.createElement('input')
            input.setAttribute('type','hidden')
            input.setAttribute('name',key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }
    post=(details)=>{
        const form=this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }
    getData=(data)=>{
        return fetch(`http://localhost:1122/payment`,{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then(response=> response.json()).catch(err=>console.log(err))
    }
    handlePayment=(event)=>{
        event.preventDefault()

        const {subTotal, email}= this.state;
        if(!email){
            alert('Please fill this field and then Proceed...');
        }
        else{
            const paymentObj={
                amount:subTotal,
                email:email
            };
            this.getData(paymentObj).then(response=>{
                var information={
                    action:"https://securegw-stage.paytm.in/order/process",
                    params:response
                }
                this.post(information)
            })
        }
    }
    render() {
        const { product,items, galleryModalIsopen, itemsModalIsopen,formModalIsopen, subTotal} = this.state;
        return (
            <div>
                <div>
                    <img src={`./${product.image}`} alt="No image ,sorry for the inconvinince" width="100%" height="350px" />

                    <button className="button" onClick={() => this.handleModal('galleryModalIsopen', true)}>Click to see Image Gallery</button>
                </div>
                <div className="heading">
                    {product.name}
                </div>
                <button className="btn-order" onClick={() => this.handleOrder(product._id)}>Place Online Order</button>
                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" checked />
                        <label for="tab-1">Overview</label>
                        <div className="content">
                            <div className="about">About this Item</div>
                            <div className="head">Brand</div>
                            <div className="value">{product.name}</div>
                            <div className="head">Average Cost</div>
                            <div className="value">&#8377; {product.min_price} for one item(approx)</div>
                        </div>
                    </div>
                    <div className="tab">
                        <input type="radio" id="tab-2" name="tab-group-1" />
                        <label for="tab-2">contact</label>
                        <div className="content">
                            <div className="head"> Phone Number</div>
                            <div className="value">{product.contact_number}</div>
                            <div className="head">Email</div>
                            <div className="value">atulmish25@gmail.com</div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsopen}
                    style={customStyles}
                >
                    <div>
                        <div className="fa fa-close" style={{ float: 'right', marginBottom: '10px', color: 'red' }}
                            onClick={() => this.handleModal('galleryModalIsopen', false)}></div>
                        <Carousel
                            showThumbs={false}>
                            {product && product.thumb && product.thumb.map(item => {
                                return <div>
                                    <img src={`./${item}`} height="300px" width="200px" />

                                </div>
                            })}
                        </Carousel>
                    </div>

                </Modal>
                <Modal
                    isOpen={itemsModalIsopen}
                    style={customStyles}
                >
                <div>
                        <div className="fa fa-close" style={{ float: 'right', marginBottom: '10px', color: 'red' }}
                            onClick={() => this.handleModal('itemsModalIsopen', false)}></div>
                        <div >
                            <h3 className="restaurant-name">{product.name}</h3>
                            <h3 className="item-total">SubTotal : {subTotal}</h3>
                            <button className="btn btn-danger order-button"
                                onClick={() => {
                                    this.handleModal('itemsModalIsopen', false);
                                    this.handleModal('formModalIsopen', true);
                                }}> Pay Now</button>
                            {items.map((item, index) => {
                                return <div style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', borderBottom: '2px solid #dbd8d8' }}>
                                    <div className="card" style={{ width: '43rem', margin: 'auto' }}>
                                        <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 " style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                                                <span className="card-body">
                                                    <h5 className="item-name">{item.name}</h5>
                                                    <h5 className="item-price">&#8377;{item.price}</h5>
                                                    <p className="item-descp">{item.description}</p>
                                                </span>
                                            </div>
                                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                                                <img className="card-img-center title-img" src={`../${item.image}`} style={{
                                                    height: '75px',
                                                    width: '75px',
                                                    borderRadius: '20px',
                                                    marginTop: '12px',
                                                    marginLeft: '3px'
                                                }} alt=""/>
                                                {item.qty == 0 ? <div style={{ marginLeft: '25px' }}>
                                                    <button className="add-button" onClick={() => this.addItems(index, 'add')}>Add</button>
                                                </div> :
                                                    <div className="add-number" style={{ marginLeft: '25px' }}>
                                                        <button onClick={() => this.addItems(index, 'subtract')}>-</button>
                                                        <span class="qty">{item.qty}</span>
                                                        <button onClick={() => this.addItems(index, 'add')}>+</button>
                                                    </div>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="card" style={{ width: '44rem', marginTop: '10px', marginBottom: '10px', margin: 'auto' }}>

                            </div>
                        </div>
                    </div>
                

                </Modal>
                <Modal
                    isOpen={formModalIsopen}
                    style={customStyles}
                >
                    <div>
                        <div className="fa fa-close" style={{ float: 'right', marginBottom: '10px', color: 'red' }}
                            onClick={() => this.handleModal('formModalIsopen', false)}>

                        </div>
                        <form>
                            <label className="form-lable">Name</label>
                            <input style={{width:'370px'}} type="text" className="form-control" onChange={(event)=>this.handleInputChange('name',event)}/>
                            <label className="form-lable">Email</label>
                            <input style={{width:'370px'}} type="text" className="form-control" onChange={(event)=>this.handleInputChange('email',event)}/>
                            <label className="form-lable">contact Number</label>
                            <input style={{width:'370px'}} type="text" className="form-control" onChange={(event)=>this.handleInputChange('contactNumber',event)}/>
                            <label className="form-lable">Address</label>
                            <input style={{width:'370px'}} type="text" className="form-control" onChange={(event)=>this.handleInputChange('address',event)}/>
                            <button className="btn btn-danger" style={{marginTop:'10px',float:'right'}} onClick={this.handlePayment}>Proceed</button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Details;