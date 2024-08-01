'use client';

import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Heading, IconButton, Show, Text, useDisclosure } from "@chakra-ui/react";
import NextLink from 'next/link';
import { ShowPicker } from "../features/picker/ShowPicker/ShowPicker";
import { HamburgerIcon } from "@chakra-ui/icons";


export function SideBarNavigation() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const logOut = () => {
        sessionStorage.removeItem('auth-headers');
    }
    return (
        <>
            <Show above="sm">
                <Container height={"100vh"} width={"700px"} position={"sticky"} top={0} color={"white"} paddingLeft={"0"} variant="review" textAlign={"center"}>
                    <Heading size={"sm"} marginLeft={"25px"} marginBottom={"25px"}>Tv show app</Heading>
                    <Flex flexDirection={"column"} height={"100%"}>
                        <Flex flexDirection={"column"} gap={"25px"} paddingLeft={"25px"} marginTop={"20px"} textAlign={"center"} flexGrow={1}>
                            <NextLink href={'/'}>
                                <Text variant="mainPage">All shows</Text>
                            </NextLink>
                            <NextLink href={'/all-shows/top-rated'}>
                                <Text variant="mainPage">Top rated</Text>
                            </NextLink>
                            <NextLink href={'/my-profile'}>
                                <Text variant="mainPage">My profile</Text>    
                            </NextLink>
                            <ShowPicker />
                        </Flex>
                        <NextLink href={'/login'}>
                            <Text alignSelf={"flex-end"} onClick={logOut} variant="mainPage" marginLeft={"25px"}>Log out</Text>
                        </NextLink>
                    </Flex>
                </Container>
            </Show>
            <Show below="sm">
                <Container display={"flex"} flexDirection={"row"} padding={"10px"} width={"100%"} position={"sticky"} top={0} color={"white"} paddingLeft={"0"} variant="review" textAlign={"center"} justifyContent={"space-between"}>
                    <Heading size={"sm"} marginLeft={"25px"} marginBottom={"25px"}>Tv show app</Heading>
                    <IconButton icon={<HamburgerIcon />} aria-label={""} width={"auto"} borderRadius={"10px"} onClick={onOpen} />
                    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
                        <DrawerOverlay />
                        <DrawerContent bg={"#371687"} color={"white"}>
                            <DrawerCloseButton />
                            <DrawerHeader>Menu</DrawerHeader>
                            <DrawerBody>
                                <Flex direction={"column"} gap={3}>
                                    <NextLink href={'/'}>
                                        <Text variant="mainPage">All shows</Text>
                                    </NextLink>
                                    <NextLink href={'/all-shows/top-rated'}>
                                        <Text variant="mainPage">Top rated</Text>
                                    </NextLink>
                                    <NextLink href={'/my-profile'}>
                                        <Text variant="mainPage">My profile</Text>    
                                    </NextLink>
                                    <ShowPicker />
                                </Flex>
                            </DrawerBody>
                            <DrawerFooter>
                                <NextLink href={'/login'}>
                                    <Text alignSelf={"flex-end"} onClick={logOut} variant="mainPage" marginLeft={"25px"}>Log out</Text>
                                </NextLink>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </Container>
            </Show>
        </>
    )
}