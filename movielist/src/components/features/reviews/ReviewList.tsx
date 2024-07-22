import { Flex } from "@chakra-ui/react";
import ReviewItem, { IReviewItem } from "./ReviewItem";
import { IReviewInputsGet } from "@/fetchers/show";

export interface IReviewListProps {
    reviewList: Array<IReviewInputsGet>,
    onDelete: (reviewToRemove: IReviewInputsGet) => void
}

export interface IReviewList {
    reviews: Array<IReviewInputsGet>
}

export interface IRemoveItem {
    onDelete: (reviewToRemove: IReviewInputsGet) => void
}

export default function ReviewList({reviewList, onDelete}: IReviewListProps) {
    return (
        <Flex flexDirection={"column"} gap={2}>
            {reviewList.map((review, index) => {
                return (
                    <ReviewItem key={index} review={review} onDelete={onDelete}></ReviewItem>
                )
            })}
        </Flex>
    )
}