import { Textarea, Button, Input, Flex, RadioGroup, Radio, chakra, FormControl } from "@chakra-ui/react";
import { useState } from "react";
import { IReviewItem } from "../reviews/ReviewItem";
import { useForm } from "react-hook-form";

interface IReviewAddForm {
    onAdd: (review: IReviewItem) => void;
}

interface IReviewInputs {
    comment: string,
    score: string
}

export default function ReviewForm({onAdd}: IReviewAddForm) {
    const {register, handleSubmit} = useForm<IReviewInputs>();
    const [score, setScore] = useState('1');
    const [comment, setComment] = useState('');
    const onClickHandler = () => {
        const newReview: IReviewItem = {
            reviewText: comment,
            score: parseInt(score),
            user: JSON.parse(sessionStorage.getItem('auth-headers')).uid
        }
        onAdd(newReview);
        setScore('1');
        setComment('');
    }
    return (
        <chakra.form flexDirection={"column"} onSubmit={onClickHandler}>
            <FormControl isRequired={true}>
                <Textarea 
                {...register('comment')}
                onChange={(e) => {setComment(e.currentTarget.value)}}
                value={comment}
                placeholder="Add review"
                id="review-text" 
                backgroundColor={"white"} 
                resize={"none"} 
                marginBottom={5} 
                marginTop={10}></Textarea>
            </FormControl>
            <FormControl>
                <RadioGroup {...register('score')} onChange={setScore} value={score} defaultValue="1" marginBottom={5} color={"white"}>
                    <Radio value="1" marginLeft={5}>1</Radio>
                    <Radio value="2" marginLeft={5}>2</Radio>
                    <Radio value="3" marginLeft={5}>3</Radio>
                    <Radio value="4" marginLeft={5}>4</Radio>
                    <Radio value="5" marginLeft={5}>5</Radio>                                    
                </RadioGroup>
            </FormControl>
            <Button width={"75px"} type="submit">Post</Button>
        </chakra.form>
    )
}