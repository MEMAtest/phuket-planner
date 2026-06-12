/**
 * German Learning Themes - Structured path from A1 to B1
 * 36 themes organized by level and difficulty
 */

export const GERMAN_THEMES = {
  // ============ LEVEL A1: SURVIVAL GERMAN (12 themes) ============
  A1: [
    {
      id: 'a1-1',
      number: 1,
      level: 'A1',
      title: 'Introducing Yourself',
      description: 'Learn to introduce yourself, say where you\'re from, and basic greetings',
      estimatedTime: 15,
      keyPhrases: [
        'Ich heiße [Name]',
        'Ich komme aus England',
        'Ich wohne in [Stadt]',
        'Ich bin [Beruf]',
        'Freut mich!'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Meeting someone at a party',
          prompt: 'Introduce yourself: name, where you\'re from, what you do',
          expectedPattern: 'Ich heiße... Ich komme aus... Ich bin...'
        },
        {
          id: 's2',
          situation: 'First day at work',
          prompt: 'Tell your new colleague about yourself',
          expectedPattern: 'Guten Tag, ich bin... Ich wohne in...'
        }
      ]
    },
    {
      id: 'a1-2',
      number: 2,
      level: 'A1',
      title: 'Ordering Food & Drink',
      description: 'Order at cafés, restaurants, and bars confidently',
      estimatedTime: 15,
      keyPhrases: [
        'Ich möchte ein Bier, bitte',
        'Ich hätte gern einen Kaffee',
        'Kann ich die Speisekarte haben?',
        'Die Rechnung, bitte',
        'Das war sehr lecker!'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Ordering at a café',
          prompt: 'Order a coffee and a piece of cake',
          expectedPattern: 'Ich hätte gern... und...'
        },
        {
          id: 's2',
          situation: 'At a restaurant',
          prompt: 'Ask for the menu, order a meal, and ask for the bill',
          expectedPattern: 'Kann ich... haben? Ich möchte... Die Rechnung, bitte'
        }
      ]
    },
    {
      id: 'a1-3',
      number: 3,
      level: 'A1',
      title: 'Asking Directions',
      description: 'Navigate German cities by asking for directions',
      estimatedTime: 15,
      keyPhrases: [
        'Wo ist...?',
        'Wie komme ich zum Bahnhof?',
        'Links, rechts, geradeaus',
        'Entschuldigung, können Sie mir helfen?',
        'Danke für Ihre Hilfe!'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Lost in a city',
          prompt: 'Ask a stranger where the train station is',
          expectedPattern: 'Entschuldigung, wo ist der Bahnhof?'
        }
      ]
    },
    {
      id: 'a1-4',
      number: 4,
      level: 'A1',
      title: 'Shopping Basics',
      description: 'Buy things at shops, markets, and supermarkets',
      estimatedTime: 15,
      keyPhrases: [
        'Was kostet das?',
        'Ich suche...',
        'Haben Sie...?',
        'Ich nehme das',
        'Kann ich mit Karte zahlen?'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'At a bakery',
          prompt: 'Ask for bread and ask the price',
          expectedPattern: 'Haben Sie Brot? Was kostet das?'
        }
      ]
    },
    {
      id: 'a1-5',
      number: 5,
      level: 'A1',
      title: 'Numbers, Time & Dates',
      description: 'Tell time, say dates, and use numbers in conversation',
      estimatedTime: 15,
      keyPhrases: [
        'Es ist zehn Uhr',
        'Wann...?',
        'Um wie viel Uhr?',
        'Am Montag',
        'Im Januar'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Making an appointment',
          prompt: 'Suggest a time to meet',
          expectedPattern: 'Können wir uns um... treffen?'
        }
      ]
    },
    {
      id: 'a1-6',
      number: 6,
      level: 'A1',
      title: 'Family & Relationships',
      description: 'Talk about your family and relationships',
      estimatedTime: 15,
      keyPhrases: [
        'Meine Frau heißt...',
        'Ich habe zwei Kinder',
        'Mein Sohn ist fünf Jahre alt',
        'Meine Familie kommt aus...',
        'Wir wohnen in...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Small talk at work',
          prompt: 'Tell a colleague about your family',
          expectedPattern: 'Ich habe... Meine Frau ist...'
        }
      ]
    },
    {
      id: 'a1-7',
      number: 7,
      level: 'A1',
      title: 'Hobbies & Free Time',
      description: 'Discuss what you like to do in your free time',
      estimatedTime: 15,
      keyPhrases: [
        'Ich spiele gern...',
        'Ich mag...',
        'In meiner Freizeit...',
        'Am Wochenende...',
        'Mein Hobby ist...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Chatting at a party',
          prompt: 'Talk about your hobbies',
          expectedPattern: 'Ich spiele gern... In meiner Freizeit...'
        }
      ]
    },
    {
      id: 'a1-8',
      number: 8,
      level: 'A1',
      title: 'Weather & Seasons',
      description: 'Small talk about the weather',
      estimatedTime: 15,
      keyPhrases: [
        'Wie ist das Wetter?',
        'Es ist kalt/warm/sonnig',
        'Es regnet',
        'Im Sommer/Winter',
        'Schönes Wetter heute!'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Making small talk',
          prompt: 'Comment on today\'s weather',
          expectedPattern: 'Es ist heute...'
        }
      ]
    },
    {
      id: 'a1-9',
      number: 9,
      level: 'A1',
      title: 'Making Appointments',
      description: 'Schedule meetings, appointments, and plans',
      estimatedTime: 15,
      keyPhrases: [
        'Können wir uns treffen?',
        'Wann passt es Ihnen?',
        'Um wie viel Uhr?',
        'Das passt mir gut',
        'Bis dann!'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Scheduling a meeting',
          prompt: 'Arrange to meet a friend next week',
          expectedPattern: 'Können wir uns... treffen? Um...?'
        }
      ]
    },
    {
      id: 'a1-10',
      number: 10,
      level: 'A1',
      title: 'Transportation',
      description: 'Use public transport and talk about travel',
      estimatedTime: 15,
      keyPhrases: [
        'Ich fahre mit dem Zug',
        'Wo ist die Haltestelle?',
        'Wann fährt der Bus?',
        'Eine Fahrkarte, bitte',
        'Ich nehme ein Taxi'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'At the train station',
          prompt: 'Buy a ticket to Munich',
          expectedPattern: 'Eine Fahrkarte nach München, bitte'
        }
      ]
    },
    {
      id: 'a1-11',
      number: 11,
      level: 'A1',
      title: 'At the Doctor',
      description: 'Describe symptoms and understand medical advice',
      estimatedTime: 15,
      keyPhrases: [
        'Ich habe Kopfschmerzen',
        'Mir ist schlecht',
        'Ich brauche ein Medikament',
        'Wo tut es weh?',
        'Seit wann?'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'At the doctor\'s office',
          prompt: 'Tell the doctor you have a headache',
          expectedPattern: 'Ich habe... seit...'
        }
      ]
    },
    {
      id: 'a1-12',
      number: 12,
      level: 'A1',
      title: 'Hotel & Accommodation',
      description: 'Check in, ask about facilities, and solve problems',
      estimatedTime: 15,
      keyPhrases: [
        'Ich habe eine Reservierung',
        'Für zwei Nächte',
        'Gibt es WLAN?',
        'Wann ist das Frühstück?',
        'Das Zimmer ist zu laut'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Checking into a hotel',
          prompt: 'Check in and ask about breakfast',
          expectedPattern: 'Ich habe eine Reservierung. Wann ist...?'
        }
      ]
    }
  ],

  // ============ LEVEL A2: SOCIAL GERMAN (12 themes) ============
  A2: [
    {
      id: 'a2-1',
      number: 13,
      level: 'A2',
      title: 'Talking About Your Day',
      description: 'Describe daily routines and what you did today',
      estimatedTime: 15,
      keyPhrases: [
        'Heute habe ich...',
        'Zuerst..., dann..., danach...',
        'Am Morgen/Nachmittag/Abend',
        'Ich bin zur Arbeit gefahren',
        'Das war interessant/langweilig'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Evening chat with a friend',
          prompt: 'Describe what you did today',
          expectedPattern: 'Heute habe ich... dann bin ich...'
        }
      ]
    },
    {
      id: 'a2-2',
      number: 14,
      level: 'A2',
      title: 'Making Plans & Suggestions',
      description: 'Suggest activities and make social plans',
      estimatedTime: 15,
      keyPhrases: [
        'Wollen wir...?',
        'Hast du Lust auf...?',
        'Lass uns... gehen',
        'Das ist eine gute Idee',
        'Leider kann ich nicht'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Planning weekend activities',
          prompt: 'Suggest going to the cinema',
          expectedPattern: 'Hast du Lust auf Kino? Wollen wir...?'
        }
      ]
    },
    {
      id: 'a2-3',
      number: 15,
      level: 'A2',
      title: 'Describing People & Things',
      description: 'Give detailed descriptions',
      estimatedTime: 15,
      keyPhrases: [
        'Er/Sie ist groß/klein',
        'Er hat braune Haare',
        'Sie trägt eine Brille',
        'Das ist sehr schön/hässlich',
        'Es sieht... aus'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Describing a lost item',
          prompt: 'Describe your lost bag to hotel staff',
          expectedPattern: 'Meine Tasche ist... sie hat...'
        }
      ]
    },
    {
      id: 'a2-4',
      number: 16,
      level: 'A2',
      title: 'Past Events (Perfekt)',
      description: 'Talk about what happened using past tense',
      estimatedTime: 15,
      keyPhrases: [
        'Ich bin... gegangen',
        'Ich habe... gemacht',
        'Wir haben... gesehen',
        'Gestern war ich...',
        'Letztes Wochenende...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Telling a story',
          prompt: 'Tell about your last vacation',
          expectedPattern: 'Ich bin nach... gefahren. Ich habe... gesehen'
        }
      ]
    },
    {
      id: 'a2-5',
      number: 17,
      level: 'A2',
      title: 'Comparisons & Preferences',
      description: 'Compare things and express preferences',
      estimatedTime: 15,
      keyPhrases: [
        'Ich mag... lieber als...',
        'Das ist besser/schlechter',
        'Größer/kleiner/schöner',
        'Am liebsten...',
        'Ich bevorzuge...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Choosing a restaurant',
          prompt: 'Explain which restaurant you prefer and why',
          expectedPattern: 'Ich mag... lieber, weil...'
        }
      ]
    },
    {
      id: 'a2-6',
      number: 18,
      level: 'A2',
      title: 'Giving Advice & Suggestions',
      description: 'Recommend things and give advice',
      estimatedTime: 15,
      keyPhrases: [
        'Du solltest...',
        'Ich würde... empfehlen',
        'Versuch doch mal...',
        'An deiner Stelle würde ich...',
        'Das ist wichtig'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Helping a friend',
          prompt: 'Give advice about learning German',
          expectedPattern: 'Du solltest... Ich würde...'
        }
      ]
    },
    {
      id: 'a2-7',
      number: 19,
      level: 'A2',
      title: 'Complaints & Problems',
      description: 'Politely complain and solve problems',
      estimatedTime: 15,
      keyPhrases: [
        'Es gibt ein Problem',
        'Das funktioniert nicht',
        'Können Sie mir helfen?',
        'Das ist nicht in Ordnung',
        'Ich bin nicht zufrieden'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Hotel complaint',
          prompt: 'Complain about a noisy room',
          expectedPattern: 'Es gibt ein Problem. Das Zimmer ist...'
        }
      ]
    },
    {
      id: 'a2-8',
      number: 20,
      level: 'A2',
      title: 'Talking About Work',
      description: 'Discuss your job and work life',
      estimatedTime: 15,
      keyPhrases: [
        'Ich arbeite als...',
        'Meine Arbeit ist...',
        'Ich muss... machen',
        'Der Job ist stressig/entspannt',
        'Meine Kollegen sind...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Networking event',
          prompt: 'Explain what you do for work',
          expectedPattern: 'Ich arbeite als... Ich muss...'
        }
      ]
    },
    {
      id: 'a2-9',
      number: 21,
      level: 'A2',
      title: 'Future Plans',
      description: 'Talk about future intentions and plans',
      estimatedTime: 15,
      keyPhrases: [
        'Ich werde... machen',
        'Nächstes Jahr will ich...',
        'Ich plane...',
        'Ich habe vor...',
        'In Zukunft...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Discussing plans',
          prompt: 'Talk about your plans for next summer',
          expectedPattern: 'Nächsten Sommer werde ich...'
        }
      ]
    },
    {
      id: 'a2-10',
      number: 22,
      level: 'A2',
      title: 'Invitations & Events',
      description: 'Invite people and discuss events',
      estimatedTime: 15,
      keyPhrases: [
        'Ich lade dich ein',
        'Kommst du mit?',
        'Wir feiern...',
        'Die Party ist am...',
        'Bring bitte... mit'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Inviting to a party',
          prompt: 'Invite a colleague to your birthday party',
          expectedPattern: 'Ich feiere... Kommst du?'
        }
      ]
    },
    {
      id: 'a2-11',
      number: 23,
      level: 'A2',
      title: 'Shopping for Clothes',
      description: 'Shop for clothing and discuss sizes/colors',
      estimatedTime: 15,
      keyPhrases: [
        'Welche Größe haben Sie?',
        'Kann ich das anprobieren?',
        'Das steht mir gut/schlecht',
        'Haben Sie das in Blau?',
        'Das ist zu teuer'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'In a clothing store',
          prompt: 'Try on a jacket and ask about sizes',
          expectedPattern: 'Kann ich... anprobieren? Haben Sie...?'
        }
      ]
    },
    {
      id: 'a2-12',
      number: 24,
      level: 'A2',
      title: 'Phone Conversations',
      description: 'Make phone calls and leave messages',
      estimatedTime: 15,
      keyPhrases: [
        'Hier spricht...',
        'Kann ich bitte mit... sprechen?',
        'Einen Moment, bitte',
        'Kann ich eine Nachricht hinterlassen?',
        'Auf Wiederhören'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Calling a doctor',
          prompt: 'Call to make an appointment',
          expectedPattern: 'Guten Tag, hier spricht... Ich möchte...'
        }
      ]
    }
  ],

  // ============ LEVEL B1: CONVERSATIONAL GERMAN (12 themes) ============
  B1: [
    {
      id: 'b1-1',
      number: 25,
      level: 'B1',
      title: 'Expressing Opinions',
      description: 'Share your views and opinions on various topics',
      estimatedTime: 15,
      keyPhrases: [
        'Meiner Meinung nach...',
        'Ich glaube, dass...',
        'Ich bin der Ansicht...',
        'Das finde ich (nicht)...',
        'Einerseits..., andererseits...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Discussing politics',
          prompt: 'Share your opinion on a current topic',
          expectedPattern: 'Meiner Meinung nach... Ich glaube...'
        }
      ]
    },
    {
      id: 'b1-2',
      number: 26,
      level: 'B1',
      title: 'Telling Stories',
      description: 'Narrate events and experiences in detail',
      estimatedTime: 15,
      keyPhrases: [
        'Es war einmal...',
        'Plötzlich...',
        'Danach ist etwas Komisches passiert',
        'Am Ende...',
        'Die ganze Geschichte war...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Entertaining friends',
          prompt: 'Tell a funny story from your past',
          expectedPattern: 'Es war... Plötzlich... Am Ende...'
        }
      ]
    },
    {
      id: 'b1-3',
      number: 27,
      level: 'B1',
      title: 'Complex Explanations',
      description: 'Explain processes and concepts in detail',
      estimatedTime: 15,
      keyPhrases: [
        'Zuerst muss man...',
        'Der Grund dafür ist...',
        'Das bedeutet, dass...',
        'Um das zu verstehen...',
        'Zusammengefasst...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Explaining your job',
          prompt: 'Explain in detail what you do at work',
          expectedPattern: 'Ich bin verantwortlich für... Das bedeutet...'
        }
      ]
    },
    {
      id: 'b1-4',
      number: 28,
      level: 'B1',
      title: 'Debating & Discussing',
      description: 'Engage in debates and express disagreement politely',
      estimatedTime: 15,
      keyPhrases: [
        'Ich stimme (nicht) zu',
        'Das sehe ich anders',
        'Einerseits hast du Recht, aber...',
        'Darf ich widersprechen?',
        'Lass uns einen Kompromiss finden'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Friendly debate',
          prompt: 'Discuss whether living in a city is better than the countryside',
          expectedPattern: 'Ich stimme zu, dass... aber...'
        }
      ]
    },
    {
      id: 'b1-5',
      number: 29,
      level: 'B1',
      title: 'Hypothetical Situations',
      description: 'Use subjunctive to discuss "what if" scenarios',
      estimatedTime: 15,
      keyPhrases: [
        'Wenn ich... wäre',
        'Ich würde...',
        'Stell dir vor...',
        'An deiner Stelle...',
        'Das wäre toll/schrecklich'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Daydreaming',
          prompt: 'Discuss what you would do if you won the lottery',
          expectedPattern: 'Wenn ich... würde ich...'
        }
      ]
    },
    {
      id: 'b1-6',
      number: 30,
      level: 'B1',
      title: 'Cultural Discussions',
      description: 'Discuss cultural differences and traditions',
      estimatedTime: 15,
      keyPhrases: [
        'In meiner Kultur...',
        'Das ist typisch für...',
        'Bei uns macht man das anders',
        'Interessanterweise...',
        'Das finde ich faszinierend'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Cultural exchange',
          prompt: 'Compare British and German customs',
          expectedPattern: 'In England... aber in Deutschland...'
        }
      ]
    },
    {
      id: 'b1-7',
      number: 31,
      level: 'B1',
      title: 'Emotional Expressions',
      description: 'Express feelings and emotions in depth',
      estimatedTime: 15,
      keyPhrases: [
        'Ich bin begeistert von...',
        'Das macht mich wütend/traurig/glücklich',
        'Ich habe Angst vor...',
        'Ich freue mich auf...',
        'Das berührt mich sehr'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Deep conversation',
          prompt: 'Talk about something that made you emotional recently',
          expectedPattern: 'Das hat mich... gemacht, weil...'
        }
      ]
    },
    {
      id: 'b1-8',
      number: 32,
      level: 'B1',
      title: 'Negotiations & Compromises',
      description: 'Negotiate and find middle ground',
      estimatedTime: 15,
      keyPhrases: [
        'Können wir uns einigen?',
        'Wie wäre es mit...?',
        'Das geht leider nicht',
        'Ich kann dir entgegenkommen',
        'Lass uns einen Deal machen'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Negotiating price',
          prompt: 'Negotiate the price of a used car',
          expectedPattern: 'Könnten Sie... Wie wäre es...?'
        }
      ]
    },
    {
      id: 'b1-9',
      number: 33,
      level: 'B1',
      title: 'Professional Conversations',
      description: 'Conduct business meetings and presentations',
      estimatedTime: 15,
      keyPhrases: [
        'Vielen Dank für die Einladung',
        'Ich möchte präsentieren...',
        'Die Zahlen zeigen...',
        'Haben Sie noch Fragen?',
        'Lassen Sie uns zusammenfassen'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Business meeting',
          prompt: 'Present a project to colleagues',
          expectedPattern: 'Ich möchte... präsentieren. Die Hauptpunkte sind...'
        }
      ]
    },
    {
      id: 'b1-10',
      number: 34,
      level: 'B1',
      title: 'Abstract Concepts',
      description: 'Discuss abstract ideas like happiness, success, freedom',
      estimatedTime: 15,
      keyPhrases: [
        'Glück bedeutet für mich...',
        'Erfolg ist relativ',
        'Das hängt davon ab',
        'Philosophisch gesehen...',
        'Im Großen und Ganzen...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Philosophical discussion',
          prompt: 'Discuss what happiness means to you',
          expectedPattern: 'Für mich bedeutet Glück... weil...'
        }
      ]
    },
    {
      id: 'b1-11',
      number: 35,
      level: 'B1',
      title: 'Spontaneous Conversations',
      description: 'Handle unexpected topics and keep conversations flowing',
      estimatedTime: 15,
      keyPhrases: [
        'Übrigens...',
        'Das erinnert mich an...',
        'Apropos...',
        'Bevor ich es vergesse...',
        'Ach ja, noch etwas...'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Random chat',
          prompt: 'Have a free-flowing conversation (no set topic)',
          expectedPattern: 'Natural flow with topic changes'
        }
      ]
    },
    {
      id: 'b1-12',
      number: 36,
      level: 'B1',
      title: 'Full Conversational Fluency',
      description: 'Final test: 30-minute natural conversation',
      estimatedTime: 30,
      keyPhrases: [
        'Integration of all learned patterns',
        'Natural speech rhythm',
        'Spontaneous responses',
        'Complex sentence structures',
        'Confident expression'
      ],
      scenarios: [
        {
          id: 's1',
          situation: 'Capstone conversation',
          prompt: 'Have a natural 30-minute conversation covering multiple topics',
          expectedPattern: 'Fluent, natural German conversation'
        }
      ]
    }
  ],

  // ============ FAMILY LIFE (5 bonus themes) ============
  FAMILY: [
    {
      id: 'fam-1',
      number: 37,
      level: 'B1',
      title: 'Talking with Your Partner',
      description: 'Daily conversations with your spouse - planning, discussing, problem-solving',
      estimatedTime: 30,
      realWorldContext: true,
      keyPhrases: [
        'Was hältst du davon?',
        'Sollen wir... oder lieber...?',
        'Ich finde, dass...',
        'Hast du schon... gemacht?',
        'Lass uns darüber reden'
      ],
      grammarFocus: ['Subjunctive II', 'Modal verbs', 'Subordinate clauses', 'Future tense'],
      scenarios: [
        {
          id: 's1',
          situation: 'Planning the weekend with your wife',
          prompt: 'Discuss what you should do Saturday - kids activities, shopping, visiting family',
          expectedPattern: 'Am Wochenende könnten wir... Sollen wir... oder würdest du lieber...?',
          grammarDrill: {
            pattern: 'Modal verbs + infinitive',
            exercise: 'Practice: Wir müssen/sollen/können/wollen + [activity]'
          }
        },
        {
          id: 's2',
          situation: 'Discussing finances and household decisions',
          prompt: 'Talk about a big purchase, budget concerns, or home repairs needed',
          expectedPattern: 'Ich denke, wir sollten... Was meinst du? Können wir uns das leisten?',
          grammarDrill: {
            pattern: 'Subordinate clauses with "dass", "ob", "weil"',
            exercise: 'Ich finde, dass... / Ich weiß nicht, ob... / Wir können es kaufen, weil...'
          }
        },
        {
          id: 's3',
          situation: 'Resolving a disagreement calmly',
          prompt: 'You disagree about something - express your view, listen, find compromise',
          expectedPattern: 'Ich verstehe deinen Punkt, aber... Vielleicht könnten wir...',
          culturalNotes: 'Germans value direct communication - be honest but respectful'
        }
      ]
    },
    {
      id: 'fam-2',
      number: 38,
      level: 'A2',
      title: 'Parenting in German',
      description: 'Essential phrases for daily parenting - instructions, praise, discipline, bedtime',
      estimatedTime: 30,
      realWorldContext: true,
      keyPhrases: [
        'Zieh dich an!',
        'Räum dein Zimmer auf!',
        'Gut gemacht!',
        'Das darfst du nicht!',
        'Komm, wir gehen ins Bett',
        'Hast du deine Hausaufgaben gemacht?'
      ],
      grammarFocus: ['Imperative mood', 'Separable verbs', 'Perfect tense', 'Reflexive verbs'],
      scenarios: [
        {
          id: 's1',
          situation: 'Morning routine - getting kids ready',
          prompt: 'Tell kids to wake up, get dressed, brush teeth, eat breakfast, hurry up',
          expectedPattern: 'Steh auf! Zieh dich an! Beeil dich!',
          vocabulary: ['sich anziehen', 'sich beeilen', 'Zähne putzen', 'frühstücken'],
          grammarDrill: {
            pattern: 'Imperative + separable verbs',
            exercise: 'aufstehen → Steh auf! / sich anziehen → Zieh dich an!'
          }
        },
        {
          id: 's2',
          situation: 'Homework and school talk',
          prompt: 'Ask about school day, check homework, help with problems, praise effort',
          expectedPattern: 'Wie war die Schule? Was hast du gelernt? Zeig mir deine Hausaufgaben.',
          vocabulary: ['Hausaufgaben', 'Klassenarbeit', 'Note', 'Lehrer/in']
        },
        {
          id: 's3',
          situation: 'Bedtime routine',
          prompt: 'Bath, pajamas, story time, goodnight kisses, expressing love',
          expectedPattern: 'Zeit fürs Bett. Ich lese dir eine Geschichte vor. Gute Nacht, Schatz. Ich hab dich lieb.',
          emotionalVocabulary: ['Ich hab dich lieb', 'Schlaf gut', 'Träum was Schönes']
        }
      ]
    },
    {
      id: 'fam-3',
      number: 39,
      level: 'B1',
      title: 'German Family Gatherings',
      description: 'Navigate visits with in-laws and extended family',
      estimatedTime: 30,
      realWorldContext: true,
      keyPhrases: [
        'Vielen Dank für die Einladung',
        'Der Kuchen schmeckt hervorragend',
        'Wie geht es [Name]?',
        'Schön, euch zu sehen'
      ],
      grammarFocus: ['Formal Sie vs informal du', 'Adjective endings'],
      scenarios: [
        {
          id: 's1',
          situation: 'Arriving at in-laws for Kaffee und Kuchen',
          prompt: 'Greet family, thank for invitation, compliment the cake, make small talk',
          expectedPattern: 'Guten Tag! Danke für die Einladung. Der Kuchen sieht toll aus.',
          culturalNotes: ['Bring cake or flowers', 'Take shoes off at door', 'Arrive on time']
        },
        {
          id: 's2',
          situation: 'Family dinner - catching up',
          prompt: 'Ask about their lives, share news, discuss current events',
          expectedPattern: 'Was gibt es Neues bei euch? Wir haben gerade...',
          vocabulary: ['Verwandtschaft', 'Schwiegermutter', 'Schwager', 'Schwägerin']
        }
      ]
    },
    {
      id: 'fam-4',
      number: 40,
      level: 'A2',
      title: 'Kids Activities & Socializing',
      description: 'Talk with other parents at playground, school, parties',
      estimatedTime: 20,
      realWorldContext: true,
      keyPhrases: [
        'Wie alt ist dein Kind?',
        'In welche Klasse geht er/sie?',
        'Wollen wir uns treffen?'
      ],
      grammarFocus: ['Question formation', 'Reflexive verbs'],
      scenarios: [
        {
          id: 's1',
          situation: 'Meeting parents at playground',
          prompt: 'Introduce yourself, ask about their kids, arrange playdates',
          expectedPattern: 'Hallo, ich bin [Name]. Das ist mein Sohn/meine Tochter.',
          vocabulary: ['Spielplatz', 'Sandkasten', 'Schaukel']
        },
        {
          id: 's2',
          situation: 'School pickup small talk',
          prompt: 'Chat with other parents about school, events, weekend plans',
          expectedPattern: 'Wie war die Schule heute? Was macht ihr am Wochenende?'
        }
      ]
    },
    {
      id: 'fam-5',
      number: 41,
      level: 'B1',
      title: 'Complex Family Topics',
      description: 'Discuss emotions, relationships, future plans, difficult subjects',
      estimatedTime: 30,
      realWorldContext: true,
      keyPhrases: [
        'Ich mache mir Sorgen um...',
        'Können wir über... sprechen?',
        'Was hältst du von der Idee...?',
        'Ich fühle mich...'
      ],
      grammarFocus: ['Subjunctive II', 'Reflexive verbs', 'Complex subordinate clauses'],
      scenarios: [
        {
          id: 's1',
          situation: 'Discussing concerns about one of the kids',
          prompt: 'Share worries, ask for perspective, discuss solutions',
          expectedPattern: 'Ich mache mir Sorgen um [Name]. Ist dir aufgefallen, dass...?',
          vocabulary: ['sich Sorgen machen', 'auffallen', 'Verhalten']
        },
        {
          id: 's2',
          situation: 'Planning a big life change',
          prompt: 'Discuss options, pros and cons, make decisions together',
          expectedPattern: 'Was wäre, wenn wir...? Einerseits... andererseits...',
          grammarDrill: {
            pattern: 'Subjunctive II (Konjunktiv II)',
            exercise: 'Was wäre, wenn...? / Wir könnten...'
          }
        }
      ]
    }
  ]
};

/**
 * Get all themes as flat array
 */
export function getAllThemes() {
  return [...GERMAN_THEMES.A1, ...GERMAN_THEMES.A2, ...GERMAN_THEMES.B1, ...GERMAN_THEMES.FAMILY];
}

/**
 * Get family themes
 */
export function getFamilyThemes() {
  return GERMAN_THEMES.FAMILY;
}

/**
 * Get theme by ID
 */
export function getThemeById(id) {
  const all = getAllThemes();
  return all.find(theme => theme.id === id);
}

/**
 * Get themes by level
 */
export function getThemesByLevel(level) {
  return GERMAN_THEMES[level] || [];
}

/**
 * Calculate progress percentage
 */
export function calculateProgress(completedThemeIds) {
  const total = 41; // 36 original + 5 family themes
  const completed = completedThemeIds.length;
  return Math.round((completed / total) * 100);
}

/**
 * Get next theme to learn
 */
export function getNextTheme(completedThemeIds) {
  const all = getAllThemes();
  return all.find(theme => !completedThemeIds.includes(theme.id));
}

/**
 * Get level from completed count
 */
export function getCurrentLevel(completedThemeIds) {
  const count = completedThemeIds.length;
  if (count < 12) return 'A1';
  if (count < 24) return 'A2';
  if (count < 36) return 'B1';
  return 'B1+';
}

/**
 * Map a learner level to a CEFR band an LLM actually understands.
 * 'B1+' is our internal progress label, not a CEFR band — any prompt that
 * interpolates the level must pass it through here first, or advanced
 * learners send the model a band it doesn't recognise.
 */
export function cefrForAI(level) {
  return level === 'B1+' ? 'B1' : level;
}
