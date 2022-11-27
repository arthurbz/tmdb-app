import { StyleSheet, Text, View, FlatList } from "react-native"
import Movie from "../types/Movie"
import MovieCard from "./MovieCard"

function MovieSection({ movies, sectionTitle }: { movies: Movie[], sectionTitle: string }) {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>
                {sectionTitle}
            </Text>

            <FlatList
                data={movies}
                renderItem={
                    ({ item }) =>
                    <View style={styles.cardWraper}>
                        <MovieCard
                            key={item.id}
                            movie={item}
                            height={200}
                            width={140}
                        />
                    </View>
                }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    section: {
        height: 260,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: "500",
        color: "#FFF"
    },
    cardWraper: {
        marginRight: 10,
    }
})

export default MovieSection
