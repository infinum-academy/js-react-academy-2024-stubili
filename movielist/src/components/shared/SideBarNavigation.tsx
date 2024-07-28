'use client';

import { Button, Container, Flex } from "@chakra-ui/react";
import NextLink from 'next/link';


export function SideBarNavigation() {
    const logOut = () => {
        sessionStorage.removeItem('auth-headers');
    }
    return (
        <Container height={"100vh"} width={"30vw"} color={"white"} paddingLeft={"0"}>
            <div>Tv show app</div>
            <Flex flexDirection={"column"} gap={"25px"} paddingLeft={"25px"} marginTop={"20px"}>
                <NextLink href={'/'}>
                    <div>All shows</div>
                </NextLink>
                <NextLink href={'/all-shows/top-rated'}>
                    <div>Top rated</div>
                </NextLink>
                <div style={{height: "70vh"}}>My profile</div>
                <NextLink href={'/login'}>
                    <div onClick={logOut}>Log out</div>
                </NextLink>
            </Flex>
        </Container>
    )
}