export interface IShowProp {
    show: IShow
}

export interface IShow {
    id: number,
    title: string,
    description: string,
    average_rating: number,
    no_of_reviews: number,
    image_url: string
}