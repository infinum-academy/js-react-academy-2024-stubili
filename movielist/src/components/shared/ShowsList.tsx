'use client';
import { IShow } from "@/typings/show";
import { Container, Flex, Heading, Image } from "@chakra-ui/react";
import { ShowCard } from "./ShowCard";
import { url } from "inspector";
import NextLink from 'next/link';

export interface IShowsListProps {
    shows: Array<IShow>;
}

export function ShowsList({shows} : IShowsListProps) {
    return (
        <Flex flexGrow={1} flexWrap={"wrap"} gap={"30px"} marginTop={6}>
            {shows.map((show) => {
                return (
                    <NextLink key={show.id} href={`/all-shows/${show.id}`}>
                        <div style={{borderRadius: "10px", backgroundColor: "white", overflow: "hidden", width: "300px"}}>
                            <Flex flexDirection={"column"}>
                                <Image src={show.image_url} alt="Show poster" fallbackSrc='https://via.placeholder.com/150' height={"600px"} objectFit={"cover"}></Image>
                                <Heading size={"md"} padding={"0 5px 0 5px"}>{show.title}</Heading>
                                <div style={{paddingLeft: "5px"}}>{show.average_rating > 0 ? show.average_rating.toFixed(1) + " / 5" : "no ratings"}</div>
                            </Flex>
                        </div>
                    </NextLink>
                )
            })}
        </Flex>
    )
}