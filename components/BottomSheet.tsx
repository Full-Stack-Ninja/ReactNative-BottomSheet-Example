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



const BottomSheet: React.FC<BottomSheetProps> = ({ isVisible, onClose, content }) => {

  const bottomSheetHeight = Dimensions.get('window').height * 0.8;
  const bottomSheetY = useRef(new Animated.Value(isVisible ? 0 : bottomSheetHeight)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < 0) return; // To allow dragging only in the downward direction
        bottomSheetY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Close the bottom sheet if dragged down by at least 50 units
          onClose();
        } else {
          // Reset the bottom sheet position if not dragged enough to close
          Animated.timing(bottomSheetY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  React.useEffect(() => {
    Animated.timing(bottomSheetY, {
      toValue: isVisible ? 0 : bottomSheetHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isVisible]);

  const handleOverlayPress = () => {
    onClose();
  };

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
