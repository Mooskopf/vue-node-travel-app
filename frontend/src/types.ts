export type Destination = {
    name: string,
    color: string
}

export type DestinationResponse = {
    destinations: Destination[]
}

export type User = {
    name: string,
    email: string
}

export type Review = {
    stars: 1 | 2 | 3 | 4 | 5,
    text: string
}

