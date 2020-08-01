export interface Box{
    $key?: string,
    name: string,
    content: Array<Content>,
    qr: string,
    image?: string,
}

export interface Content{
    $key?: string,
    name: string,
    quantity: number
}