"use client";
// import node module libraries
import { Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";

// import sub components
import CategoryForm from "../_components/CategoryForm";

const AddPage = () => {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Category" />

      {/* Product Form */}
      <CategoryForm />
    </Container>
  );
};

export default AddPage;
