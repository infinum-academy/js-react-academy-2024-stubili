import { defineStyleConfig } from '@chakra-ui/react';

const Container = defineStyleConfig({
    baseStyle: {
        bg: "purple",
        padding: "56px 53px 48px 53px",
        borderRadius: "15"
    },

    variants: {
        login: {
            bg: "purple",
            width: "500px"
        },

        review: {
            bg: "darkPurple", 
            margin: 0
        }
    }
})


export default Container;