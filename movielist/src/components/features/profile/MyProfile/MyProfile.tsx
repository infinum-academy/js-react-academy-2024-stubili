'use client';

import { Container, Flex, Heading, Text } from "@chakra-ui/react";
import { MyReviews } from "./components/MyReviews";
import { getShowsList, getFilterShowsList } from "@/fetchers/show";
import useSWR from "swr";

export function MyProfile() {
    const authHeadersString = sessionStorage.getItem('auth-headers')
	const authHeaders = JSON.parse(authHeadersString ?? JSON.stringify({
		client: '',
		accessToken: '',
        uid: ''
	}));
    const {data: AllShowsData} = useSWR('/shows',getShowsList);
    const {data: TopShowsData} = useSWR('/top-rated', getFilterShowsList);
    if (!AllShowsData || !TopShowsData){
        return;
    }
    const allShows = [...AllShowsData.shows,...TopShowsData.shows];

    return (
        <Container maxWidth={"none"} flexGrow={1} variant="review" color={"white"}>
            <Flex direction={"column"} gap={3} marginBottom={20}>
                <Heading>Current user:</Heading>
                <Text paddingLeft={"10px"}>{authHeaders.uid}</Text>
            </Flex>
            <MyReviews user={authHeaders.uid} shows={allShows} />
        </Container>
    )
}