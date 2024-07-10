import { Flex } from "@chakra-ui/react";
import ReviewItem, { IReviewItem } from "./ReviewItem";

export interface IReviewListProps {
    reviewList: IReviewList,
    onDelete: (reviewToRemove: IReviewItem) => void
}

export interface IReviewList {
    reviews: Array<IReviewItem>
}

export interface IRemoveItem {
    onDelete: (reviewToRemove: IReviewItem) => void
}

export default function ReviewList({reviewList, onDelete}: IReviewListProps) {
    return (
        <Flex flexDirection={"column"} gap={2}>
            {reviewList.reviews.map((review, index) => {
                return (
                    <ReviewItem key={index} review={review} onDelete={onDelete}></ReviewItem>
                )
            })}
        </Flex>
    )
}