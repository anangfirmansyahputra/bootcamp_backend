"use client";
// import node module libraries
import { Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";
import CategoryForm from "../_components/CategoryForm";

// import sub components

const AddPage = ({ params }) => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Product" />

      {/* Product Form */}
      <CategoryForm id={params.id} />
    </Container>
  );
};

export default AddPage;
