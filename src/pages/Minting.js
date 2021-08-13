import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";

import { NFTStorage, File } from "nft.storage";
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBFYzExRkE1OGIzMUY3MzEzM2M2NmM3QzAzNGRmNzdDMEE5NWU1NjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODg1NDAzMjAzMSwibmFtZSI6IkpORlQifQ.YCCp8xERuM--5vKBAmK3LcFXbuZ3vaSNztjOs777Jt0",
});

export default function Minting(props) {
  const [imageFile, setImageFile] = React.useState(null);
  const [imageBinary, setImageBinary] = React.useState("");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");

  const onUpload = (pictures, pictureDataURL) => {
    setImageFile(pictures[0]);
    setImageBinary(pictureDataURL);
    // console.log(pictureDataURL);
  };

  const onMint = async (e) => {
    e.preventDefault();
    // console.log(imageFile);
    if (!name || !desc || !imageBinary || !imageFile) {
      console.error("filed is required.");
      return false;
    }

    const metadata = await client.store({
      name: name,
      description: desc,
      image: new File(imageBinary, imageFile.name, {
        type: imageFile.type,
      }),
    });
    console.log(metadata);
    console.log(metadata.data);
    // console.log(metadata.url);
  };

  return (
    <Container style={{ marginTop: 100 }}>
      <Row>
        <Col>
          <h2>Mint an Item</h2>
        </Col>
      </Row>

      <Row>
        <Col xs={12}>
          <Form.Group className="mb-3" controlId="tokenName">
            <Form.Control
              type="text"
              placeholder="Enter Token Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group className="mb-3" controlId="tokenDescription">
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Enter Token Description"
              onChange={(e) => {
                setDesc(e.target.value);
              }}
              value={desc}
            />
          </Form.Group>
        </Col>

        <Col xs={12}>
          <ImageUploader
            onChange={onUpload}
            singleImage={true}
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            withPreview={true}
          />
          <Button variant={"dark"} onClick={onMint}>
            Mint
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
