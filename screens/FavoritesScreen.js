import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../constants/color';
import MealList from '../components/MealList/MealList';
import { useContext } from 'react';
import { FavoritesContext } from '../store/favorite-context';
import { MEALS } from '../data/dummy-data';

function FavoritesScreen() {
    const favoriteMealCtx = useContext(FavoritesContext);

    const favoriteMeals = MEALS.filter(meal => favoriteMealCtx.ids.includes(meal.id))

    if (favoriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>No favorite meals yet.</Text>
            </View>
        );
    }

    return <MealList items={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.darkText
    }
});
