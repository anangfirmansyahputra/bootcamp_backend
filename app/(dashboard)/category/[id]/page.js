"use client";
// import node module libraries
import { Container } from "react-bootstrap";

// import widget as custom components
import { PageHeading } from "widgets";
import CategoryForm from "../_components/CategoryForm";
import axios from "axios";
import { useEffect, useState } from "react";

// import sub components

export default function CategoryAddPage({ params }) {
  const [data, setData] = useState({});

  const fetchData = async () => {
    const { data } = await axios.get(`/api/categories/${params.id}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container fluid className="p-6">
      {/* Page Heading */}
      <PageHeading heading="Category" />

      {/* Product Form */}
      <CategoryForm data={data} />
    </Container>
  );
}
