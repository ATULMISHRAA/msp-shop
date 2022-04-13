import React from "react";
import {withRouter} from "react-router-dom";
import "../Styles/Home.css";

class ProductItems extends React.Component {
    handleNavigate=(productTypeID)=>{
            this.props.history.push(`/filter?productType=${productTypeID}`);
        
    }
    render() {
        const { heading, content, image, id } = this.props
        return (

            <div className="col-lg-3 col-md-6 col-sm-12" onClick={()=>this.handleNavigate(id)}>
                <div className="iitem">
                    <div className="item_up">
                        <img src={`./${image}`} height="100%" width="100%" alt="" />
                    </div>
                    <div>
                        <div className="qs-heading">{heading}</div>
                        <div className="qs-paragraph">{content}</div>

                    </div>
                </div>
            </div>


        )
    }
}
export default withRouter(ProductItems);