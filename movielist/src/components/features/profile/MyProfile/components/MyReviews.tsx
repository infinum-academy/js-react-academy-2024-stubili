'use client';

import ReviewItem from "@/components/features/reviews/ReviewItem";
import { getReviewsList, IReviewInputsGet } from "@/fetchers/show";
import { IShow } from "@/typings/show";
import { Card, CardBody, CardHeader, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import NextLink from 'next/link';

interface IMyReviewsUser {
    user: string,
    shows: Array<IShow>
}

export interface IMyReviewsReview {
    show: IShow,
    reviews: Array<IReviewInputsGet>
}

export function MyReviews({user, shows}: IMyReviewsUser) {
    const {mutate} = useSWRConfig();
    const [allReviews, setAllReviews] = useState([] as IMyReviewsReview[]); 

    shows.map((show) => {
        const reviewObject: IMyReviewsReview = {show: show, reviews: []}
        const {data} = useSWR(`${show.id}`,getReviewsList,{
            onSuccess(data, key, config) {
                data.reviews.forEach((review) => {
                    if (review.user.email == user) {
                        reviewObject.reviews.push(review);
                    }
                });
                if (reviewObject.reviews.length > 0){
                    let isAdded = false;
                    allReviews.forEach((addedReviews) => {
                        if (addedReviews.show.id == reviewObject.show.id){
                            isAdded = true;
                        }
                    })
                    if (!isAdded){
                        setAllReviews([reviewObject,...allReviews]);
                    }
                }
            }
        })
        
    })


    return (
        <Flex direction={"column"} gap={2} width={["100%"]}>
            <Heading>My Reviews:</Heading>
            {allReviews.map((show) => {
                return show.reviews.map((review, index) => {
                    return (
                        <Card key={index} bg={"#371687"} color={"white"} id={`${review.id}`}>
                            <CardHeader>
                                <NextLink href={`/all-shows/${show.show.id}`}>
                                    {show.show.title}
                                </NextLink>
                            </CardHeader>
                            <CardBody>
                                <ReviewItem key={index} onMyProfile={true} review={review} onDelete={() => {
                                    document.getElementById(`${review.id}`)?.remove()
                                }}></ReviewItem>
                            </CardBody>
                        </Card>
                    )
                })
            })}
        </Flex>
    )
}