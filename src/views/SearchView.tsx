import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Foundation as FoundationIcon } from "@expo/vector-icons"

import MovieCard from '../components/MovieCard'

import Movie from "../types/Movie"

function SearchView() {
    const [movies, setMovies] = useState<Movie[]>([])
    const [search, setSearch] = useState("baby driver")
    const [loading, setLoading] = useState(false)
    const controller = new AbortController()

    useEffect(() => {
        setLoading(true)
        if (!search) {
            setLoading(false)
            setMovies([])
            return
        }

        const timeoutSearch = setTimeout(() => {
            searchMovies()
            setLoading(false)
        }, 400)

        return () => {
            clearTimeout(timeoutSearch)
            controller.abort()
            setMovies([])
        }
    }, [search])

    const searchMovies = () => {
        fetch("https://api.themoviedb.org/3/search/movie?"
            + new URLSearchParams({
                api_key: process.env.API_KEY,
                query: search,
            }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch()
    }

    const mainContent = () => {
        if (loading) {
            return (
                <View style={styles.mainContentView}>
                    <Text style={styles.mainContentText}>
                        Loading...
                    </Text>
                </View>
            )
        }

        if (!search) {
            return (
                <View style={styles.mainContentView}>
                    <Text style={styles.mainContentText}>
                        Search for a movie, genre or something else...
                    </Text>
                </View>
            )
        }

        if (movies.length > 0) {
            return (
                <ScrollView>
                    {movies.map(movie => {
                        return <MovieCard key={movie.id} movie={movie} />
                    })}
                </ScrollView>
            )
        }

        if (movies.length == 0) {
            return (
                <View style={styles.mainContentView}>
                    <Text style={styles.mainContentText}>
                        Sorry, nothing was found for
                    </Text>
                    <Text style={styles.mainContentText}>
                        "{search}"
                    </Text>
                </View>
            )
        }

        return <></>
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <FoundationIcon
                    name="magnifying-glass"
                    size={34}
                    color="#C1C1C1"
                    style={{marginRight: 15}}
                />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#C1C1C1"
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchField}
                />
            </View>
            {mainContent()}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center"
    },
    searchBox: {
        flexDirection: "row",
        width: "90%",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingHorizontal: 16,
        marginTop: 40,
        marginBottom: 10,
        backgroundColor: "#424242",
        borderRadius: 20,
    },
    searchField: {
        height: 60,
        width: "100%",
        color: "#FFF",
        fontSize: 18,
    },
    mainContentView: {
        alignItems: "center",
        marginTop: 10
    },
    mainContentText: {
        fontSize: 25,
        fontWeight: "500",
        color: "#FFF"
    }
})

export default SearchView
