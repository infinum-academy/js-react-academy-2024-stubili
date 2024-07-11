'use client';
import { Container, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ShowDetails from "../features/shows/ShowDetails";
import ShowReviewSection from "../features/shows/ShowReviewSection";

interface IShowProp {
    show: {
        title: string,
        description: string,
        averageRating: number,
        imageUrl: string
    }
}


export function ShowCard({show} : IShowProp) {
    const [avgRating, setAvgRating] = useState(show.averageRating);
    show.averageRating = avgRating;
    return (
        <Container style={{width: "920px", maxWidth:"100%"}}>
          <ShowDetails show={show} />
          <ShowReviewSection updateRating={setAvgRating}/>
        </Container>
    );
  }