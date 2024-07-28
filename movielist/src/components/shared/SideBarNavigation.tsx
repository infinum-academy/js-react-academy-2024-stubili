'use client';

import { Button, Container, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from 'next/link';


export function SideBarNavigation() {
    const logOut = () => {
        sessionStorage.removeItem('auth-headers');
    }
    return (
        <Container height={"100vh"} width={"30vw"} color={"white"} paddingLeft={"0"} variant="review" textAlign={"center"}>
            <Heading size={"sm"} marginLeft={"25px"} marginBottom={"25px"}>Tv show app</Heading>
            <Flex flexDirection={"column"} height={"100%"}>
                <Flex flexDirection={"column"} gap={"25px"} paddingLeft={"25px"} marginTop={"20px"} textAlign={"center"} flexGrow={1}>
                    <NextLink href={'/'}>
                        <Text variant="mainPage">All shows</Text>
                    </NextLink>
                    <NextLink href={'/all-shows/top-rated'}>
                        <Text variant="mainPage">Top rated</Text>
                    </NextLink>
                    <Text variant="mainPage">My profile</Text>
                </Flex>
                <NextLink href={'/login'}>
                    <Text alignSelf={"flex-end"} onClick={logOut} variant="mainPage" marginLeft={"25px"}>Log out</Text>
                </NextLink>
            </Flex>
        </Container>
    )
}