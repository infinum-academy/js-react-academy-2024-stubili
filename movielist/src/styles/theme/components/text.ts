import { defineStyleConfig } from "@chakra-ui/react";

const Text = defineStyleConfig({
    baseStyle: {
    },
    variants: {
        basic: {},
        mainPage: {
            borderRadius: "full",
            _hover: {
                bg: "purple"
            }
        }
    }
})


export default Text;