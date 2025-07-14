import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function RecipeDetail({ recipe, onClose }) {
  if (!recipe) return null;
  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title={recipe.title} />
      <Card.Content>
        <Text style={{ fontWeight: 'bold', marginBottom: 8 }}>Ingredients:</Text>
        {recipe.ingredients.map((ing, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
            <Text style={{ fontSize: 16, marginRight: 6 }}>•</Text>
            <Text>{`${ing.amount} ${ing.unit} ${ing.name}`}</Text>
          </View>
        ))}
        <Text style={{ fontWeight: 'bold', marginTop: 8, marginBottom: 4 }}>Instructions:</Text>
        <Text>{recipe.instructions}</Text>
      </Card.Content>
      <Card.Actions>
        <Button onPress={onClose}>Close</Button>
      </Card.Actions>
    </Card>
  );
}
