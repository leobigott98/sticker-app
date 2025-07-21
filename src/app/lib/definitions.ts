export type StepType = {
    title: string,
    assets: Asset[] | null
}

export type Asset = {
    path: string,
    alt: string
}