import { Textarea, Button, Input, Flex, RadioGroup, Radio } from "@chakra-ui/react";
import { useState } from "react";
import { IReviewItem } from "../reviews/ReviewItem";

interface IReviewAddForm {
    onAdd: (review: IReviewItem) => void;
}

export default function ReviewForm({onAdd}: IReviewAddForm) {
    const [score, setScore] = useState('1');
    const onClickHandler = () => {
        const reviewTextElement = document.getElementById("review-text") as HTMLInputElement;
        const reviewText = reviewTextElement.value;
        if (!reviewText){
            reviewTextElement.ariaInvalid = "true";
            return;
        }
        reviewTextElement.ariaInvalid = "false";
        const newReview: IReviewItem = {
            reviewText: reviewText,
            score: parseInt(score)
        }
        onAdd(newReview);
        setScore('1');
        reviewTextElement.value = "";
    }
    return (
        <Flex flexDirection={"column"}>
        <Textarea placeholder="Add review" id="review-text" backgroundColor={"white"} resize={"none"} marginBottom={5} marginTop={10}></Textarea>
        <RadioGroup onChange={setScore} value={score} defaultValue="1" marginBottom={5} color={"white"}>
            <Radio value="1" marginLeft={5}>1</Radio>
            <Radio value="2" marginLeft={5}>2</Radio>
            <Radio value="3" marginLeft={5}>3</Radio>
            <Radio value="4" marginLeft={5}>4</Radio>
            <Radio value="5" marginLeft={5}>5</Radio>                                    
        </RadioGroup>
        <Button width={"75px"} onClick={onClickHandler}>Post</Button>
        </Flex>
    )
}