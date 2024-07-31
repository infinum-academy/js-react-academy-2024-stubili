import { IShow, IShowProp } from "@/typings/show";
import { Flex, Heading, Image } from "@chakra-ui/react";

export default function ShowDetails({show}: IShow) {
    return (
    <Flex borderRadius={"20px"} backgroundColor={"white"} overflow={"hidden"} color={"#371687"} flexDirection={"column"}>
        <Image src={show.image_url} alt="Show poster" fallbackSrc='https://via.placeholder.com/150'></Image>
        <Heading paddingLeft={"45px"} paddingTop={"12px"} size={"md"}>{show.title}</Heading>
        <div style={{padding: "15px 45px 15px 45px"}}>{show.description}</div>
        <div style={{padding: "15px 45px 15px 45px"}}>{show.average_rating > 0 ? show.average_rating.toFixed(1) + " / 5" : "no ratings"}</div>
    </Flex>
    )
}