// Calendar export utility for generating .ics files

export const generateICS = (planData) => {
  let icsString = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//PhuketPlanner//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Phuket Family Trip 2025
X-WR-TIMEZONE:Asia/Bangkok
BEGIN:VTIMEZONE
TZID:Asia/Bangkok
TZOFFSETFROM:+0700
TZOFFSETTO:+0700
TZNAME:ICT
DTSTART:19700101T000000
END:VTIMEZONE
`;

  planData.forEach(day => {
    day.blocks.forEach(block => {
      // Skip blocks without specific times or with generic times like "AM"/"PM"
      if (!block.time || !/\d/.test(block.time)) return;
      
      const timeMatch = block.time.match(/(\d{1,2}):(\d{2})/);
      if (!timeMatch) return;
      
      const [, hour, minute] = timeMatch.map(Number);
      const [year, month, dayOfMonth] = day.date.split('-').map(Number);
      
      // Format date/time for ICS (YYYYMMDDTHHmmss)
      const formatForICS = (h, m) => {
        return `${year}${String(month).padStart(2, '0')}${String(dayOfMonth).padStart(2, '0')}T${String(h).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
      };

      const startTime = formatForICS(hour, minute);
      // Default to 1 hour duration for activities
      const endHour = hour + 1;
      const endTime = formatForICS(endHour, minute);

      // Generate a unique ID for each event
      const uid = `${block.id}@phuketplanner-${Date.now()}`;
      
      // Add location information
      const location = day.location === 'maiKhao' 
        ? 'Mai Khao Beach Area, Phuket' 
        : 'Phuket Old Town';
      
      // Add description based on type
      let description = `Type: ${block.type}`;
      if (block.notes) {
        description += `\\nNotes: ${block.notes}`;
      }

      icsString += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}Z
DTSTART;TZID=Asia/Bangkok:${startTime}
DTEND;TZID=Asia/Bangkok:${endTime}
SUMMARY:${block.title}
DESCRIPTION:${description}
LOCATION:${location}
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
`;
    });
  });

  // Add the full trip as an all-day event
  if (planData.length > 0) {
    const firstDay = planData[0].date.replace(/-/g, '');
    const lastDay = planData[planData.length - 1].date.replace(/-/g, '');
    const nextDay = new Date(planData[planData.length - 1].date);
    nextDay.setDate(nextDay.getDate() + 1);
    const lastDayPlus1 = nextDay.toISOString().split('T')[0].replace(/-/g, '');

    icsString += `BEGIN:VEVENT
UID:trip-overview@phuketplanner-${Date.now()}
DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}Z
DTSTART;VALUE=DATE:${firstDay}
DTEND;VALUE=DATE:${lastDayPlus1}
SUMMARY:🏝️ Phuket Family Trip
DESCRIPTION:Family vacation at Anantara Mai Khao Phuket Villas
LOCATION:Phuket, Thailand
STATUS:CONFIRMED
SEQUENCE:0
END:VEVENT
`;
  }

  icsString += `END:VCALENDAR`;
  
  return icsString;
};
