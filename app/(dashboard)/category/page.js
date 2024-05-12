"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Edit, Trash } from "react-feather";

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/categories", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      setCategories(data);
    } catch (err) {
      alert(err.request.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      fetchData();
    } catch (err) {
      alert(err.request.response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Categories</h1>
              <p className="mb-0 ">Table of categories</p>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4">
          <h4 className="mb-0">Categories</h4>
          <Button size="sm" onClick={() => router.push("/category/add")}>
            Add category
          </Button>
        </Card.Header>
        <Table className="text-nowrap mb-0" responsive>
          <thead className="table-light">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{category.name}</td>
                <td>{category.created_at}</td>
                <td className="d-flex gap-1">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1"
                    as="button"
                    disabled={isLoading}
                    onClick={() => router.push(`/category/${category.id}`)}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="me-1"
                    disabled={isLoading}
                    onClick={() => onDelete(category.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No categories found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        <Card.Footer className="bg-white text-center py-3" />
      </Card>
    </Container>
  );
}
