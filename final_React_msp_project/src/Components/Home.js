import React from "react";
import "../Styles/Home.css";
import QuickSearch from "./QuickSearch";
import Wallpaper from "./Wallpaper";
import axios from "axios";

class Home extends React.Component {
    constructor(){
        super();
        this.state={
            locations:[],
            productTypes:[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();

        

        axios({
            method:"GET",
            url:'http://localhost:1122/productTypes',
            headers:{'Content-Type':'application/json'}
        })
        .then(response=>{
            this.setState({productTypes: response.data.productTypes});
        })
        .catch()

    }
    render() {
        const { productTypes}=this.state;
        return (
            <div>
                <Wallpaper/>
                <QuickSearch productTypesData={productTypes}/>
            </div>
        )
    }
}
export default Home;