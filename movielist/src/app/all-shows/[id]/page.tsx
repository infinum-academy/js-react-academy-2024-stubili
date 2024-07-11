'use client';
import { ShowCard } from "@/components/shared/ShowCard";
import styles from "../../page.module.css";
import { SideBarNavigation } from "@/components/shared/SideBarNavigation";
import { Flex } from "@chakra-ui/react";
import { getShow } from "@/fetchers/show";
import useSWR from "swr";
import { title } from "process";
import { useParams } from "next/navigation";

const mockShow = {
    show: {
      id: 1,  
      title: "Shrek 2",
      description: "Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona's parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.",
      average_rating: 2,
      no_of_reviews: 0,
      image_url: "https://facts.net/wp-content/uploads/2023/09/49-facts-about-the-movie-shrek-2-1693670471.jpg"
    }
  }

export default function ShowInfoPage() {
    const params = useParams();
    const { data, error, isLoading } = useSWR(`/shows/${params.id}`,() => getShow(params.id as string));
    
    if (error) {
        return <div>Ups...something went wrong</div>;
    }

	if (isLoading || !data) {
		return <div>Loading....</div>;
	}

    return (
        <main className={styles.main}>
            <Flex>
                <SideBarNavigation></SideBarNavigation>
                <ShowCard show={data}></ShowCard>
            </Flex>
        </main>
    )
}