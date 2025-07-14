import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider, FAB } from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import SearchBar from './components/SearchBar';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import { storeData, getData } from './utils/storage';

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    getData('recipes').then(data => {
      if (data) setRecipes(data);
    });
  }, []);

  useEffect(() => {
    storeData('recipes', recipes);
  }, [recipes]);

  const handleAdd = () => {
    setEditingIndex(null);
    setShowForm(true);
  };

  const handleSave = (recipe) => {
    if (editingIndex !== null) {
      const updated = [...recipes];
      updated[editingIndex] = recipe;
      setRecipes(updated);
    } else {
      setRecipes([...recipes, recipe]);
    }
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const updated = recipes.filter((_, i) => i !== index);
    setRecipes(updated);
  };

  const handleSelect = (index) => {
    setSelectedRecipe(recipes[index]);
  };

  const handleCloseDetail = () => {
    setSelectedRecipe(null);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.ingredients.some(ing =>
      ing.name.toLowerCase().includes(search.toLowerCase())
    ) ||
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PaperProvider>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <SearchBar value={search} onChange={setSearch} />
          {showForm ? (
            <RecipeForm
              onSubmit={handleSave}
              initialData={editingIndex !== null ? recipes[editingIndex] : null}
              onCancel={() => setShowForm(false)}
            />
          ) : selectedRecipe ? (
            <RecipeDetail recipe={selectedRecipe} onClose={handleCloseDetail} />
          ) : (
            <RecipeList
              recipes={filteredRecipes}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSelect={handleSelect}
            />
          )}
          {!showForm && !selectedRecipe && (
            <FAB
              icon="plus"
              style={styles.fab}
              onPress={handleAdd}
              color="white"
            />
          )}
        </SafeAreaView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    backgroundColor: '#6200ee',
    elevation: 6,
    zIndex: 100
  }
});
