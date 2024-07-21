import { IShowsListProps } from "@/components/shared/ShowsList";
import { fetcher } from "./fetcher";
import { IShow } from "@/typings/show";


export function getShowsList() {
    return fetcher<IShowsListProps>('https://tv-shows.infinum.academy/shows');
}

export function getFilterShowsList() {
    return fetcher<IShowsListProps>('https://tv-shows.infinum.academy/shows/top_rated');
}

export function getShow(id: string) {
    return fetcher<IShow>(`https://tv-shows.infinum.academy/shows/${id}`);
}