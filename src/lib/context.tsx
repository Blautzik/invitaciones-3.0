'use client';

import React, { createContext, useContext, useState, useReducer, useEffect } from 'react';
import { AppState, ProjectData } from './types';
import { fetchProjectData } from './api';

// Initial state
const initialState: AppState = {
  isLoading: true,
  isEntered: false,
  projectData: null,
  error: null
};

// Action types
type Action =
  | { type: 'LOADING' }
  | { type: 'LOADED_SUCCESS'; payload: ProjectData }
  | { type: 'LOADED_ERROR'; payload: string }
  | { type: 'ENTER_SITE' }
  | { type: 'UPDATE_PROJECT_DATA'; payload: Partial<ProjectData> };

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOADING':
      return { ...state, isLoading: true, error: null };
    case 'LOADED_SUCCESS':
      return {
        ...state,
        isLoading: false,
        projectData: action.payload,
        error: null
      };
    case 'LOADED_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case 'ENTER_SITE':
      return {
        ...state,
        isEntered: true
      };
    case 'UPDATE_PROJECT_DATA':
      return {
        ...state,
        projectData: state.projectData ? { ...state.projectData, ...action.payload } : null
      };
    default:
      return state;
  }
}

// Create context
interface AppContextValue {
  state: AppState;
  loadData: () => Promise<void>;
  enterSite: () => void;
  updateProjectData: (data: Partial<ProjectData>) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const loadData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await fetchProjectData();
      dispatch({ type: 'LOADED_SUCCESS', payload: data });
    } catch (error) {
      dispatch({
        type: 'LOADED_ERROR',
        payload: error instanceof Error ? error.message : 'An unknown error occurred'
      });
    }
  };

  const enterSite = () => {
    dispatch({ type: 'ENTER_SITE' });
  };

  const updateProjectData = (data: Partial<ProjectData>) => {
    dispatch({ type: 'UPDATE_PROJECT_DATA', payload: data });
  };

  // Auto-load data when the component mounts
  useEffect(() => {
    loadData();
  }, []);

  return (
    <AppContext.Provider value={{ state, loadData, enterSite, updateProjectData }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
