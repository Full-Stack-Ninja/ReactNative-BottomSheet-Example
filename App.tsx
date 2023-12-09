// App.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BottomSheet from './components/BottomSheet';
import Selector from './components/Selector';

export default function App() {
  // État pour contrôler la visibilité du bas de page
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  // État pour stocker le genre sélectionné
  const [selectedGender, setSelectedGender] = useState<string | null>(null);

  // État pour stocker le texte du genre sélectionné
  const [selectedGenderText, setSelectedGenderText] = useState<string>('');

  // État pour stocker les favoris sélectionnés
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);

  // État pour stocker le texte des favoris sélectionnés
  const [selectedFavoritesText, setSelectedFavoritesText] = useState<string>('');

  // État pour stocker la question actuelle
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  // Fonction pour définir la question actuelle et afficher le bas de page
  const showQuestionBottomSheet = (question: string) => {
    setCurrentQuestion(question);
    setBottomSheetVisible(true);
  };

  // Fonction pour fermer le bas de page
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };


  return (
    <View style={styles.container}>
      {/* Bouton pour afficher le sélecteur de radio */}
      <Pressable onPress={() => showQuestionBottomSheet('Sélectionnez votre sexe:')}>
        <Text style={styles.button}>Show Radio Selector</Text>
      </Pressable>
      <Text>{selectedGenderText}</Text>

      {/* Bouton pour afficher le sélecteur de cases à cocher */}
      <Pressable onPress={() => showQuestionBottomSheet('Sélectionner vos favoris:')}>
        <Text style={styles.button}>Show Checkbox Selector</Text>
      </Pressable>
      <Text>{selectedFavoritesText}</Text>

      {/* Afficher le composant BottomSheet si bottomSheetVisible est vrai */}
      {bottomSheetVisible && (
        <BottomSheet
          isVisible={bottomSheetVisible}
          onClose={closeBottomSheet}
          content={
            <>
              <Text style={styles.currentQuestion}>{currentQuestion}</Text>
              {/* Utiliser le composant Selector en fonction de la question actuelle */}
              {currentQuestion === 'Sélectionnez votre sexe:' && (
                <Selector
                  options={['Homme', 'Femme', 'Non précisé']}
                  onSelect={(selectedOption) => {
                    console.log(selectedOption);
                  }}
                  type="radio"
                />
              )}
              {currentQuestion === 'Sélectionner vos favoris:' && (
                <Selector
                  options={['Intelligence Artificielle (IA)', 'Machine Learning (ML)', 'Sécurité informatique','Développement Web Full Stack']}
                  onSelect={(selectedOptions) => {
                    console.log(selectedOptions);
                  }}
                  type="checkbox"
                />
              )}
            </>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'lightblue',
    marginVertical: 10,
    borderRadius: 5,
  },
  currentQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
