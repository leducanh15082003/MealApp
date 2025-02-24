import { useContext, useLayoutEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

import IconButton from '../components/IconButton';
import List from '../components/MealDetail/List';
import Subtitle from '../components/MealDetail/Subtitle';
import MealDetails from '../components/MealDetails';
import { MEALS } from '../data/dummy-data';
import COLORS from '../constants/color';
import { FavoritesContext } from '../store/favorite-context';


function MealDetailScreen({ route, navigation }) {
    const favoriteMealCtx = useContext(FavoritesContext);

    const mealId = route.params.mealId;

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const isFavorite = favoriteMealCtx.ids.includes(mealId);
    function changeFavoriteStatusHandler() {
        if (isFavorite)
            favoriteMealCtx.removeFavorites(mealId);
        else
            favoriteMealCtx.addFavorites(mealId);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton
                        icon={isFavorite ? "star" : "star-outline"}
                        color={COLORS.lightBackground}
                        onPress={changeFavoriteStatusHandler}
                    />
                );
            },
        });
    }, [navigation, changeFavoriteStatusHandler]);

    return (
        <ScrollView style={styles.rootContainer}>
            <Image style={styles.image} source={{ uri: selectedMeal.imageUrl }} />
            <Text style={styles.title}>{selectedMeal.title}</Text>
            <MealDetails
                duration={selectedMeal.duration}
                complexity={selectedMeal.complexity}
                affordability={selectedMeal.affordability}
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectedMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectedMeal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
    rootContainer: {
        backgroundColor: COLORS.lightBackground,
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: COLORS.darkText,
    },
    detailText: {
        color: COLORS.darkText,
    },
    listOuterContainer: {
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    },
});