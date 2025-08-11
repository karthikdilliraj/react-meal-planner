import React, { useState, useRef, useEffect } from 'react';
import { Coffee, Sun, Moon, Edit3 } from 'lucide-react';

interface MealSlotProps {
  type: 'breakfast' | 'lunch' | 'dinner';
  meal: string;
  onMealChange: (meal: string) => void;
}

const MealSlot: React.FC<MealSlotProps> = ({ type, meal, onMealChange }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempMeal, setTempMeal] = useState(meal);
  const inputRef = useRef<HTMLInputElement>(null);

  const mealConfig = {
    breakfast: { icon: Coffee, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' },
    lunch: { icon: Sun, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200' },
    dinner: { icon: Moon, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200' }
  };

  const config = mealConfig[type];
  const IconComponent = config.icon;

  useEffect(() => {
    setTempMeal(meal);
  }, [meal]);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onMealChange(tempMeal.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempMeal(meal);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`${config.bg} ${config.border} border-2 rounded-lg p-3 transition-all duration-200 hover:shadow-md cursor-pointer group`}
         onClick={!isEditing ? handleClick : undefined}>
      <div className="flex items-center gap-2 mb-2">
        <IconComponent className={`w-4 h-4 ${config.color}`} />
        <span className={`text-sm font-medium ${config.color} capitalize`}>{type}</span>
        {!isEditing && (
          <Edit3 className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
        )}
      </div>
      
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={tempMeal}
          onChange={(e) => setTempMeal(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder={`Enter ${type} meal...`}
        />
      ) : (
        <div className="text-sm text-gray-700 min-h-[20px] leading-relaxed">
          {meal || (
            <span className="text-gray-400 italic">Click to add {type}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default MealSlot;