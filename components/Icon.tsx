// components/Icon.tsx
import React from 'react';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { IconProps } from '../types/types';

// Composant Icon pour afficher une icône de bouton radio ou de case à cocher
const Icon: React.FC<IconProps> = ({ type, checked }) => {
  // Rend l'icône en fonction du type (radio ou checkbox) et de l'état de sélection
  if (type === 'radio') {
    return (
      <MaterialIcons
        name={checked ? 'radio-button-checked' : 'radio-button-unchecked'}
        size={20}
        color={checked ? 'blue' : 'black'}
      />
    );
  } else {
    return (
      <MaterialCommunityIcons
        name={checked ? 'checkbox-marked-outline' : 'checkbox-blank-outline'}
        size={24}
        color={checked ? 'blue' : 'black'}
      />
    );
  }
};

export default Icon;
