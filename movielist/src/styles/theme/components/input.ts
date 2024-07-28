import { defineStyleConfig } from "@chakra-ui/react";

const Input = defineStyleConfig({
    baseStyle: {
        border: "2px black",
        color: "white",
        borderRadius: "full",
    },
    sizes: {

    },

    variants: {
        login: {
            border: "2px black",
            color: "white",
        }
    }
})


export default Input;