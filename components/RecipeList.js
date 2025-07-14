import React from 'react';
import { FlatList, View, Text } from 'react-native';
import { Card, Button } from 'react-native-paper';

export default function RecipeList({ recipes, onEdit, onDelete, onSelect }) {
  return (
    <FlatList
      data={recipes}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item, index }) => (
        <Card style={{ marginBottom: 12 }}>
          <Card.Title title={item.title} onPress={() => onSelect(index)} />
          <Card.Content>
            {item.ingredients.map((ing, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                <Text style={{ fontSize: 16, marginRight: 6 }}>•</Text>
                <Text>{`${ing.amount} ${ing.unit} ${ing.name}`}</Text>
              </View>
            ))}
          </Card.Content>
          <Card.Actions>
            <Button onPress={() => onEdit(index)}>Edit</Button>
            <Button onPress={() => onDelete(index)} color="red">Delete</Button>
          </Card.Actions>
        </Card>
      )}
    />
  );
}
