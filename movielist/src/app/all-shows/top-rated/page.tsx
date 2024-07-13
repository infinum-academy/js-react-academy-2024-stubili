'use client';

import ShowDetails from "@/components/features/shows/ShowDetails";
import styles from "../../page.module.css";
import { title } from "process";
import { color } from "framer-motion";
import ShowReviewSection from "@/components/features/shows/ShowReviewSection";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ShowCard } from "@/components/shared/ShowCard";
import { ShowsList } from "@/components/shared/ShowsList";
import { SideBarNavigation } from "@/components/shared/SideBarNavigation";
import { getFilterShowsList, getShowsList } from "@/fetchers/show";
import useSWR from "swr";

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

const mockList = {
  shows: [
    {
      id: 1,
      title: "Shrek 2",
      description: "Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona's parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.",
      average_rating: 2,
      no_of_reviews: 0,
      image_url: "https://facts.net/wp-content/uploads/2023/09/49-facts-about-the-movie-shrek-2-1693670471.jpg"
    }
  ]
}

export default function TopRatedShows() {
  const { data, error, isLoading } = useSWR('/top-rated', getFilterShowsList);

	const shows = data?.shows || [];

	if (isLoading) {
		return <div>Loading....</div>;
	}

	if (error) {
		return <div>Ups...something went wrong</div>;
	}
  return (
    <main className={styles.main}>
      <Flex>
        <SideBarNavigation></SideBarNavigation>
        <ShowsList shows={shows}/>
      </Flex>
    </main>
  );
}