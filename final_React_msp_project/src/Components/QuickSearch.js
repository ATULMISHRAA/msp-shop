import React from "react";
import "../Styles/Home.css";
import ProductItems from "./ProductItems";

class QuickSearch extends React.Component {
    render() {
        const { productTypesData } = this.props;
        return (
            <div style={{background:"honeydew"}}>

                <div className="container">
                    <div className="heading1"> Quick Searchs</div>
                    <div className="sub-heading1">Discover the restaurants by type of meal</div>
                    <div className="container-fluid" style={{ marginLeft: "30px" }}>
                        <div className="row">
                        {productTypesData.map(item=>{
                        return <ProductItems 
                            heading={item.name}
                            content={item.content}
                            image={item.image}
                            id={item.product_type}
                        />
                        
                        })}


                        </div>
                    </div>

                </div>
            </div>

        )
    }
}
export default QuickSearch;