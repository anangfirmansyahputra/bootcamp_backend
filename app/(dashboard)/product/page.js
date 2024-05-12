"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Edit, Trash } from "react-feather";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const fetchData = async () => {
    try {
      const { data } = await axios.get("/api/products", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
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
        <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4">
          <h4 className="mb-0">Products</h4>
          <Button size="sm" onClick={() => router.push("/product/add")}>
            Add product
          </Button>
        </Card.Header>
        <Table className="text-nowrap mb-0" responsive>
          <thead className="table-light">
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
            {products.map((product, i) => (
              <tr key={i}>
                <td scope="row">{i + 1}</td>
                <td>{product.title}</td>
                <td>{product.price}</td>
                <td>{product.category.name}</td>
                <td>{product.company}</td>
                <td>{product.stock}</td>
                <td>{product.shipping ? "Yes" : "No"}</td>
                <td>{product.featured ? "Yes" : "No"}</td>
                <td>
                  {product.colors.map((color, i) => (
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
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Edit size={18} />
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    className="me-1"
                    disabled={isLoading}
                    onClick={() => onDelete(product.id)}
                  >
                    <Trash size={18} />
                  </Button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center">
                  No products found
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
