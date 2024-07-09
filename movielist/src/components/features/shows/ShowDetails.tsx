import { IShowProp } from "@/typings/show";
import { Flex, Heading, Image } from "@chakra-ui/react";
import styles from "./showdetails.module.css";

export default function ShowDetails({show}: IShowProp) {
    return (
    <Flex className={styles.showdetails} flexDirection={"column"}>
        <Image src={show.imageUrl} alt="Show poster" fallbackSrc='https://via.placeholder.com/150'></Image>
        <Heading  className={styles.header} size={"md"}>{show.title}</Heading>
        <div className={styles.div}>{show.description}</div>
        <div className={styles.div}>{show.averageRating > 0 ? show.averageRating.toFixed(1) + " / 5" : "no ratings"}</div>
    </Flex>
    )
}