import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Image, View } from "react-native"
import { Foundation as FoundationIcon } from "@expo/vector-icons"

import Movie from "../types/Movie"
import MovieSection from "../components/MovieSection"

function HomeScreen() {
    const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([])
    const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([])
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([])
    const [pouplarMovies, setPopularMovies] = useState<Movie[]>([])
    const controller = new AbortController()

    useEffect(() => {
        searchMovies()
    }, [])

    const searchMovies = () => {
        fetch("https://api.themoviedb.org/3/movie/now_playing?"
            + new URLSearchParams({ api_key: process.env.API_KEY }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => {
                setNowPlayingMovies(data.results)
            })
            .catch()

        fetch("https://api.themoviedb.org/3/movie/popular?"
            + new URLSearchParams({ api_key: process.env.API_KEY }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => setPopularMovies(data.results))
            .catch()

        fetch("https://api.themoviedb.org/3/movie/top_rated?"
            + new URLSearchParams({ api_key: process.env.API_KEY }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => setTopRatedMovies(data.results))
            .catch()

        fetch("https://api.themoviedb.org/3/movie/upcoming?"
            + new URLSearchParams({ api_key: process.env.API_KEY }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => setUpcomingMovies(data.results))
            .catch()
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContent}>
                <View style={styles.image}>
                    <Image
                        resizeMode="contain"
                        source={require("../assets/tmdb-long-logo.png")}
                        style={{ width: "80%", height: 50 }}
                    />
                </View>

                <ScrollView style={styles.scrollView}>
                    <MovieSection
                        movies={nowPlayingMovies}
                        sectionTitle="Now playing in theaters..."
                    />

                    <MovieSection
                        movies={pouplarMovies}
                        sectionTitle="Popular movies right now..."
                    />

                    <MovieSection
                        movies={upcomingMovies}
                        sectionTitle="Find out these upcoming movies!"
                    />

                    <MovieSection
                        movies={topRatedMovies}
                        sectionTitle="Our all time top rated movies..."
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
    },
    scrollView: {
        marginLeft: 20,
        bottom: "20%",
        marginTop: 170
    },
    mainContent: {
        width: "100%",
        top: 50,
    },
    image: {
        alignItems: "center",
        marginBottom: 20,
    }
})

export default HomeScreen 
