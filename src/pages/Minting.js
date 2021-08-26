import React from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import ImageUploader from "react-images-upload";
import jnftArtifact from "../artifacts/JNFT.json";
import nftSimpleArtifact from "../artifacts/NFTSimple.json";

import { NFTStorage, File } from "nft.storage";
const client = new NFTStorage({
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDBFYzExRkE1OGIzMUY3MzEzM2M2NmM3QzAzNGRmNzdDMEE5NWU1NjMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyODg1NDAzMjAzMSwibmFtZSI6IkpORlQifQ.YCCp8xERuM--5vKBAmK3LcFXbuZ3vaSNztjOs777Jt0",
});

export default function Minting({ ethAccount, web3 }) {
  const [imageFile, setImageFile] = React.useState(null);
  const [imageBinary, setImageBinary] = React.useState("");
  const [name, setName] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [targetNFT, setTargetNFT] = React.useState(
    jnftArtifact.networks["5777"].address
  );

  const onUpload = (pictures, pictureDataURL) => {
    setImageFile(pictures);
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
    console.log(imageFile);

    const token = await client.store({
      name: name,
      description: desc,
      image: new File(imageFile, imageFile[0].name, {
        type: imageFile[0].type,
      }),
    });
    console.log(token);

    /**
     * [실습]
     * imageURL저장 X ==> token.url  저장.
     */
    console.log(token.embed());

    // 1. NFT Contract에서 createToken 호출
    const nftContract = web3.jnftContract.clone();
    nftContract.options.address = targetNFT;
    const tokenTx = await nftContract.methods.createToken(token.url).send({
      from: ethAccount,
    });
    console.log(tokenTx);
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
          <Form.Group className="mb-3">
            <Form.Select
              onChange={(e) => {
                console.log(e.target.value);
                setTargetNFT(e.target.value);
              }}
            >
              <option value={jnftArtifact.networks["5777"].address}>
                {jnftArtifact.contractName}
              </option>
              <option value={nftSimpleArtifact.networks["5777"].address}>
                {nftSimpleArtifact.contractName}
              </option>
            </Form.Select>
          </Form.Group>
        </Col>

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
