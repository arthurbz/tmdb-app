import { useEffect, useState } from "react"
import { View, Text, StyleSheet, FlatList } from "react-native"

import CastMember from "../types/CastMember"
import CastMemberCard from "./CastMemberCard"

function MovieCredits({ movieId }: { movieId: number }) {
    const [cast, setCast] = useState([])
    const controller = new AbortController()

    const filterTop10ActingMembers = (castMembers: CastMember[]) => {
        const filteredCast = castMembers
            .sort((a, b) => a.order - b.order)
            .slice(0, 10)

        setCast(filteredCast)
    }

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?`
            + new URLSearchParams({ api_key: process.env.API_KEY, }),
            { method: "GET", signal: controller.signal })
            .then(response => response.json())
            .then(data => filterTop10ActingMembers(data.cast))
            .catch()

        return () => {
            controller.abort()
        }
    }, [])


    return (
        <View>
            <Text style={styles.title}>Staring:</Text>
            <FlatList
                data={cast}
                renderItem={
                    ({ item }) =>
                        <CastMemberCard key={item.id} castMember={item} />
                }
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: "#FFF",
        fontWeight: "500",
        letterSpacing: 1,
        fontSize: 18,
        marginLeft: 12,
        marginBottom: 6
    }
})

export default MovieCredits
