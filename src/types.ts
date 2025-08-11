export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner';
  dayOfWeek: number;
}

export interface DayMeals {
  breakfast: string;
  lunch: string;
  dinner: string;
}

export interface WeekMeals {
  [key: number]: DayMeals;
}