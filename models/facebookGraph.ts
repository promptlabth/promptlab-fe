export type FacebookPage = {
    access_token? : string
    category : string
    id: string
    name : string
    image: string
}

export type FacebookPost = {
    id: string
    message: string
    created_time: string
}