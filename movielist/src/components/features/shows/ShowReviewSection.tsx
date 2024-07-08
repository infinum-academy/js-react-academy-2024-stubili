'use client';

import { Flex } from "@chakra-ui/react";
import ReviewForm from "./ReviewForm";
import ReviewList, { IReviewList } from "../reviews/ReviewList";
import { useEffect, useState } from "react";
import { IReviewItem } from "../reviews/ReviewItem";

const mockReviews: IReviewList = {
        reviews: [
            {
                reviewText: "Enjoyed it",
                score: 4
            },
            {
                reviewText: "Quite bad",
                score: 2
            },
            {
                reviewText: "It was okay",
                score: 3
            }
        ]
}

interface IUpdateRating {
    updateRating: (avgRating: number) => void 
}

export default function ShowReviewSection({updateRating}: IUpdateRating) {
    const [reviews, setReviewList] = useState(mockReviews);

     useEffect(() => {
        const loadedList = loadFromLocalStorage();
        setReviewList(loadedList);
      }, []); 
    
      const saveToLocalStorage = (reviewList: IReviewList) => {
        localStorage.setItem('reviewlist', JSON.stringify(reviews));
      };
    
      const loadFromLocalStorage = () => {
        const toListsString = localStorage.getItem('reviewlist');
        if (!toListsString){
            return mockReviews;
        }
        return JSON.parse(toListsString);
      };

    const onAddReview = (review: IReviewItem) => {
        const newReviewList = {
            reviews: [...reviews.reviews, review]
        }
        setReviewList(newReviewList);
        calculateAvgRating(review.score);
        saveToLocalStorage({
            reviews: [...reviews.reviews, review]
        });
    }

    const onDeleteReview = (reviewToRemove: IReviewItem) => {
        const newList = {
            reviews: reviews.reviews.filter((review) => review !== reviewToRemove),
          };
          setReviewList(newList);
          calculateAvgRating(-reviewToRemove.score);
          saveToLocalStorage({
            reviews: reviews.reviews.filter((review) => review !== reviewToRemove),
          });
    }

    const calculateAvgRating = (score: number) => {
        let sum = score;
        reviews.reviews.forEach((review) => {
            sum += review.score;
        })
        sum /= score > 0 ? reviews.reviews.length + 1 : reviews.reviews.length - 1;
        updateRating(sum);
    }

    return (
        <Flex flexDirection={"column"}>
            <ReviewForm onAdd={onAddReview}/>
            <ReviewList reviewList={reviews} onDelete={onDeleteReview}></ReviewList>
        </Flex>
    )
}