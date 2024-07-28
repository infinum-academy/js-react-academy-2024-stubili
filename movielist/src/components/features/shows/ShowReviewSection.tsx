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
import useSWRMutation from "swr/mutation";

interface IUpdateRating {
    updateRating: (avgRating: number) => void 
}

export default function ShowReviewSection({updateRating}: IUpdateRating) {
    const params = useParams();
    const [reviewList, updateReviewList] = useState(Array<IReviewInputsGet>);
    const updateReviews = async () => {
        await getReviewsList(params.id as string).then(
            (data) => {
                updateReviewList(data.reviews);
                let sum = 0;
                data.reviews.forEach((review) => {
                    sum += review.rating;
                })
                sum /= data.reviews.length;
                updateRating(sum);
            }
        )
    }
    const {trigger} = useSWRMutation(`/reviews/${params.id}`,updateReviews);

    const updateReviewsTrigger = async () => {
        await trigger();
    }

    useEffect(() => {
        updateReviewsTrigger();
    },[]);

    return (
        <Flex flexDirection={"column"}>
            <ReviewForm onAdd={updateReviewsTrigger}/>
            <ReviewList reviewList={reviewList} onDelete={updateReviewsTrigger}></ReviewList>
        </Flex>
    )
}