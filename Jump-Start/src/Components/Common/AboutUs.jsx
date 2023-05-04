import JumpStart from "/src/Images/HeaderAndFooter/JumpStart.png"
import History from "/src/Images/AboutUs/History.jpg"
import Vision from "/src/Images/AboutUs/Vision.jpg"
import Mission from "/src/Images/AboutUs/Culture.png"

const AboutUs = () =>{
    return(
        <div>
          
            <div className="hero w-screen mt-3" style={{ backgroundImage: `url(${History})`,}}>
                <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                        <h1 className="mb-5 text-5xl font-bold">About Us</h1>
                        <p className="mb-5 text-xl">Established in 1995, Jump Start is a design company and manufacturing powerhouse in the point of sale industry. We blend creativity with industrial engineering and logistics to conceive and deliver custom innovative displays that build brands and drive incremental sales. </p>   
                    </div>
                    
                </div>
            </div>
            <br/>
            <div className="hero  w-screen bg-sky-50 ">
                <div className="hero-content flex-col lg:flex-row">
                    <img src={Vision} className="max-w-sm rounded-lg shadow-2xl" />
                    <div>
                    <h1 className="text-5xl font-bold">Vision</h1>
                    <p className="py-6">Our vision is to create world-class products that improve people's lives and make a positive impact on the planet.</p>
                    
                    </div>
                </div>
            </div>

            <br/>

            <div className="hero  w-screen bg-orange-50 mb-5">
                <div className="hero-content flex-col lg:flex-row">
                    
                    <div>
                    <h1 className="text-5xl font-bold">Mission</h1>
                    <p className="py-6">Our mission is to transform innovative ideas into exceptional products that bring joy and satisfaction to our customers</p>
                    
                    </div>
                    <img src={Mission} className="max-w-sm rounded-lg shadow-2xl" />
                </div>
            </div>
            
            
            
        </div>
    )
}

export default AboutUs