import React, { useState, useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import DayCard from './components/DayCard';
import WeekNavigation from './components/WeekNavigation';
import { WeekMeals, DayMeals } from './types';
import { getCurrentWeekDates } from './utils/dateUtils';
import { saveMealsToStorage, loadMealsFromStorage, clearAllMeals } from './utils/storage';

function App() {
  const [currentWeekStart, setCurrentWeekStart] = useState(() => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    return startOfWeek;
  });
  
  const [meals, setMeals] = useState<WeekMeals>(() => loadMealsFromStorage());

  const weekDates = getCurrentWeekDates();
  const today = new Date();

  // Generate dates for current week view
  const getWeekDates = (startDate: Date): Date[] => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const currentWeekDates = getWeekDates(currentWeekStart);

  useEffect(() => {
    saveMealsToStorage(meals);
  }, [meals]);

  const handleMealChange = (dayIndex: number, mealType: 'breakfast' | 'lunch' | 'dinner', meal: string) => {
    setMeals(prevMeals => ({
      ...prevMeals,
      [dayIndex]: {
        ...prevMeals[dayIndex],
        [mealType]: meal
      }
    }));
  };

  const handlePreviousWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() - 7);
    setCurrentWeekStart(newStart);
  };

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(currentWeekStart.getDate() + 7);
    setCurrentWeekStart(newStart);
  };

  const handleCurrentWeek = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);
    setCurrentWeekStart(startOfWeek);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all meals? This action cannot be undone.')) {
      setMeals(clearAllMeals());
    }
  };

  const isToday = (date: Date): boolean => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-xl">
              <ChefHat className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">Weekly Meal Planner</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Plan your meals for the entire week. Click on any meal slot to add or edit your planned dishes.
          </p>
        </div>

        {/* Week Navigation */}
        <WeekNavigation
          currentWeekStart={currentWeekStart}
          onPreviousWeek={handlePreviousWeek}
          onNextWeek={handleNextWeek}
          onCurrentWeek={handleCurrentWeek}
          onClearAll={handleClearAll}
        />

        {/* Weekly Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentWeekDates.map((date, index) => {
            const dayMeals = meals[index] || { breakfast: '', lunch: '', dinner: '' };
            
            return (
              <DayCard
                key={`${date.getTime()}-${index}`}
                dayIndex={index}
                date={date}
                meals={dayMeals}
                onMealChange={handleMealChange}
                isToday={isToday(date)}
              />
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {Object.values(meals).reduce((total, dayMeals) => 
                total + (dayMeals.breakfast ? 1 : 0) + (dayMeals.lunch ? 1 : 0) + (dayMeals.dinner ? 1 : 0), 0
              )}
            </div>
            <div className="text-gray-600">Meals Planned</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">
              {Object.values(meals).filter(dayMeals => 
                dayMeals.breakfast && dayMeals.lunch && dayMeals.dinner
              ).length}
            </div>
            <div className="text-gray-600">Complete Days</div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">
              {Math.round((Object.values(meals).reduce((total, dayMeals) => 
                total + (dayMeals.breakfast ? 1 : 0) + (dayMeals.lunch ? 1 : 0) + (dayMeals.dinner ? 1 : 0), 0
              ) / 21) * 100)}%
            </div>
            <div className="text-gray-600">Week Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;