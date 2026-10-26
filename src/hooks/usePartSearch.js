import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setArticle,
  getManufacturers,
  getAnalogs,
  clearError,
  setSelectedBrand,
} from '@/store/partsSlice';
import { useDebounce } from './useDebounce';

export const usePartSearch = () => {
  const dispatch = useDispatch();
  const { article, manufacturers, loadingManufacturers, loadingAnalogs, analogs, selectedBrand, error } =
    useSelector((state) => state.parts);

  const [inputValue, setInputValue] = useState('');
  const debouncedSearchTerm = useDebounce(inputValue, 800);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (inputValue.length === 0) {
      dispatch(setArticle(''));
      dispatch(setSelectedBrand(null));
      dispatch(clearError());
    }
  }, [inputValue, dispatch]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setInputValue('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    const trimmedTerm = debouncedSearchTerm.trim();

    if (trimmedTerm.length >= 3) {
      dispatch(setArticle(trimmedTerm));
      dispatch({ type: 'parts/clearAnalogs' }); 
      dispatch(getManufacturers({ article: trimmedTerm, signal: controller.signal }));
    }

    return () => controller.abort();
  }, [debouncedSearchTerm, dispatch]);

  const handleClearInput = () => setInputValue('');

  const handleSelectBrand = (brand) => {
    if (brand === selectedBrand) return;
    dispatch(setSelectedBrand(brand));
    const controller = new AbortController();
    dispatch(getAnalogs({ article, brand, signal: controller.signal }));
  };

  return {
    inputValue,
    setInputValue,
    handleClearInput,
    handleSelectBrand,
    manufacturers,
    loadingManufacturers,
    loadingAnalogs,
    analogs,
    selectedBrand,
    error,
    dispatch,
    inputRef, // <-- Возвращаем реф
  };
};