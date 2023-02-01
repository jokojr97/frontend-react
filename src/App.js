import logo from './logo.svg';
import './App.css';
import React, { useEffect } from 'react';
import Home from './page/home';
import Login from './page/login';
import Blog from './page/blog';
import {
  BrowserRouter as Router,
  Route,
  Routes as Switch
} from "react-router-dom";
import Portofolio from './page/portofolio';
import NotFound from './page/Notfound';
import { Spinner } from 'react-bootstrap';
import About from './page/about';
import Contact from './page/contact';
// import { AOS } from 'aos';

// mongggo db
import mongoose from 'mongoose';
import DefaultRoute from './DefaultRoute';
// import Dbcon from './utilities/db';
// import Porto from './model/porto';

function App() {
  // Dbcon();

  const [ready, setReady] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 200);
  })
  return (
    <React.Fragment>
      {!ready ? <center><Spinner style={{ marginTop: "20%" }} animation="border" /> </center> :
        <Router>
          <Switch>
            <Route path="/" exact element={<DefaultRoute />} >
              <Route exact path='/' element={<Home />} />
              <Route path="/portofolio" exact element={<Portofolio
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Portofolio",
                    link: "/portofolio"
                  }
                ]}
              />} />
              <Route path="/blog" exact element={<Blog
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Blog",
                    link: "/blog"
                  }
                ]} />} />
              <Route path="/about" exact element={<About
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "About",
                    link: "/about"
                  }
                ]} />} />
              <Route path="/contact" exact element={<Contact
                breadcumbs={[
                  {
                    name: "Home",
                    link: "/"
                  },
                  {
                    name: "Contact",
                    link: "/contact"
                  }
                ]} />} />
            </Route>

            <Route path="/login" exact element={<Login />} />
            <Route path="*" exact={true} element={<NotFound />} />
          </Switch>
        </Router>
      }
    </React.Fragment>
  );
  setReady(true);
}

export default App;
