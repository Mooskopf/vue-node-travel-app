export type Destination = {
    name: string,
    color: string,
    reviews: Review[]
}

export type User = {
    name: string,
    email: string,
}

export type Review = {
    destination: string,
    author: string,
    stars: 0 | 1 | 2 | 3 | 4 | 5,
    text: string
}