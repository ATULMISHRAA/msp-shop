import React from "react";
import "../Styles/Home.css";

class Wallpaper extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <img src="./Assets/backcover3.jpg" width="100%" height="500px " className="img" alt="" />
                    <div className="absolute-block">
                        <div className="logo">
                            <b>msp</b>
                        </div>
                        <div className="main-heading">Find the best Mobile part products by the msp shop </div>
                        <div className="search-box1">
                            <input className="search" type="text" placeholder="Search for product Items" />
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
export default Wallpaper;