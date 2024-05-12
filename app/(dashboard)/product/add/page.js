"use client";
import { Container } from "react-bootstrap";
import { PageHeading } from "widgets";
import ProductForm from "../_components/ProductForm";

export default function ProductAddPage() {
  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Product" />

      {/* Product Form */}
      <ProductForm />
    </Container>
  );
}
