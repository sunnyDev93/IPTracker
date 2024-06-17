import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { SelectedImageProvider } from './src/context/SelectedImageContext';

export default function App() {
  return (
    <SelectedImageProvider>
      <AppNavigator />
    </SelectedImageProvider>
  );

}