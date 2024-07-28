'use client';
import { Container, Heading } from "@chakra-ui/react";
import { useState } from "react";
import ShowDetails from "../features/shows/ShowDetails";
import ShowReviewSection from "../features/shows/ShowReviewSection";
import { IShow } from "@/typings/show";

interface IShowProp {
    show: IShow
}


export function ShowCard({show} : IShowProp) {
    const [avgRating, setAvgRating] = useState(show.show.average_rating);
    show.show.average_rating = avgRating;
    return (
        <Container style={{width: "920px", maxWidth:"100%"}}>
          <ShowDetails show={show.show} />
          <ShowReviewSection updateRating={setAvgRating}/>
        </Container>
    );
  }