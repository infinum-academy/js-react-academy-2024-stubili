import { IShowsListProps } from "@/components/shared/ShowsList";
import { fetcher } from "./fetcher";
import { IShow } from "@/typings/show";
import { IReviewInputs } from "@/components/features/shows/ReviewForm";

interface IReviewInputsGetList {
    reviews: Array<IReviewInputsGet>
}


export interface IReviewInputsGet {
    id: number,
    comment: string,
    rating: number,
    show_id: number,
    user: {
        id: string,
        email: string,
        image_url: string
    }
}


export function getShowsList() {
    return fetcher<IShowsListProps>('https://tv-shows.infinum.academy/shows');
}

export function getFilterShowsList() {
    return fetcher<IShowsListProps>('https://tv-shows.infinum.academy/shows/top_rated');
}

export function getShow(id: string) {
    return fetcher<IShow>(`https://tv-shows.infinum.academy/shows/${id}`);
}

export function getReviewsList(id: string) {
    return fetcher<IReviewInputsGetList>(`https://tv-shows.infinum.academy/shows/${id}/reviews`);
}