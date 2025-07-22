export type StepType = {
    title: string,
    assets: Asset[] | null
}

export type Asset = {
    path: string,
    alt: string
}

export type StickerImageType = {
    id: string,
    name: string,
    url: string,
    signed_url: string
}