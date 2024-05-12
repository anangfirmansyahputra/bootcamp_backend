"use client";
// import node module libraries
import { Fragment, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects } from "sub-components";

// import required data files
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const { data } = await axios.get("/api/dashboard");
    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="bg-primary pt-10 pb-21"></div>
      <Container fluid className="mt-n22 px-6">
        <Row>
          <Col lg={12} md={12} xs={12}>
            {/* Page header */}
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="mb-2 mb-lg-0">
                  <h3 className="mb-0  text-white">Bootcamp Eccomerce</h3>
                </div>
              </div>
            </div>
          </Col>
          {data?.map((item, index) => {
            return (
              <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                <StatRightTopIcon info={item} />
              </Col>
            );
          })}
        </Row>

        {/* Active Projects  */}
        <ActiveProjects />
      </Container>
    </Fragment>
  );
};
export default Home;
