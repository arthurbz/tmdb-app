import { View, Text, StyleSheet, Image } from "react-native";
import { AntDesign as AntDesignIcon } from "@expo/vector-icons"

import Movie from "../types/Movie";
import MovieCredits from "./MovieCredits";

function MovieInfoModal({ movie }: { movie: Movie }) {
    const imageSrc = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    const releaseYear = movie?.release_date ? new Date(movie.release_date).getFullYear() : "No release date"

    return (
        <View style={styles.container}>
            <View style={styles.topRow}>
                {movie.backdrop_path
                    ? <Image style={styles.image} source={{ uri: imageSrc }} />
                    : <View style={styles.viewAlt}>
                        <Text style={styles.textAlt}>{movie.title}</Text>
                    </View>
                }

                <View style={styles.infosContainer}>
                    <Text
                        adjustsFontSizeToFit={true}
                        numberOfLines={2}
                        ellipsizeMode="clip"
                        style={styles.title}
                    >
                        {movie.title}
                    </Text>

                    <View style={styles.subtitlesRow}>
                        <Text style={styles.subtitle}>
                            {releaseYear}
                        </Text>
                        <AntDesignIcon
                            name="like1"
                            size={12}
                            color="#C1C1C1"
                            style={{ marginRight: 2 }}
                        />
                        <Text style={styles.subtitle}>
                            {movie.vote_average}/10
                        </Text>
                        <Text style={styles.subtitle}>
                            {movie.adult ? +18 : ""}
                        </Text>
                    </View>

                    <Text style={styles.overview} numberOfLines={4}>
                        {movie.overview}
                    </Text>
                </View>
            </View>

            <MovieCredits movieId={movie.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: "#252525",
        bottom: 0,
        width: "100%",
        height: 420,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        padding: 15
    },
    infosContainer: {
        marginLeft: 10,
        marginBottom: 5,
        width: "65%",
    },
    topRow: {
        flexDirection: "row",
        marginBottom: 12,
    },
    title: {
        fontSize: 30,
        fontWeight: "700",
        color: "#FFF",
    },
    subtitlesRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 2,
        marginBottom: 6,
    },
    subtitle: {
        color: "#C1C1C1",
        marginRight: 12,
        fontSize: 14,
        fontWeight: "800",
    },
    overview: {
        color: "#C1C1C1",
        fontSize: 14,
        fontWeight: "500",
        maxHeight: 80,
    },
    image: {
        height: 182,
        width: 122,
        borderRadius: 5
    },
    textAlt: {
        color: "#FFF",
        textAlign: "center",
        fontSize: 18,
        fontWeight: "400",
    },
    viewAlt: {
        height: 182,
        width: 122,
        padding: 2,
        borderColor: "#FFF",
        borderWidth: 3,
        borderRadius: 10,
        backgroundColor: "#313131",
        display: "flex",
        justifyContent: "center",
    }
})

export default MovieInfoModal
