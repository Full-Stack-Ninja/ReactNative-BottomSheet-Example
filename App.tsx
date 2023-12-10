// App.tsx

import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import BottomSheet from './components/BottomSheet';
import Selector from './components/Selector';

export default function App() {
  // State pour gérer la visibilité du BottomSheet, le texte du genre sélectionné,
  // les favoris sélectionnés et la question actuelle.
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedGender, setSelectedGender] = useState<string>('');
  const [selectedFavorites, setSelectedFavorites] = useState<{ [key: string]: boolean }>({});
  const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);

  // Fonction pour afficher le BottomSheet avec une question spécifique.
  const showQuestionBottomSheet = (question: string) => {
    setCurrentQuestion(question);
    setBottomSheetVisible(true);
  };

  // Fonction pour fermer le BottomSheet.
  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Bouton pour afficher le sélecteur de radio */}
      <Pressable onPress={() => showQuestionBottomSheet('Sélectionnez votre sexe:')}>
        <Text style={styles.button}>Show Radio Selector</Text>
      </Pressable>

      {/* Bouton pour afficher le sélecteur de cases à cocher */}
      <Pressable onPress={() => showQuestionBottomSheet('Sélectionner vos favoris:')}>
        <Text style={styles.button}>Show Checkbox Selector</Text>
      </Pressable>

      <View>
        {/* Affichage du texte du genre sélectionné */}
        {selectedGender && <Text> - Votre sexe est : {selectedGender}</Text>}

        {/* Affichage des favoris sélectionnés */}
        {Object.keys(selectedFavorites).length > 0 && (
          <Text> - Vos favoris sont : {Object.keys(selectedFavorites).join(', ')}</Text>
        )}
      </View>

      {/* Affichage du BottomSheet si visible */}
      {bottomSheetVisible && (
        <BottomSheet
          isVisible={bottomSheetVisible}
          onClose={closeBottomSheet}
          content={
            <>
              {/* Affichage de la question actuelle */}
              <Text style={styles.currentQuestion}>{currentQuestion}</Text>

              {/* Sélecteur de radio pour la question du genre */}
              {currentQuestion === 'Sélectionnez votre sexe:' && (
                <Selector
                  options={['Homme', 'Femme', 'Non précisé']}
                  defaultSelected={[selectedGender]}
                  onSelect={(selectedOption) => {
                    setSelectedGender(selectedOption[0] || '');
                  }}
                  type="radio"
                />
              )}

              {/* Sélecteur de cases à cocher pour la question des favoris */}
              {currentQuestion === 'Sélectionner vos favoris:' && (
                <Selector
                  options={['Intelligence Artificielle (IA)', 'Machine Learning (ML)', 'Sécurité informatique', 'Développement Web Full Stack']}
                  defaultSelected={Object.keys(selectedFavorites)}
                  onSelect={(selectedOptions) => {
                    const newFavorites: { [key: string]: boolean } = {};
                    (selectedOptions as string[]).forEach((option: string) => {
                      newFavorites[option] = true;
                    });
                    setSelectedFavorites(newFavorites);
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

// Styles du composant
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
