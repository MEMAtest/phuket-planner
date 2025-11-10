import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

/**
 * Traveler profile types and preferences
 */
export type TravelerType = 'business' | 'leisure' | 'family' | 'adventure';

export type TravelerProfile = {
  id: string;
  name: string;
  type: TravelerType;
  preferences: {
    pace: 'relaxed' | 'moderate' | 'fast';
    accommodation: 'budget' | 'mid-range' | 'luxury';
    dining: 'street-food' | 'casual' | 'fine-dining' | 'mixed';
    activities: Array<'culture' | 'adventure' | 'beach' | 'shopping' | 'nightlife' | 'food' | 'nature'>;
    budget: {
      dailyMax: number;
      currency: string;
    };
  };
};

export type ProfileState = {
  currentProfile: TravelerProfile | null;
  allProfiles: TravelerProfile[];
  setCurrentProfile: (profileId: string | null) => void;
  addProfile: (profile: Omit<TravelerProfile, 'id'>) => void;
  updateProfile: (id: string, updates: Partial<TravelerProfile>) => void;
  deleteProfile: (id: string) => void;
};

const ProfileContext = createContext<ProfileState | undefined>(undefined);

/**
 * Default profiles for new users
 */
const DEFAULT_PROFILES: TravelerProfile[] = [
  {
    id: 'business-traveler',
    name: 'Business Traveler',
    type: 'business',
    preferences: {
      pace: 'fast',
      accommodation: 'mid-range',
      dining: 'casual',
      activities: ['culture', 'food'],
      budget: { dailyMax: 150, currency: 'USD' }
    }
  },
  {
    id: 'leisure-traveler',
    name: 'Leisure Traveler',
    type: 'leisure',
    preferences: {
      pace: 'relaxed',
      accommodation: 'mid-range',
      dining: 'mixed',
      activities: ['culture', 'beach', 'food', 'shopping'],
      budget: { dailyMax: 100, currency: 'USD' }
    }
  }
];

export function ProfileProvider({ children }: { children: ReactNode }) {
  // Load all profiles from localStorage
  const [allProfiles, setAllProfiles] = useState<TravelerProfile[]>(() => {
    const saved = localStorage.getItem('traveler_profiles_v1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch (error) {
        console.error('Error loading traveler profiles:', error);
      }
    }
    return DEFAULT_PROFILES;
  });

  // Load current profile selection from localStorage
  const [currentProfileId, setCurrentProfileId] = useState<string | null>(() => {
    const saved = localStorage.getItem('current_profile_id');
    return saved || (allProfiles.length > 0 ? allProfiles[0].id : null);
  });

  // Derive current profile from ID
  const currentProfile = currentProfileId
    ? allProfiles.find(p => p.id === currentProfileId) || null
    : null;

  // Save profiles whenever they change
  useEffect(() => {
    localStorage.setItem('traveler_profiles_v1', JSON.stringify(allProfiles));
  }, [allProfiles]);

  // Save current profile selection
  useEffect(() => {
    if (currentProfileId) {
      localStorage.setItem('current_profile_id', currentProfileId);
    } else {
      localStorage.removeItem('current_profile_id');
    }
  }, [currentProfileId]);

  const setCurrentProfile = useCallback((profileId: string | null) => {
    setCurrentProfileId(profileId);
  }, []);

  const addProfile = useCallback((profile: Omit<TravelerProfile, 'id'>) => {
    const newProfile: TravelerProfile = {
      ...profile,
      id: `profile-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setAllProfiles(prev => [...prev, newProfile]);
    setCurrentProfileId(newProfile.id);
  }, []);

  const updateProfile = useCallback((id: string, updates: Partial<TravelerProfile>) => {
    setAllProfiles(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  }, []);

  const deleteProfile = useCallback((id: string) => {
    setAllProfiles(prev => {
      const filtered = prev.filter(p => p.id !== id);
      // If we deleted the current profile, switch to first available
      if (currentProfileId === id && filtered.length > 0) {
        setCurrentProfileId(filtered[0].id);
      }
      return filtered;
    });
  }, [currentProfileId]);

  const value: ProfileState = {
    currentProfile,
    allProfiles,
    setCurrentProfile,
    addProfile,
    updateProfile,
    deleteProfile
  };

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

/**
 * Hook to access traveler profile context
 */
export function useProfile(): ProfileState {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
