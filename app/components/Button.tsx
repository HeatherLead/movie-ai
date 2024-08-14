import { Button } from "@radix-ui/themes";
import React from "react";
interface params {
  vari?:
    | "classic"
    | "soft"
    | "solid"
    | "surface"
    | "outline"
    | "ghost"
    | undefined;
  text: string;
}
const ButtonComponent = ({ vari, text }: params) => {
  return (
    <Button
      variant={vari}
      style={{
        cursor: "pointer",
        padding: "25px",
        fontSize: "20px",
        boxShadow: "initial",
        textAlign: "center",
      }}
    >
      {text}
    </Button>
  );
};

export default ButtonComponent;
