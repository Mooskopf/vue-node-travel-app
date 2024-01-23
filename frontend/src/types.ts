export type Destination = {
    name: string,
    color: string,
    reviews: Review[]
}

export type DestinationResponse = {
    destinations: Destination[]
}

export type User = {
    name: string
    email: string
}

export type Stars = 0 | 1 | 2 | 3 | 4 | 5

export type Review = {
    destination: string,
    author: string,
    stars: Stars,
    text: string
}

export type ReviewResponse = {
    reviews: Review[]
}


