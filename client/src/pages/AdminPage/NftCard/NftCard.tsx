import { Card, CardMedia, CardContent, Typography } from "@mui/material";
import React from "react";
import { NFT } from "../../../api/blockchainApi";

interface INftCardProps {
  nft: NFT;
}

const NftCard: React.FC<INftCardProps> = ({ nft }) => {
  return (
    <Card sx={{ width: 256 }}>
      <CardMedia
        component="img"
        height="194"
        image={nft.uri}
        style={{ objectFit: "fill" }}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          Осталось: {nft.tokens.length}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NftCard;
