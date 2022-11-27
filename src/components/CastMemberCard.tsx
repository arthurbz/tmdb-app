import { View, Text, Image, StyleSheet } from "react-native"

import CastMember from "../types/CastMember"

function CastMemberCard({ castMember }: { castMember: CastMember }) {
    const imageSrc = `https://image.tmdb.org/t/p/w500/${castMember.profile_path}`

    return (
        <View style={styles.container}>
            <Image
                style={styles.profilePicture}
                source={{ uri: imageSrc }}
            />

            <Text style={styles.name}>
                {castMember.name}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        width: 100,
        height: 140,
    },
    name: {
        color: "#FFF",
        fontSize: 13,
    },
    profilePicture: {
        height: 100,
        width: 80,
        borderRadius: 5,
    }
})

export default CastMemberCard
