import React from 'react';
import { Searchbar } from 'react-native-paper';

export default function SearchBar({ value, onChange }) {
  return (
    <Searchbar
      placeholder="Search by ingredient or recipe name"
      value={value}
      onChangeText={onChange}
      style={{ marginBottom: 12 }}
    />
  );
}
