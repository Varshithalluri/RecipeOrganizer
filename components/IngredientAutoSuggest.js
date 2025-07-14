import React, { useState } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import { TextInput, List, Menu, Button, HelperText } from 'react-native-paper';
import { INGREDIENTS } from '../data/ingredients';
import { UNITS } from '../data/units';

export default function IngredientAutoSuggest({ ingredients, setIngredients }) {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [unit, setUnit] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const handleQueryChange = (text) => {
    setQuery(text);
    if (text.length > 0) {
      const filtered = INGREDIENTS.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 10));
    } else {
      setSuggestions([]);
    }
  };

  const addIngredient = (name) => {
    if (!name || !amount || !unit) return;
    setIngredients([...ingredients, { name, amount, unit }]);
    setQuery('');
    setAmount('');
    setUnit('');
    setSuggestions([]);
  };

  return (
    <View>
      <TextInput
        label="Ingredient"
        value={query}
        onChangeText={handleQueryChange}
        style={{ marginBottom: 8 }}
        right={<TextInput.Icon icon="plus" onPress={() => addIngredient(query)} />}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={item => item}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => { setQuery(item); setSuggestions([]); }}>
              <List.Item title={item} />
            </TouchableOpacity>
          )}
          style={{ maxHeight: 120, marginBottom: 8, backgroundColor: '#fff', borderRadius: 8 }}
        />
      )}
      <View style={{ flexDirection: 'row', marginBottom: 8, alignItems: 'center' }}>
        <TextInput
          label="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={{ flex: 1, marginRight: 4 }}
        />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <TouchableOpacity
              style={{
                flex: 1,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 4,
                paddingVertical: 12,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff'
              }}
              onPress={() => setMenuVisible(true)}
            >
              <Text style={{ color: unit ? '#000' : '#888', textAlign: 'center' }}>
                {unit ? unit : 'Select unit'}
              </Text>
            </TouchableOpacity>
          }
        >
          {UNITS.map(u => (
            <Menu.Item key={u} onPress={() => { setUnit(u); setMenuVisible(false); }} title={u} />
          ))}
        </Menu>
      </View>
      <FlatList
        data={ingredients}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item, index }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
            <Text style={{ fontSize: 18, marginRight: 6 }}>•</Text>
            <Text style={{ flex: 1 }}>{`${item.amount} ${item.unit} ${item.name}`}</Text>
            <TouchableOpacity onPress={() => setIngredients(ingredients.filter((_, i) => i !== index))}>
              <Text style={{ color: 'red', fontSize: 16, marginLeft: 8 }}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
