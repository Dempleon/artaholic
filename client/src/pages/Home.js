import { TypeOrFieldNameRegExp } from "@apollo/client/cache/inmemory/helpers";
import React from "react";
import { Col } from "react-bootstrap";
import HomeImage from "../components/assets/images/homeimage.jpeg";
import "../styles/Home.css";

const styles = {
  containerImg: {
    postion: "relative",
    float: "right",
    display: "flex",
    marginRight: "15px",
  },
  image: {
    width: "50vw",
  },
  containerMission: {
    marginLeft: "50px",
  },
};

function Home() {
  return (
    <section className="homepage">
      <Col lg={6} md={12}>
        <div className="homepage-image" style={styles.containerImg}>
          <img
            src={HomeImage}
            className="homepage-pic"
            alt="homepage-pic"
            style={styles.image}
          />
        </div>
        <div className="our-mission-values" style={styles.containerMission}>
          <h2>Our Mission & Values</h2>
          <p>
            We support artists at all stages of their artistic journey. As a
            leading art supply company, we provide artists, educators, and
            students a platform where they can sell or share their thought about
            their art.
            <br></br>
            <br></br>
            With excellent service for a quality shopping experience, we want to
            ensure you find the best art supplies at the lowest prices. Our goal
            is to make your shopping experience easy and enjoyable, so you can
            find the quality art supplies that you need quickly and affordably.
            <br></br>
            <br></br>
            Our commitment to excellence is supported by a team that's friendly,
            welcoming, and knowledgeable in all areas of art supplies. We
            proudly work with local artists and arts organizations across the
            country and support a variety of national events as well as local
            community events.
          </p>
        </div>
      </Col>
    </section>
  );
}

export default Home;
