// components/Selector.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from './Icon';
import { SelectorProps } from '../types/types';

type OptionType = string;

// Composant Selector qui fournit une interface de sélection personnalisable (radio ou checkbox)
const Selector: React.FC<SelectorProps<OptionType>> = ({ options, onSelect, type, defaultSelected }) => {
  // État pour gérer les options sélectionnées
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>(defaultSelected || []);

  // Fonction pour gérer les changements d'option en fonction du type de sélection (radio ou checkbox)
  const handleOptionChange = (option: OptionType) => {
    // Détermine les options mises à jour en fonction du type de sélection
    const updatedOptions =
      type === 'radio'
        ? [option] // Pour radio, une seule option peut être sélectionnée à la fois
        : selectedOptions.includes(option)
        ? selectedOptions.filter((selectedOption) => selectedOption !== option)
        : [...selectedOptions, option];

    // Met à jour l'état avec les nouvelles options sélectionnées
    setSelectedOptions(updatedOptions);
    
    // Notifie le composant parent des sélections mises à jour
    onSelect(updatedOptions);
  };

  // Effet pour initialiser les options sélectionnées lorsque la prop defaultSelected change
  useEffect(() => {
    if (defaultSelected) {
      setSelectedOptions(defaultSelected);
    }
  }, [defaultSelected]);

  // Rendu de l'interface du sélecteur
  return (
    <View style={styles.container}>
      {/* Parcours des options pour créer des composants Pressable */}
      {options.map((option) => (
        <Pressable
          key={option.toString()}
          onPress={() => handleOptionChange(option)}
          style={({ pressed }) => [
            styles.pressable,
            pressed && styles.pressablePressed,
          ]}
        >
          {/* Affiche l'option avec une icône et du texte */}
          <View style={styles.optionContainer}>
            <Icon type={type} checked={selectedOptions.includes(option)} />
            <Text style={[styles.optionText, selectedOptions.includes(option) && styles.selectedText]}>
              {option.toString()}
            </Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

// Styles pour le composant Selector
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  pressable: {
    opacity: 1,
    padding: 8,
  },
  pressablePressed: {
    opacity: 0.5,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 8,
  },
  selectedText: {
    fontWeight: 'bold',
  },
});

export default Selector;
