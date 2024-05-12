// import node module libraries
import {
  Button,
  ButtonGroup,
  Card,
  CloseButton,
  Col,
  Form,
  Row,
} from "react-bootstrap";
import axios from "axios";
import useMounted from "hooks/useMounted";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductForm({ data }) {
  const hasMounted = useMounted();
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    price: "0",
    description: "",
    category_id: "",
    company: "",
    stock: "",
    shipping: true,
    featured: true,
    colors: ["#000"],
    images: [],
  });

  const fetchData = async () => {
    const { data } = await axios.get("/api/categories", {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
    if (data) {
      setForm({
        ...data,
      });
    }
  }, [data]);

  const onChangeColor = (e, i) => {
    const newColors = [...form.colors];
    newColors[i] = e.target.value;
    setForm({
      ...form,
      colors: newColors,
    });
  };

  const handleImageChange = async (e) => {
    setIsLoading(true);
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const { data } = await axios.post("/api/images", formData, {
        headers: {
          Authorization: localStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      setForm({
        ...form,
        images: [...form.images, ...data.images],
      });
    } catch (error) {
      alert(error.message);
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageRemove = async (filename, index) => {
    setIsLoading(true);

    try {
      await axios.delete(`/api/images/${filename}`);

      const updatedPreviews = [...form.images];
      updatedPreviews.splice(index, 1);
      setForm({
        ...form,
        images: updatedPreviews,
      });
    } catch (error) {
      console.error("Error deleting image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      alert("Please select images");
      return;
    }

    setIsLoading(true);

    try {
      if (data) {
        const response = await axios.patch(
          `/api/products/${data.id}`,
          {
            ...form,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      } else {
        const response = await axios.post(
          "/api/products",
          {
            ...form,
          },
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
      }

      router.push("/product");
    } catch (error) {
      console.error("Error uploading images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <Row className="mb-8">
      <Col xl={3} lg={4} md={12} xs={12}>
        <div className="mb-4 mb-lg-0">
          <h4 className="mb-1">Product Form</h4>
          <p className="mb-0 fs-5 text-muted">Add product form</p>
        </div>
      </Col>
      <Col xl={9} lg={8} md={12} xs={12}>
        <Card>
          {/* card body */}
          <Card.Body>
            <div className=" mb-6">
              <h4 className="mb-1">Product Form</h4>
            </div>
            {/* col */}
            <div>
              {hasMounted && (
                <Form onSubmit={handleSubmit}>
                  {/* row */}
                  <Row className="mb-3">
                    <Form.Label
                      className="col-sm-4 col-form-label form-label"
                      htmlFor="title"
                    >
                      Title
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        type="text"
                        placeholder="Title"
                        id="title"
                        required
                        name="title"
                        value={form.title}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Price */}
                  <Row className="mb-3">
                    <Form.Label
                      className="col-sm-4 col-form-label form-label"
                      htmlFor="price"
                    >
                      Price
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        type="number"
                        placeholder="Price"
                        id="price"
                        required
                        name="price"
                        value={form.price}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Description */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="description">
                      Description
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        as="textarea"
                        placeholder="Description"
                        id="description"
                        rows={3}
                        name="description"
                        value={form.description}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Category */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="category_id">
                      Category
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        as={"select"}
                        placeholder="Select category"
                        id="category_id"
                        name="category_id"
                        value={form.category_id}
                        onChange={handleOnChange}
                      >
                        <option>Select category</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>

                  {/* Company */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="company">
                      Company
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        type="text"
                        placeholder="Company Name"
                        id="company"
                        required
                        name="company"
                        value={form.company}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Stock */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="stock">
                      Stock
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        type="number"
                        placeholder="Stock"
                        id="stock"
                        required
                        name="stock"
                        value={form.stock}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Featured */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="stock">
                      Featured
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          variant={form.featured ? "success" : "secondary"}
                          onClick={() => setForm({ ...form, featured: true })}
                        >
                          Yes
                        </Button>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          variant={!form.featured ? "success" : "secondary"}
                          onClick={() => setForm({ ...form, featured: false })}
                        >
                          No
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  {/* Featured */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="stock">
                      Shipping
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <ButtonGroup>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          variant={form.shipping ? "success" : "secondary"}
                          onClick={() => setForm({ ...form, shipping: true })}
                        >
                          Yes
                        </Button>
                        <Button
                          size="sm"
                          disabled={isLoading}
                          variant={!form.shipping ? "success" : "secondary"}
                          onClick={() => setForm({ ...form, shipping: false })}
                        >
                          No
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  {/* Color */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4">Color</Form.Label>
                    <Col sm={8} className="d-flex flex-wrap gap-1">
                      {form?.colors?.map((color, i) => (
                        <Form.Control
                          disabled={isLoading}
                          type="color"
                          id="color1"
                          required
                          value={form?.colors[i]}
                          onChange={(e) => onChangeColor(e, i)}
                          // className="me-2" // Margin-right 2
                          key={i}
                        />
                      ))}
                      <ButtonGroup>
                        <Button
                          disabled={isLoading}
                          size="sm"
                          variant={"success"}
                          onClick={() => {
                            setForm({
                              ...form,
                              colors: [...form.colors, "#000000"],
                            });
                          }}
                        >
                          {/* <i className="nav-icon fe fe-plus"></i> */}
                          Add
                        </Button>
                        <Button
                          disabled={isLoading}
                          size="sm"
                          variant={"danger"}
                          onClick={() => {
                            if (form.colors.length !== 1) {
                              setForm({
                                ...form,
                                colors: [...form.colors].slice(
                                  0,
                                  form.colors.length - 1
                                ),
                              });
                              // setColors(colors.slice(0, colors.length - 1));
                            }
                          }}
                        >
                          {/* <i className="nav-icon fe fe-minus"></i> */}
                          Delete
                        </Button>
                      </ButtonGroup>
                    </Col>
                  </Row>

                  {/* Images */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4">Images</Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
                        disabled={isLoading}
                        type="file"
                        multiple
                        onChange={handleImageChange}
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4"></Form.Label>
                    <Col xs={12} md={8}>
                      <Row>
                        {form?.images?.map((image, index) => (
                          <Col key={index} md={3} sm={12}>
                            <Card style={{ width: "100%" }}>
                              <Card.Img
                                variant="top"
                                src={"/uploads/" + image}
                              />
                              <CloseButton
                                className="position-absolute top-0 end-0"
                                onClick={() => handleImageRemove(image, index)}
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Form.Label className="col-sm-4"></Form.Label>
                    <Col md={8} xs={12}>
                      <Button
                        disabled={isLoading}
                        variant="primary"
                        type="submit"
                      >
                        Save Changes
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
