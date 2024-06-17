import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { SelectedImageProvider, useSelectedImage } from '../SelectedImageContext';
import { ImageType } from '../../types/image';

describe('SelectedImageContext', () => {
  const testImage: ImageType = { uri: { uri: 'https://example.com/image.jpg' }};

  it('provides initial selectedImage state as null', () => {
    const { result } = renderHook(() => useSelectedImage(), {
      wrapper: ({ children }: { children: React.ReactNode }) => <SelectedImageProvider>{children}</SelectedImageProvider>,
    });

    expect(result.current.selectedImage).toBeNull();
  });

  it('updates selectedImage state', () => {
    const { result } = renderHook(() => useSelectedImage(), {
      wrapper: ({ children }: { children: React.ReactNode }) => <SelectedImageProvider>{children}</SelectedImageProvider>,
    });

    act(() => {
      result.current.setSelectedImage(testImage);
    });

    expect(result.current.selectedImage).toEqual(testImage);
  });

  it('throws error when used outside of SelectedImageProvider', () => {
    const { result } = renderHook(() => useSelectedImage());

    expect(result.error).toEqual(new Error('useSelectedImage must be used within a SelectedImageProvider'));
  });
});
