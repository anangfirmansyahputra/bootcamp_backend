import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import useMounted from "hooks/useMounted";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryForm({ data }) {
  const hasMounted = useMounted();
  const [name, setName] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (data) {
        const res = await axios.patch(
          `/api/categories/${data.id}`,
          {
            name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      } else {
        const res = await axios.post(
          "/api/categories",
          {
            name,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }

      router.push("/category");
    } catch (err) {
      console.log(err);
      alert(err.messagae);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/categories`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setName(data.name);
    } catch (e) {
      router.push("/category");
    }
  };

  useEffect(() => {
    if (data) {
      setName(data.name);
    } else {
      fetchData();
    }
  }, [data]);

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Category Form</h4>
          <p className="mb-0 fs-5 text-muted">Form create a new category</p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Category Form</h4>
            </div>
            <div>
              {hasMounted && (
                <Form onSubmit={onSubmit}>
                  {/* Location */}
                  <Row className="align-items-center">
                    <Form.Label className="col-sm-4" htmlFor="name">
                      Name
                    </Form.Label>

                    <Col md={8} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Name"
                        id="name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </Col>

                    <Col md={{ offset: 4, span: 8 }} xs={12} className="mt-4">
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
