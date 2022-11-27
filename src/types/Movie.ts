interface Movie {
    id: number
    title: string
    original_title: string
    original_language: string
    overview: string
    adult: boolean
    backdrop_path: string
    genre_ids: number[]
    popularity: number
    poster_path: string
    release_date: string
    video: boolean
    vote_average: number
    vote_count: number
}

export default Movie
