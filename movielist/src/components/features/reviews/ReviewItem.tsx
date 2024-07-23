import { IReviewInputsGet } from "@/fetchers/show"
import { Button, chakra, Flex } from "@chakra-ui/react"
import { Span } from "next/dist/trace"
import { useForm } from "react-hook-form"
import { IReviewInputs } from "../shows/ReviewForm"
import { deleteReview } from "@/fetchers/mutators"
import useSWRMutation from "swr/mutation"

interface IReview {
    review: IReviewInputsGet,
    onDelete: (reviewToRemove: IReviewInputsGet) => void
}

export interface IReviewItem {
    reviewText: string,
    score: number,
    user: string
}

export default function ReviewItem({review, onDelete}: IReview) {
    const authHeadersString = sessionStorage.getItem('auth-headers')
	const authHeaders = JSON.parse(authHeadersString ?? JSON.stringify({
		client: '',
		accessToken: '',
        uid: ''
	}));
    const {register, handleSubmit} = useForm<{id: string}>();
    const {trigger} = useSWRMutation(`https://tv-shows.infinum.academy/reviews/${review.id}`,deleteReview);
    const onClickHandler = async (data: {id: string}) => {
        console.log(review);
        await trigger(data).then(() => {
            window.location.reload();
        });
        //onDelete(review);
    }
    if (review.user.email == authHeaders.uid){
        return (
            <Flex flexDirection={"column"} backgroundColor={"#4b009b"} color={"white"} marginTop={3} padding={2} borderRadius={10} gap={2}>
                <div>{review.user.email}</div>
                <div>{review.comment}</div>
                <div>{review.rating} / 5</div>
                <chakra.form onSubmit={handleSubmit(onClickHandler)}>
                    <Button {...register('id')} width={20} size={"sm"}alignSelf={"flex-end"} type="submit" value={review.id}>Remove</Button>
                </chakra.form>
            </Flex>
        )
    } else {
        return (
        <Flex flexDirection={"column"} backgroundColor={"#4b009b"} color={"white"} marginTop={3} padding={2} borderRadius={10} gap={2}>
                <div>{review.user.email}</div>
                <div>{review.comment}</div>
                <div>{review.rating} / 5</div>
        </Flex>
        )
    }
}