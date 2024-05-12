// import node module libraries
import { Col, Row, Form, Card, Button, Image } from "react-bootstrap";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

// import hooks
import useMounted from "hooks/useMounted";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const CategoryForm = ({ id }) => {
  const hasMounted = useMounted();
  const [name, setName] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();

      if (id) {
        const { data } = await axios.patch(`/api/categories/${id}`, {
          name,
        });
      } else {
        const { data } = await axios.post("/api/categories", {
          name,
        });
      }

      router.push("/category");
    } catch (err) {
      console.log(err);
      alert(err.messagae);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`/api/categories/${id}`);
      setName(data.name);
    } catch (e) {
      router.push("/category");
    }
  };

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">General Setting</h4>
          <p className="mb-0 fs-5 text-muted">
            Profile configuration settings{" "}
          </p>
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
              <div className="mb-6">
                <h4 className="mb-1">Basic information</h4>
              </div>
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
};

export default CategoryForm;
