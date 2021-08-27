import React from "react";
import { Card, Button } from "react-bootstrap";
import web3, { marketContract, jnftContract } from "../utils/ether";
import { ipfsToHttps } from "../utils/url";

export default function MyTokenItem({ item, tokenId }) {
  const [tokenInfo, setTokenInfo] = React.useState({});
  const [ethAccount, setEthAccount] = React.useState("");

  React.useEffect(() => {
    web3.eth.requestAccounts().then((accounts) => {
      const account = accounts[0];
      setEthAccount(account);
    });
    if (item) {
      if (item.startsWith("ipfs")) {
        const url = ipfsToHttps(item);
        fetch(url)
          .then((resp) => {
            return resp.json();
          })
          .then((data) => {
            const imageUrl = ipfsToHttps(data.image);
            setTokenInfo({
              ...data,
              image: imageUrl,
            });
          });
      } else {
        // http
        setTokenInfo({
          name: "",
          description: "",
          image: item,
        });
      }
    }
  }, []);
  return (
    <Card>
      <Card.Header>{tokenId}</Card.Header>
      <Card.Img src={tokenInfo.image} />
      <Card.Body>
        <Button
          onClick={async () => {
            const isAgree = window.confirm("판매하시겠습니까?");
            if (isAgree) {
              console.log(marketContract);
              const _price = window.prompt("가격을 입력해주세요 (단위 - eth)");
              /**
               * createMarketItem 전에 해줘야 할 것들
               * 1. 해당 nft-contract에서 market의 중개 허가를 받았는지 체크
               * 2. 해당 nft-contract에서 허가O ==> createMarketItem
               * 3. 해당 nft-contract에서 허가X
               *    ==> 4. 허가 받고
               *    ==> 5. createMarketItem 호출
               */
              // 1. 해당 nft-contract에서 marektContract의 중개 허가 체크
              const nftContract = jnftContract.clone();
              const isApproved = await nftContract.methods
                .isApprovedForAll(ethAccount, marketContract.options.address)
                .call({ from: ethAccount });
              console.log(isApproved);
              // 3. 해당 nft-contract에서 허가X
              if (
                !isApproved &&
                window.confirm(
                  "등록하시려면 해당 market의 권한을 할당 해 주셔야합니다."
                )
              ) {
                try {
                  // 4. 해당 nftContract에 허가 받는다.
                  const receipt = await nftContract.methods
                    .setApprovalForAll(marketContract.options.address, true)
                    .send({
                      from: ethAccount,
                    });
                  console.log(receipt);
                } catch (error) {
                  console.error(error);
                  return;
                }
              }
              // 5. createMarketItem 호출

              marketContract.methods
                .createMarketItem(
                  jnftContract._address,
                  tokenId,
                  web3.utils.toWei(_price, "ether")
                )
                .send({
                  from: ethAccount,
                  value: web3.utils.toWei("0.001", "ether"),
                })
                .then((receipt) => {
                  console.log("receipt", receipt);
                });
            }
          }}
        >
          Store
        </Button>
      </Card.Body>
    </Card>
  );
}
