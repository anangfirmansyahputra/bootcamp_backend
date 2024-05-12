"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Edit, Trash } from "react-feather";

export default function ProductPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/products", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(categories);

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
              <h1 className="mb-1 h2 fw-bold">Products</h1>
              <p className="mb-0 ">Table of products</p>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <Card.Header>
          <Button onClick={() => router.push("/product/add")}>
            Add category
          </Button>
        </Card.Header>
        <Card.Body>
          <Table className="text-nowrap" responsive>
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Company</th>
                <th scope="col">Stock</th>
                <th scope="col">Shipping</th>
                <th scope="col">Featured</th>
                <th scope="col">Colors</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, i) => (
                <tr key={i}>
                  <td scope="row">{i + 1}</td>
                  <td>{category.title}</td>
                  <td>{category.price}</td>
                  <td>{category.category.name}</td>
                  <td>{category.company}</td>
                  <td>{category.stock}</td>
                  <td>{category.shipping ? "Yes" : "No"}</td>
                  <td>{category.featured ? "Yes" : "No"}</td>
                  <td>
                    {category.colors.map((color, i) => (
                      <div
                        key={i}
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: color,
                          borderRadius: "50%",
                          display: "inline-block",
                          margin: "0 5px",
                        }}
                      />
                    ))}
                  </td>
                  <td className="">
                    <Button
                      size="sm"
                      variant="warning"
                      className="me-1"
                      as="button"
                      disabled={isLoading}
                      onClick={() => router.push(`/product/${category.id}`)}
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
