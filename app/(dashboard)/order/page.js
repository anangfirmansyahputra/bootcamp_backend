"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Eye } from "react-feather";

export default function OrderPage() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const { data } = await axios.get("/api/orders", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    setData(data);
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <Container fluid className="p-6">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <div className="border-bottom pb-4 mb-4 d-md-flex align-items-center justify-content-between">
            <div className="mb-3 mb-md-0">
              <h1 className="mb-1 h2 fw-bold">Orders</h1>
              <p className="mb-0 ">Table of orders</p>
            </div>
          </div>
        </Col>
      </Row>
      <Card>
        <Card.Header className="bg-white d-flex align-items-center justify-content-between py-4">
          <h4 className="mb-0">Orders</h4>
        </Card.Header>
        <Table className="text-nowrap mb-0" responsive>
          <thead className="table-light">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Postal Codes</th>
              <th scope="col">Payment Methods</th>
              <th scope="col">Country</th>
              <th scope="col">Created At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{order.user.name}</td>
                <td>{order.address}</td>
                <td>{order.postal_code}</td>
                <td>{order.payment_method}</td>
                <td>{order.country}</td>
                <td>{order.created_at}</td>
                <td className="d-flex gap-1">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1"
                    as="button"
                    onClick={() => router.push(`/order/${order.id}`)}
                  >
                    <Eye size={18} />
                  </Button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={8} className="text-center">
                  No orders found
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
