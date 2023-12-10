// types/types.ts

/**
 * Props pour le composant BottomSheet.
 *
 * @typedef {Object} BottomSheetProps
 * @property {boolean} isVisible - Détermine si le BottomSheet est visible ou non.
 * @property {Function} onClose - Fonction de rappel à exécuter lorsque le BottomSheet devrait être fermé.
 * @property {React.ReactNode} content - Le contenu à afficher à l'intérieur du BottomSheet.
 */
export type BottomSheetProps = {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
};


/**
 * Props pour le composant Selector.
 *
 * @typedef {Object} SelectorProps
 * @property {Array} options - Le tableau d'options pour le sélecteur.
 * @property {Function} onSelect - Fonction de rappel à exécuter lorsqu'une ou plusieurs options sont sélectionnées.
 * @property {string} type - Le type de sélecteur ('radio' pour une seule sélection, 'checkbox' pour une sélection multiple).
 * @property {Array} [defaultSelected] - Les options pré-sélectionnées lors du rendu initial du sélecteur.
 * @template OptionType
 */
export type SelectorProps<OptionType> = {
  options: OptionType[];
  onSelect: (selectedOptions: OptionType[]) => void;
  type: 'radio' | 'checkbox';
  defaultSelected?: OptionType[];
};



/**
 * Props pour le composant Icon.
 *
 * @typedef {Object} IconProps
 * @property {string} type - Le type d'icône ('radio' pour une icône de bouton radio, 'checkbox' pour une icône de case à cocher).
 * @property {boolean} checked - Détermine si l'icône doit être affichée comme cochée ou non.
 */
export type IconProps = {
    type: 'radio' | 'checkbox';
    checked: boolean;
};
