import { WeekMeals, DayMeals } from '../types';

const STORAGE_KEY = 'meal-planner-data';

export const saveMealsToStorage = (meals: WeekMeals): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meals));
  } catch (error) {
    console.error('Failed to save meals to storage:', error);
  }
};

export const loadMealsFromStorage = (): WeekMeals => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load meals from storage:', error);
  }
  
  // Return default empty meals for all days
  const defaultMeals: WeekMeals = {};
  for (let i = 0; i < 7; i++) {
    defaultMeals[i] = {
      breakfast: '',
      lunch: '',
      dinner: ''
    };
  }
  return defaultMeals;
};

export const clearAllMeals = (): WeekMeals => {
  const emptyMeals: WeekMeals = {};
  for (let i = 0; i < 7; i++) {
    emptyMeals[i] = {
      breakfast: '',
      lunch: '',
      dinner: ''
    };
  }
  saveMealsToStorage(emptyMeals);
  return emptyMeals;
};