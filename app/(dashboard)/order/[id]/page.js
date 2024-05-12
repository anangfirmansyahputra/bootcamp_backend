"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Eye } from "react-feather";

export default function OrderDetailPage({ params }) {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    const { data } = await axios.get(`/api/orders/${params.id}`, {
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
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Color</th>
              <th scope="col">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data?.order_items?.map((order, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{order.product.title}</td>
                <td>{order.quantity}</td>
                <td>
                  <div
                    key={i}
                    style={{
                      height: 20,
                      width: 20,
                      backgroundColor: order.color,
                      borderRadius: "50%",
                      display: "inline-block",
                      margin: "0 5px",
                    }}
                  />
                </td>
                <td>{order.created_at}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Card.Footer className="bg-white text-center py-3" />
      </Card>
    </Container>
  );
}
