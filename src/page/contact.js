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

const Contact = props => {
    // console.log("halaman Contact");
    const site = [{
        title: "Contact",
        description: "Berikut kontak kami mulai dari alamat, nomor telepon, email dan kami juga menyediakan form langsung dari website untuk anda meninggalkan pesan.",
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
                <NavMenu activeKey="/contact" />
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

export default Contact;