/**
 * Smart parser for extracting booking information from text
 * Supports: hotels, trains, flights, activities, restaurants
 */

/**
 * Parse dates in various formats
 */
function parseDate(text) {
  const patterns = [
    // ISO format: 2025-11-15
    /(\d{4}[-/]\d{1,2}[-/]\d{1,2})/g,
    // DD/MM/YYYY or DD-MM-YYYY
    /(\d{1,2}[-/]\d{1,2}[-/]\d{4})/g,
    // Month DD, YYYY
    /((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4})/gi,
    // DD Month YYYY
    /(\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{4})/gi,
  ];

  const dates = [];
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      try {
        const dateStr = match[1];
        const parsed = new Date(dateStr);
        if (!isNaN(parsed.getTime())) {
          dates.push({
            original: dateStr,
            parsed: parsed.toISOString().split('T')[0]
          });
        }
      } catch (e) {
        // Skip invalid dates
      }
    }
  }

  return dates;
}

/**
 * Parse times in HH:MM or HH:MM AM/PM format
 */
function parseTime(text) {
  const patterns = [
    // 24-hour: 14:30, 09:00
    /(\d{1,2}:\d{2})/g,
    // 12-hour: 2:30pm, 9:00 AM
    /(\d{1,2}:\d{2}\s*(?:am|pm))/gi,
  ];

  const times = [];
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      let timeStr = match[1].toLowerCase();

      // Convert to 24-hour format
      if (timeStr.includes('am') || timeStr.includes('pm')) {
        const isPM = timeStr.includes('pm');
        const cleanTime = timeStr.replace(/[ap]m/gi, '').trim();
        const [hours, minutes] = cleanTime.split(':').map(Number);

        let hour24 = hours;
        if (isPM && hours !== 12) hour24 += 12;
        if (!isPM && hours === 12) hour24 = 0;

        timeStr = `${String(hour24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
      }

      times.push(timeStr);
    }
  }

  return times;
}

/**
 * Extract booking references
 */
function parseBookingRef(text) {
  const patterns = [
    /(?:booking|confirmation|reference|ref)[\s#:]*([A-Z0-9]{6,})/gi,
    /(?:PNR|ticket)[\s#:]*([A-Z0-9]{6,})/gi,
  ];

  const refs = [];
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      refs.push(match[1]);
    }
  }

  return refs.length > 0 ? refs[0] : null;
}

/**
 * Detect booking type from keywords
 */
function detectBookingType(text) {
  const lowerText = text.toLowerCase();

  if (/(hotel|accommodation|check-in|check-out|resort|hostel|airbnb)/i.test(lowerText)) {
    return 'hotel';
  }
  if (/(train|railway|eurostar|platform|coach|carriage)/i.test(lowerText)) {
    return 'train';
  }
  if (/(flight|airline|airport|departure|arrival|boarding|gate)/i.test(lowerText)) {
    return 'flight';
  }
  if (/(restaurant|dinner|lunch|breakfast|reservation|table)/i.test(lowerText)) {
    return 'restaurant';
  }
  if (/(museum|tour|ticket|activity|attraction|visit)/i.test(lowerText)) {
    return 'activity';
  }

  return 'other';
}

/**
 * Extract location names (cities, stations, addresses)
 */
function parseLocations(text) {
  // Look for common location patterns
  const patterns = [
    // Station names: "London St Pancras", "Paris Gare du Nord"
    /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\s+(?:Station|Airport|Terminal|St\s+Pancras|Gare|Hauptbahnhof))/g,
    // Cities before/after common prepositions
    /(?:from|to|in|at)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/g,
    // Addresses with numbers
    /(\d+\s+[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,?\s+[A-Z][a-z]+)/g,
  ];

  const locations = new Set();
  for (const pattern of patterns) {
    const matches = text.matchAll(pattern);
    for (const match of matches) {
      locations.add(match[1].trim());
    }
  }

  return Array.from(locations);
}

/**
 * Parse hotel booking
 */
function parseHotel(text, dates) {
  const nameMatch = text.match(/(?:hotel|resort|accommodation)[\s:]*([\w\s&'-]+?)(?:,|\.|check)/i);
  const name = nameMatch ? nameMatch[1].trim() : 'Hotel';

  const bookingRef = parseBookingRef(text);
  const locations = parseLocations(text);

  let checkIn, checkOut;
  if (dates.length >= 2) {
    checkIn = dates[0].parsed;
    checkOut = dates[1].parsed;
  } else if (dates.length === 1) {
    checkIn = dates[0].parsed;
  }

  return {
    type: 'hotel',
    title: name,
    checkIn,
    checkOut,
    location: locations[0] || '',
    bookingRef,
    originalText: text.substring(0, 200)
  };
}

/**
 * Parse train booking
 */
function parseTrain(text, dates, times) {
  const fromMatch = text.match(/(?:from|depart[s]?|leaving)[\s:]+([\w\s]+?)(?:to|at|\d)/i);
  const toMatch = text.match(/(?:to|arriv(?:e|ing)|arriving at)[\s:]+([\w\s]+?)(?:at|on|\d)/i);

  const from = fromMatch ? fromMatch[1].trim() : '';
  const to = toMatch ? toMatch[1].trim() : '';

  const seatMatch = text.match(/(?:seat|coach|carriage)[\s#:]*([A-Z0-9-]+)/i);
  const seat = seatMatch ? seatMatch[1] : '';

  const bookingRef = parseBookingRef(text);

  const date = dates.length > 0 ? dates[0].parsed : '';
  const departTime = times.length > 0 ? times[0] : '';
  const arriveTime = times.length > 1 ? times[1] : '';

  const title = `Train: ${from} → ${to}`;
  const notes = seat ? `Seat: ${seat}` : '';

  return {
    type: 'train',
    title,
    date,
    time: departTime,
    from,
    to,
    arrivalTime: arriveTime,
    notes: [notes, bookingRef ? `Ref: ${bookingRef}` : ''].filter(Boolean).join(', '),
    originalText: text.substring(0, 200)
  };
}

/**
 * Parse flight booking
 */
function parseFlight(text, dates, times) {
  const flightNumMatch = text.match(/(?:flight|carrier)[\s#:]*([A-Z]{2}\d{3,4})/i);
  const flightNum = flightNumMatch ? flightNumMatch[1] : '';

  const fromMatch = text.match(/(?:from|depart(?:ure|ing))[\s:]*([\w\s]+?)(?:to|at|\d)/i);
  const toMatch = text.match(/(?:to|arriv(?:al|ing))[\s:]*([\w\s]+?)(?:at|on|\d)/i);

  const from = fromMatch ? fromMatch[1].trim() : '';
  const to = toMatch ? toMatch[1].trim() : '';

  const bookingRef = parseBookingRef(text);

  const date = dates.length > 0 ? dates[0].parsed : '';
  const departTime = times.length > 0 ? times[0] : '';

  const title = `Flight ${flightNum}: ${from} → ${to}`;

  return {
    type: 'flight',
    title,
    date,
    time: departTime,
    from,
    to,
    flightNumber: flightNum,
    notes: bookingRef ? `Ref: ${bookingRef}` : '',
    originalText: text.substring(0, 200)
  };
}

/**
 * Parse restaurant booking
 */
function parseRestaurant(text, dates, times) {
  const nameMatch = text.match(/(?:restaurant|table at|dining at)[\s:]*([\w\s&'-]+?)(?:,|\.|on|at|\d)/i);
  const name = nameMatch ? nameMatch[1].trim() : 'Restaurant';

  const locations = parseLocations(text);
  const bookingRef = parseBookingRef(text);

  const date = dates.length > 0 ? dates[0].parsed : '';
  const time = times.length > 0 ? times[0] : '';

  return {
    type: 'restaurant',
    title: `Dinner: ${name}`,
    date,
    time,
    location: locations[0] || '',
    notes: bookingRef ? `Ref: ${bookingRef}` : '',
    originalText: text.substring(0, 200)
  };
}

/**
 * Parse activity/attraction booking
 */
function parseActivity(text, dates, times) {
  const nameMatch = text.match(/(?:visit|tour|ticket for|museum|attraction)[\s:]*([\w\s&'-]+?)(?:,|\.|on|at|ticket)/i);
  const name = nameMatch ? nameMatch[1].trim() : 'Activity';

  const locations = parseLocations(text);
  const bookingRef = parseBookingRef(text);

  const date = dates.length > 0 ? dates[0].parsed : '';
  const time = times.length > 0 ? times[0] : '';

  return {
    type: 'activity',
    title: name,
    date,
    time,
    location: locations[0] || '',
    notes: bookingRef ? `Ref: ${bookingRef}` : '',
    originalText: text.substring(0, 200)
  };
}

/**
 * Main parser function - extracts bookings from text
 */
export function parseBookingText(text) {
  if (!text || text.trim().length === 0) {
    return [];
  }

  const bookings = [];

  // Split by common email delimiters
  const sections = text.split(/(?:\n\s*\n|={3,}|-{3,})/);

  for (const section of sections) {
    if (section.trim().length < 20) continue; // Skip very short sections

    const bookingType = detectBookingType(section);
    if (bookingType === 'other') continue;

    const dates = parseDate(section);
    const times = parseTime(section);

    let booking;

    switch (bookingType) {
      case 'hotel':
        booking = parseHotel(section, dates);
        break;
      case 'train':
        booking = parseTrain(section, dates, times);
        break;
      case 'flight':
        booking = parseFlight(section, dates, times);
        break;
      case 'restaurant':
        booking = parseRestaurant(section, dates, times);
        break;
      case 'activity':
        booking = parseActivity(section, dates, times);
        break;
      default:
        continue;
    }

    if (booking && (booking.date || booking.checkIn)) {
      booking.id = `parsed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      bookings.push(booking);
    }
  }

  return bookings;
}

/**
 * Convert parsed booking to activity format for itinerary
 */
export function bookingToActivity(booking, defaultDate) {
  const activityType = {
    'hotel': 'indoor',
    'train': 'travel',
    'flight': 'travel',
    'restaurant': 'eat',
    'activity': 'outdoor'
  }[booking.type] || 'mixed';

  return {
    id: booking.id || `activity_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    title: booking.title,
    time: booking.time || '09:00',
    type: activityType,
    notes: [booking.notes, booking.location, booking.from && booking.to ? `${booking.from} → ${booking.to}` : '']
      .filter(Boolean)
      .join(' • '),
    completed: false,
    createdAt: new Date(),
    // Store booking-specific data
    bookingData: {
      type: booking.type,
      bookingRef: booking.bookingRef,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      from: booking.from,
      to: booking.to,
      arrivalTime: booking.arrivalTime,
      flightNumber: booking.flightNumber
    }
  };
}
