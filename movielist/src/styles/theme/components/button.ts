import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: "full",
        color: "purple",
        padding: "26px 47px 26px 47px",
        width: "144px",
        heigth: "auto",

        _hover: {
            bg: "white"
        }
    }

})

export default Button;