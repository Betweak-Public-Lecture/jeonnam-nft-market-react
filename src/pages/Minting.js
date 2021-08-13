import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImageUploader from "react-images-upload";

import { NFTStorage, File } from "nft.storage";
const client = new NFTStorage({
  token: "",
});

export default function Minting(props) {
  const [imageFile, setImageFile] = React.useState(null);
  const [imageBinary, setImageBinary] = React.useState("");

  const onUpload = (pictures, pictureDataURL) => {
    setImageFile(pictures[0]);
    setImageBinary(pictureDataURL);
    console.log(pictureDataURL);
  };

  const onMint = async (e) => {
    e.preventDefault();
    console.log(imageFile);

    const metadata = await client.store({
      name: "sampleName",
      description: "sampleDesc",
      image: new File(imageBinary, imageFile.name, {
        type: imageFile.type,
      }),
    });
    console.log(metadata);
    console.log(metadata.url);
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
          <ImageUploader
            onChange={onUpload}
            singleImage={true}
            imgExtension={[".jpg", ".gif", ".png", ".jpeg"]}
            withPreview={true}
          />
          {/* react-images-upload props참조 --> 
              [rendering 조건]
              1. singlefile
              2. imageFile
              3. preview 가능
              4. upload한 file을 state에 set하는 것 
          */}

          <Button variant={"dark"} onClick={onMint}>
            Mint
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
