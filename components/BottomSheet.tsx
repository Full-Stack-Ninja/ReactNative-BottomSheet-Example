// components/BottomSheet.tsx
import React, { useRef } from 'react';
import {
  View,
  Animated,
  PanResponder,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import { BottomSheetProps } from '../types/types';

// Composant BottomSheet pour afficher un panneau en bas de l'écran avec une animation de glissement
const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onClose, content }) => {

  // Hauteur du panneau en bas de l'écran
  const bottomSheetHeight = Dimensions.get('window').height * 0.8;
  // Position Y du panneau, animée avec une valeur ref
  const bottomSheetY = useRef(new Animated.Value(isVisible ? 0 : bottomSheetHeight)).current;

  // Gestionnaire de gestes pour le panneau
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) return; // Permet de faire glisser uniquement vers le bas
        bottomSheetY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Ferme le panneau si glissé vers le bas d'au moins 50 unités
          onClose();
        } else {
          // Réinitialise la position du panneau si la fermeture n'est pas suffisante
          Animated.timing(bottomSheetY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  // Effet pour animer l'ouverture/fermeture du panneau lorsqu'il est monté/démonté
  React.useEffect(() => {
    Animated.timing(bottomSheetY, {
      toValue: isVisible ? 0 : bottomSheetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  // Gestionnaire pour fermer le panneau lorsqu'on appuie sur l'overlay
  const handleOverlayPress = () => {
    onClose();
  };

  // Rendu du composant
  return (
    <>
      {isVisible && (
        <Pressable
          style={styles.overlay}
          onPress={handleOverlayPress}
        />
      )}
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: bottomSheetY }] },
          !isVisible && { height: 0, overflow: 'hidden' },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.dragger} />
        {content}
      </Animated.View>
    </>
  );
};

// Styles pour le composant BottomSheet
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  dragger: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
});

export default BottomSheet;
