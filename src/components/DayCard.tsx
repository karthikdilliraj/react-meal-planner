import React from 'react';
import MealSlot from './MealSlot';
import { DayMeals } from '../types';
import { getDayName, formatDate } from '../utils/dateUtils';

interface DayCardProps {
  dayIndex: number;
  date: Date;
  meals: DayMeals;
  onMealChange: (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', meal: string) => void;
  isToday?: boolean;
}

const DayCard: React.FC<DayCardProps> = ({ dayIndex, date, meals, onMealChange, isToday }) => {
  const handleMealChange = (mealType: 'breakfast' | 'lunch' | 'dinner', meal: string) => {
    onMealChange(dayIndex, mealType, meal);
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition-all duration-300 hover:shadow-md ${
      isToday ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
    }`}>
      <div className={`p-4 border-b border-gray-100 ${isToday ? 'bg-blue-50' : 'bg-gray-50'} rounded-t-xl`}>
        <h3 className={`font-semibold text-lg ${isToday ? 'text-blue-800' : 'text-gray-800'}`}>
          {getDayName(dayIndex)}
        </h3>
        <p className={`text-sm ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
          {formatDate(date)}
          {isToday && <span className="ml-2 font-medium">(Today)</span>}
        </p>
      </div>
      
      <div className="p-4 space-y-3">
        <MealSlot
          type="breakfast"
          meal={meals.breakfast}
          onMealChange={(meal) => handleMealChange('breakfast', meal)}
        />
        <MealSlot
          type="lunch"
          meal={meals.lunch}
          onMealChange={(meal) => handleMealChange('lunch', meal)}
        />
        <MealSlot
          type="dinner"
          meal={meals.dinner}
          onMealChange={(meal) => handleMealChange('dinner', meal)}
        />
      </div>
    </div>
  );
};

export default DayCard;