'use client';

import ShowDetails from "@/components/features/shows/ShowDetails";
import styles from "./page.module.css";
import { title } from "process";
import { color } from "framer-motion";
import ShowReviewSection from "@/components/features/shows/ShowReviewSection";
import { Container, Heading } from "@chakra-ui/react";
import { useState } from "react";

const mockShow = {
  show: {
    title: "Shrek 2",
    description: "Shrek and Fiona travel to the Kingdom of Far Far Away, where Fiona's parents are King and Queen, to celebrate their marriage. When they arrive, they find they are not as welcome as they thought they would be.",
    averageRating: 2,
    imageUrl: "https://facts.net/wp-content/uploads/2023/09/49-facts-about-the-movie-shrek-2-1693670471.jpg"
  }
}

export default function Home() {
  const [avgRating, setAvgRating] = useState(mockShow.show.averageRating);
  mockShow.show.averageRating = avgRating;
  return (
    <main className={styles.main}>
      <Container style={{width: "920px", maxWidth:"100%"}}>
        <Heading color={"white"}>MovieList</Heading>
        <ShowDetails show={mockShow.show} />
        <ShowReviewSection updateRating={setAvgRating}/>
      </Container>
    </main>
  );
}
