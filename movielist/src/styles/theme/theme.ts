import { extendTheme } from "@chakra-ui/react";
import '@fontsource/roboto';
import Container from "./components/container";
import Input from "./components/input";
import Button from "./components/button";
import Text from "./components/text";

const fonts = {
    body: "Roboto, sans-serif",
    heading: "Roboto, sans-serif"
}

const colors = {
    lightPurple: "#8D5CE5",
    purple: "#371687",
    darkPurple: "#1B004C",
    pink: "#FF2498"
}

const theme = extendTheme({
    components: {
        Container,
        Input,
        Button,
        Text
    },
    fonts,
    colors
}
);

export default theme;