'use client';

import { Flex } from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import ReviewList, { IReviewList } from "../reviews/ReviewList";
import { useEffect, useState } from "react";
import { IReviewItem } from "../reviews/ReviewItem";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { fetcher } from "@/fetchers/fetcher";
import { getReviewsList, IReviewInputsGet } from "@/fetchers/show";

const mockReviews: IReviewList = {
        reviews: []
}

interface IUpdateRating {
    updateRating: (avgRating: number) => void 
}

export default function ShowReviewSection({updateRating}: IUpdateRating) {
    const params = useParams();
    const {data, isLoading} = useSWR(`/reviews/${params.id}`,() => getReviewsList(params.id as string));
    const reviewsList = data?.reviews || [];

    if (isLoading){
        return <div>Loading...</div>
    }

    //const [reviews, setReviewList] = useState(reviewsList);

    const onAddReview = (review: IReviewItem) => {
        const newReviewList = {
            reviews: [...reviews, review]
        }
        //setReviewList(newReviewList);
        calculateAvgRating(review.score);
    }

    const onDeleteReview = (reviewToRemove: IReviewInputsGet) => {
        const newList = {
            reviews: reviews.filter((review) => review !== reviewToRemove),
          };
          //setReviewList(newList.reviews);
          calculateAvgRating(-reviewToRemove.rating);
    }

    const calculateAvgRating = (score: number) => {
        let sum = score;
        reviews.forEach((review) => {
            sum += review.rating;
        })
        sum /= score > 0 ? reviews.length + 1 : reviews.length - 1;
        updateRating(sum);
    }

    return (
        <Flex flexDirection={"column"}>
            <ReviewForm onAdd={onAddReview}/>
            <ReviewList reviewList={reviewsList} onDelete={onDeleteReview}></ReviewList>
        </Flex>
    )
}