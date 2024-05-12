// import node module libraries
import { Card, Col, Row, Table } from "react-bootstrap";

// import required data files
import axios from "axios";
import { useEffect, useState } from "react";

const ActiveProjects = () => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const { data } = await axios.get("/api/products/featured", {
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
    <Row className="mt-6">
      <Col md={12} xs={12}>
        <Card>
          <Card.Header className="bg-white  py-4">
            <h4 className="mb-0">Featured Product</h4>
          </Card.Header>
          <Table responsive className="text-nowrap mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th>Company</th>
                <th>Stock</th>
                <th>Colors</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.category.name}</td>
                  <td>{item.company}</td>
                  <td>{item.stock}</td>
                  <td>
                    {item.colors.map((color, i) => (
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
                </tr>
              ))}
            </tbody>
          </Table>
          <Card.Footer className="bg-white py-3" />
        </Card>
      </Col>
    </Row>
  );
};

export default ActiveProjects;
