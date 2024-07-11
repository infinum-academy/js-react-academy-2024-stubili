'use client';

import ShowDetails from "@/components/features/shows/ShowDetails";
import styles from "./page.module.css";
import { title } from "process";
import { color } from "framer-motion";
import ShowReviewSection from "@/components/features/shows/ShowReviewSection";
import { Container, Heading, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { ShowCard } from "@/components/shared/ShowCard";
import { ShowsList } from "@/components/shared/ShowsList";
import { SideBarNavigation } from "@/components/shared/SideBarNavigation";
import { getShowsList } from "@/fetchers/show";
import useSWR from "swr";

export default function Home() {
  const { data, error, isLoading } = useSWR('/shows', getShowsList);

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
