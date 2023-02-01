import axios from "axios";
import React, { useEffect, useState } from "react";
import '../index.css';
import AboutMe from "./_partials/aboutme";
import Banner from "./_partials/banner";
import BreadCumb from "./_partials/breadcumb";
import CardList from "./_partials/cardlist";
import CarouselComp from "./_partials/carousel";
import Footr from "./_partials/footer";
import NavMenu from "./_partials/navbar";

const About = props => {
    // console.log("halaman About");
    const site = [{
        title: "About",
        description: "Lorem ipsum dolor sit, amet consectetur",
        icon: "",
        keywords: "Lorem ipsum dolor sit, amet consectetur",
        breadcrumbs: props.breadcumbs
    }];
    const url = "https://backend-portojoe.netlify.app/";
    const [portofolios, setPortofolios] = useState([])
    useEffect(() => {
        axios.get(url).then(res => {
            setPortofolios(res.data);
        })
    }, [url])
    return <div>
        {
            <div>
                <NavMenu activeKey="/about" />
                <BreadCumb site={site} />
                <CarouselComp />
                <AboutMe />
                <CardList data={portofolios} title="Latest Project" description="Web Design and Developement" link="#" />
                <Banner />
                <CardList data={portofolios} title="Latest Post" description="Web Design and Developement" link="#" />
                <Footr />
            </div>
        }
    </div>

}

export default About;