'use client';
import { ShowCard } from "@/components/shared/ShowCard";
import styles from "../../page.module.css";
import { SideBarNavigation } from "@/components/shared/SideBarNavigation";
import { Flex } from "@chakra-ui/react";
import { getShow } from "@/fetchers/show";
import useSWR from "swr";
import { title } from "process";
import { useParams } from "next/navigation";

export default function ShowInfoPage() {
    const params = useParams();
    const { data, error, isLoading } = useSWR(`https://tv-shows.infinum.academy/shows/top_rated/${params.id}`,() => getShow(params.id as string));
    
    if (error) {
        return <div>Ups...something went wrong</div>;
    }

	if (isLoading || !data) {
		return <div>Loading....</div>;
	}

    return (
        <main className={styles.main} style={{width: "100%"}}>
            <Flex width={"100%"}>
                <SideBarNavigation></SideBarNavigation>
                <ShowCard show={data}></ShowCard>
            </Flex>
        </main>
    )
}