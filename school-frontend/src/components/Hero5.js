import React from 'react'
import backgroundImage from "../images/stud7.png";
const Hero5 = () => {
  return (
    <>
    <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          position: "relative",
          backgroundPosition: "center",
          height: "50vh",
          width: "100%",
          backgroundSize: "cover",
          opacity: "0.7"
        }}
      >
        <div style={{ textAlign: "center", position: "relative", top: "50%"}}>
        <h4 style={{color:"black",marginBottom:"20px"}}>ADMISSIONS OPEN FOR THE ACADEMIC YEAR - 2024-2025</h4>
        <h4 style={{color:"black",fontWeight: "bold"}}>Any Enquiry call us : 1800 891 1256</h4>
        </div>
      </div>
    </>
  )
}

export default Hero5
