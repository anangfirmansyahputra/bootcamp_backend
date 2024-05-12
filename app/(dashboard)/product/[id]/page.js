"use client";
// import node module libraries
import { Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../_components/ProductForm";

// import sub components

const ProductAddPage = ({ params }) => {
  const [data, setData] = useState({});

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/products/${params.id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Product" />

      {/* Product Form */}
      <ProductForm data={data} />
    </Container>
  );
};

export default ProductAddPage;
