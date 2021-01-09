import React, { Component } from 'react';



class About extends Component{
    render(){
        return(
          <main>
            <section className="about">
              <h2>What is AIP ?</h2>
              <p>At their core, all autoimmune conditions are the result of your immune system attacking your own body. And they’re all connected by one common element: chronic inflammation. The five factors that I’ve identified that lead to chronic inflammation are diet, leaky gut, toxin exposure, infections, and chronic stress, or a combination of them. Whether you’re dealing with symptoms like digestive issues or dry eyes, or a full-blown autoimmune disease such as lupus or rheumatoid arthritis, you can find help here in reducing the inflammatory factors in your life and taking back control of your health.
              The Autoimmune Protocol, abbreviated AIP, is a complementary approach to chronic disease management focused on providing the body with the nutritional resources required for immune regulation, gut health, hormone regulation and tissue healing while removing inflammatory stimuli from both diet and lifestyle.  
              </p>              
            </section>
            <section className="learnmore">
              <h2>The AIP Diet</h2>
              <p>The AIP diet provides balanced and complete nutrition while avoiding processed and refined foods and empty calories. The AIP lifestyle encourages sufficient sleep, stress management and activity as these are important immune modulators.</p>
              
            </section>          
          </main>
        )
    }
}
export default About;