import React from "react";
import { Card, CardContent, SxProps, CardHeader, CardActions, } from "@mui/material";
import "../styles/elements/CardElement.scss";
interface CardProps {
  title: string;
  subheader?: string;
  paragraph?: string | undefined;
  buttons?: React.ReactNode;
  sx?: SxProps;
}

const CardElement: React.FC<CardProps> = ({ title, subheader, children, sx, buttons }) => {

  return (
    <Card sx={sx} className="card-element">
      <CardHeader
        title={title}
        sx={{ textAlign: "center" }}
        titleTypographyProps={{ fontSize: "1.5rem", fontWeight: "600" }}
        subheader={subheader}
      />
      <CardContent>{children}</CardContent>
      {buttons && (
        <CardActions sx={{ flexWrap: "wrap" }}>
          {buttons}
        </CardActions>
      )}
    </Card>
  );
};
export default CardElement;
