'use client';

import React, { createContext, useState } from 'react';

interface UserAnswersContextType {
  answers: boolean[];
  setAnswers: (answers: boolean[]) => void;
}

export const UserAnswersContext = createContext<UserAnswersContextType>({
  answers: [],
  setAnswers: () => {},
});

export const UserAnswersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<boolean[]>([]);

  return (
    <UserAnswersContext.Provider value={{ answers, setAnswers }}>
      {children}
    </UserAnswersContext.Provider>
  );
};