import React from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, Calendar } from 'lucide-react';

interface WeekNavigationProps {
  currentWeekStart: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  onCurrentWeek: () => void;
  onClearAll: () => void;
}

const WeekNavigation: React.FC<WeekNavigationProps> = ({
  currentWeekStart,
  onPreviousWeek,
  onNextWeek,
  onCurrentWeek,
  onClearAll
}) => {
  const formatWeekRange = (startDate: Date): string => {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    
    const startMonth = startDate.toLocaleDateString('en-US', { month: 'short' });
    const endMonth = endDate.toLocaleDateString('en-US', { month: 'short' });
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();
    const year = startDate.getFullYear();
    
    if (startMonth === endMonth) {
      return `${startMonth} ${startDay}-${endDay}, ${year}`;
    } else {
      return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${year}`;
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onPreviousWeek}
          className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Previous week"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-800">
            {formatWeekRange(currentWeekStart)}
          </h2>
        </div>
        
        <button
          onClick={onNextWeek}
          className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          title="Next week"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onCurrentWeek}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span className="hidden sm:inline">This Week</span>
        </button>
        
        <button
          onClick={onClearAll}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Clear All</span>
        </button>
      </div>
    </div>
  );
};

export default WeekNavigation;