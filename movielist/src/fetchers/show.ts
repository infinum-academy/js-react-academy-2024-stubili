import { IShowsListProps } from "@/components/shared/ShowsList";
import { fetcher } from "./fetcher";
import { IShow } from "@/typings/show";


export function getShowsList() {
    return fetcher<IShowsListProps>('/api/shows');
}

export function getFilterShowsList() {
    return fetcher<IShowsListProps>('/api/shows/top-rated');
}

export function getShow(id: string) {
    return fetcher<IShow>(`/api/shows/${id}`);
}