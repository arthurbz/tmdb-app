import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native"
import SearchView from "./src/views/SearchView"

export default function App() {
    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="inverted" />
                <SearchView />
            </SafeAreaView>
        </>
    )
}
