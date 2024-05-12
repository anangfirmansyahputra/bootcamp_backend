// import node module libraries
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Image,
  ButtonGroup,
  CloseButton,
} from "react-bootstrap";

// import widget as custom components
import { FormSelect, DropFiles } from "widgets";

// import hooks
import useMounted from "hooks/useMounted";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductForm = ({ data }) => {
  const hasMounted = useMounted();
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState(["#000000"]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [form, setForm] = useState({
    title: "",
    price: "0",
    description: "",
    category_id: categories[0]?.id || "",
    company: "",
    stock: "",
    shipping: true,
    featured: true,
  });

  const fetchData = async () => {
    const response = await axios.get("/api/categories");
    const categories = response.data.map((category) => ({
      label: category.name,
      value: category.id,
    }));
    setCategories(categories);
  };

  useEffect(() => {
    fetchData();
    if (data) {
      setForm(data);
      setColors(data.colors || ["#000000"]);
      setPreviewImages(data?.images?.map((image) => image.url) || []);
    }
  }, [data]);

  console.log(previewImages);

  const onChangeColor = (e, i) => {
    const newColors = [...colors];
    newColors[i] = e.target.value;
    setColors(newColors);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    // Menambahkan file ke state images
    setImages([...images, ...files]);

    // Membuat preview gambar
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages([...previewImages, ...previews]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("description", form.description);
    formData.append("category_id", form.category_id);
    formData.append("company", form.company);
    formData.append("stock", form.stock);
    formData.append("shipping", form.shipping);
    formData.append("featured", form.featured);
    formData.append("colors", colors);

    images.forEach((image, index) => {
      formData.append(`files`, image);
    });

    try {
      const response = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: localStorage.getItem("token"),
        },
      });
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const updatedPreviews = [...previewImages];
    updatedPreviews.splice(index, 1);
    setPreviewImages(updatedPreviews);
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
                        as={FormSelect}
                        placeholder="Select category"
                        id="category_id"
                        name="category_id"
                        options={categories}
                        value={form.category_id}
                        onChange={handleOnChange}
                      />
                    </Col>
                  </Row>

                  {/* Company */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4" htmlFor="company">
                      Company
                    </Form.Label>
                    <Col md={8} xs={12}>
                      <Form.Control
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

                  {/* Color */}
                  <Row className="mb-3">
                    <Form.Label className="col-sm-4">Color</Form.Label>
                    <Col sm={8} className="d-flex flex-wrap gap-1">
                      {colors.map((color, i) => (
                        <Form.Control
                          type="color"
                          id="color1"
                          required
                          value={colors[i]}
                          onChange={(e) => onChangeColor(e, i)}
                          // className="me-2" // Margin-right 2
                          key={i}
                        />
                      ))}
                      <ButtonGroup>
                        <Button
                          size="sm"
                          variant={"success"}
                          onClick={() => setColors([...colors, "#000000"])}
                        >
                          {/* <i className="nav-icon fe fe-plus"></i> */}
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant={"danger"}
                          onClick={() => {
                            if (colors.length !== 1) {
                              setColors(colors.slice(0, colors.length - 1));
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
                        {previewImages.map((preview, index) => (
                          <Col key={index} md={3} sm={12}>
                            <Card style={{ width: "100%" }}>
                              <Card.Img variant="top" src={preview} />
                              <CloseButton
                                className="position-absolute top-0 end-0"
                                onClick={() => handleImageRemove(index)}
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
                      <Button variant="primary" type="submit">
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
};

export default ProductForm;
