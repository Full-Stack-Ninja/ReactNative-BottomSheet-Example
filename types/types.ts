// types/types.ts


/**
 * Props pour le composant BottomSheet.
 *
 * @param isVisible - Détermine si le BottomSheet est visible ou non.
 * @param onClose - Fonction de rappel à exécuter lorsque le BottomSheet devrait être fermé.
 * @param content - Le contenu à afficher à l'intérieur du BottomSheet.
 */
export type BottomSheetProps = {
    isVisible: boolean;
    onClose: () => void;
    content: React.ReactNode;
};


/**
 * Props pour le composant Selector.
 *
 * @param options - Le tableau d'options pour le sélecteur.
 * @param onSelect - Fonction de rappel à exécuter lorsqu'une ou plusieurs options sont sélectionnées.
 * @param type - Le type de sélecteur ('radio' pour une seule sélection, 'checkbox' pour une sélection multiple).
 */
export type SelectorProps<OptionType> = {
    options: OptionType[];
    onSelect: (selectedOptions: OptionType | OptionType[]) => void;
    type: 'radio' | 'checkbox';
};






