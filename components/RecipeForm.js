import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Card } from 'react-native-paper';
import IngredientAutoSuggest from './IngredientAutoSuggest';

export default function RecipeForm({ onSubmit, initialData, onCancel }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || []);
  const [instructions, setInstructions] = useState(initialData?.instructions || '');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setIngredients(initialData.ingredients);
      setInstructions(initialData.instructions || '');
    }
  }, [initialData]);

  return (
    <Card style={{ marginBottom: 16 }}>
      <Card.Title title={initialData ? "Edit Recipe" : "Add Recipe"} />
      <Card.Content>
        <TextInput
          label="Recipe Title"
          value={title}
          onChangeText={setTitle}
          style={{ marginBottom: 8 }}
        />
        <IngredientAutoSuggest ingredients={ingredients} setIngredients={setIngredients} />
        <TextInput
          label="Instructions"
          value={instructions}
          onChangeText={setInstructions}
          multiline
          style={{ marginTop: 8, marginBottom: 8 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button mode="contained" onPress={() => onSubmit({ title, ingredients, instructions })}>
            Save
          </Button>
          <Button mode="text" onPress={onCancel} style={{ marginLeft: 8 }}>
            Cancel
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}
