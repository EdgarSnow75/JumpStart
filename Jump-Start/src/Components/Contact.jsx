import React from "react"

const Contact = () => {
    return (
        <div className="container">
            <div className="flex grid text-center">
                <h1 className="text-5xl grid-cols-12 my-4 pb-4">
                    Find Our Stores
                </h1>
                
                <p className="py-2">Our Stores are located conveniently near you</p>
                <br/>
                <p className="pb-4">Find our store on our extensive map</p>
            </div>
                <div className="container">
                    <div></div>
                    <div className="map">
                        <h2 className="map-h2"></h2>
                        <div style={{ height: '100vh', width: '100%' }}></div>
                        <div className="google-map">
                         
                    </div>
                </div>
            </div>

        </div>
    )
}
export default Contact