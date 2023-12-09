// components/Selector.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SelectorProps } from '../types/types';

// Définit le type des options dans le composant Selector
type OptionType = string;

const Selector: React.FC<SelectorProps<OptionType>> = ({ options, onSelect, type }) => {
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);

  const handleOptionChange = (option: OptionType) => {
    let updatedOptions: OptionType[];

    if (type === 'radio') {
      updatedOptions = [option];
    } else {
      updatedOptions = selectedOptions.includes(option)
        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...selectedOptions, option];
    }

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions);
  };

  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity key={option.toString()} onPress={() => handleOptionChange(option)}>
          <View style={styles.optionContainer}>
            <Ionicons
              name={type === 'radio' ? (selectedOptions.includes(option) ? 'checkbox-outline' : 'square-outline') : 'checkbox-outline'}
              size={24}
              color={selectedOptions.includes(option) ? 'blue' : 'black'}
              style={styles.icon}
            />
            <Text style={[styles.optionText, selectedOptions.includes(option) && styles.selectedText]}>
              {option.toString()}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
  selectedText: {
    fontWeight: 'bold', // Style du texte sélectionné
  },
});

export default Selector;
