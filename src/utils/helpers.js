import { Icons } from '../data/staticData';

// Weather Icon Helper
export const getWeatherIcon = (summary) => {
  const s = summary.toLowerCase();
  if (s.includes("storm") || s.includes("rain")) {
    return <Icons.CloudRain className="w-6 h-6 text-blue-500" />;
  } else if (s.includes("cloud")) {
    return <Icons.Cloud className="w-6 h-6 text-slate-500" />;
  }
  return <Icons.Sun className="w-6 h-6 text-amber-500" />;
};

// Activity Type Icon Helper
export const getTypeIcon = (type, props = { className: "w-5 h-5" }) => {
  const iconMap = {
    travel: <Icons.Plane {...props} />,
    eat: <Icons.Utensils {...props} />,
    nap: <Icons.Clock {...props} />,
    indoor: <Icons.FerrisWheel {...props} />,
    outdoor: <Icons.Sun {...props} />,
    mixed: <Icons.FerrisWheel {...props} />
  };
  return iconMap[type] || <Icons.FerrisWheel {...props} />;
};

// Activity Type Color Helper
export const getTypeColor = (type) => {
  const colorMap = {
    travel: 'bg-sky-100 text-sky-800',
    eat: 'bg-rose-100 text-rose-800',
    nap: 'bg-amber-100 text-amber-800',
    indoor: 'bg-indigo-100 text-indigo-800',
    outdoor: 'bg-emerald-100 text-emerald-800',
    mixed: 'bg-cyan-100 text-cyan-800'
  };
  return colorMap[type] || 'bg-slate-100 text-slate-800';
};

// Generate ICS Calendar File
export const generateICS = (planData) => {
  let icsString = `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//PhuketPlanner//EN\n`;
  
  planData.forEach(day => {
    day.blocks.forEach(block => {
      if (!block.time || !/\d/.test(block.time)) return;
      
      const timeMatch = block.time.match(/(\d{2}):(\d{2})/);
      if (!timeMatch) return;
      
      const [, hour, minute] = timeMatch.map(Number);
      const [year, month, dayOfMonth] = day.date.split('-').map(Number);
      
      const formatForICS = (h, m) => 
        `${year}${String(month).padStart(2, '0')}${String(dayOfMonth).padStart(2, '0')}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`;

      const startTime = formatForICS(hour, minute);
      const endTime = formatForICS(hour + 1, minute);

      icsString += `BEGIN:VEVENT\n`;
      icsString += `UID:${block.id}@phuketplanner\n`;
      icsString += `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}Z\n`;
      icsString += `DTSTART;TZID=Asia/Bangkok:${startTime}\n`;
      icsString += `DTEND;TZID=Asia/Bangkok:${endTime}\n`;
      icsString += `SUMMARY:${block.title}\n`;
      icsString += `END:VEVENT\n`;
    });
  });
  
  icsString += `END:VCALENDAR`;
  return icsString;
};

// Download ICS File
export const downloadICS = (planData) => {
  const icsContent = generateICS(planData);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "Phuket_Itinerary.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Format Date
export const formatDate = (dateString, format = 'long') => {
  const date = new Date(dateString);
  if (format === 'short') {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
};

// Check if date is today
export const isToday = (dateString) => {
  const today = new Date();
  const date = new Date(dateString);
  return date.toDateString() === today.toDateString();
};

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Currency converter
export const convertCurrency = (amount, from, rate = 45.5) => {
  if (from === 'GBP') {
    return parseFloat((amount * rate).toFixed(2));
  }
  return parseFloat((amount / rate).toFixed(2));
};

// Get weather-based recommendations
export const getWeatherRecommendations = (summary) => {
  const isRainy = summary.toLowerCase().includes('rain') || 
                  summary.toLowerCase().includes('storm');
  
  if (isRainy) {
    return {
      icon: <Icons.AlertTriangle className="w-4 h-4 text-amber-500"/>,
      message: "Indoor activities recommended today",
      suggestions: [
        "Visit Phuket Aquarium",
        "Shopping at Central Festival", 
        "Thai cooking class",
        "Kids' Club activities",
        "Spa treatments"
      ]
    };
  }
  return {
    icon: <Icons.Sun className="w-4 h-4 text-green-500"/>,
    message: "Great day for outdoor activities!",
    suggestions: [
      "Beach time",
      "Island hopping",
      "Snorkeling",
      "National park visit",
      "Outdoor dining"
    ]
  };
};
