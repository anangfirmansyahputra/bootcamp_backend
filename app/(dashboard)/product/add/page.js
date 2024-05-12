"use client";
// import node module libraries
import { Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";
import ProductForm from "../_components/ProductForm";

// import sub components

const ProductAddPage = ({ params }) => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Product" />

      {/* Product Form */}
      <ProductForm />
    </Container>
  );
};

export default ProductAddPage;
