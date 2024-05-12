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
    const { data } = await axios.get("http://localhost:3000/api/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/categories/${id}`);
      fetchData();
    } catch (err) {
      alert(err.message);
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
        <Card.Header>
          <Button onClick={() => router.push("/category/add")}>
            Add category
          </Button>
        </Card.Header>
        <Card.Body>
          <Table className="text-nowrap" responsive>
            <thead>
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
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}
