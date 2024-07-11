import { Button, Flex } from "@chakra-ui/react"
import { Span } from "next/dist/trace"

interface IReview {
    review: IReviewItem,
    onDelete: (reviewToRemove: IReviewItem) => void
}

export interface IReviewItem {
    reviewText: string,
    score: number,
}

export default function ReviewItem({review,onDelete}: IReview) {
    const onClickHandler = () => {
        onDelete(review);
    }
    return (
        <Flex flexDirection={"column"} backgroundColor={"#4b009b"} color={"white"} marginTop={3} padding={2} borderRadius={10} gap={2}>
            <div>{review.reviewText}</div>
            <div>{review.score} / 5</div>
            <Button width={20} size={"sm"} onClick={onClickHandler} alignSelf={"flex-end"}>Remove</Button>
        </Flex>
    )
}