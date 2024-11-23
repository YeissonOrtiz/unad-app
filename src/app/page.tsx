'use client';

import { useContext, useState } from 'react';
import { questions } from '../data/questions';
import { redirect, RedirectType } from 'next/navigation';
import { UserAnswersContext } from '@/context/UserAnswersContext';

export default function Home() {
  const { setAnswers } = useContext(UserAnswersContext);
  const [localAnswers, setLocalAnswers] = useState(Array(questions.length).fill(false));
  const [level, setLevel] = useState('');

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setAnswers(localAnswers);

    const totalWeight = localAnswers.reduce(
      (sum, answer, index) => sum + (answer ? questions[index].weight : 0),
      0
    );

    if (totalWeight <= 10) {
      setLevel('Principiante');
    } else if (totalWeight <= 20) {
      setLevel('Intermedio');
    } else {
      setLevel('Avanzado');
    }

    redirect('/tutorials', RedirectType.push);
  };

  const handleChange = (index: number) => (e: { target: { checked: boolean; }; }) => {
    const updatedAnswers = [...localAnswers];
    updatedAnswers[index] = e.target.checked;
    setLocalAnswers(updatedAnswers);
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">
          Cuestionario de Ciberseguridad para PYMEs
        </h1>
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => (
            <div key={index} className="mb-4">
              <label className="text-lg flex items-center text-slate-700">
                <input
                  type="checkbox"
                  checked={localAnswers[index]}
                  onChange={handleChange(index)}
                  className="mr-2"
                />
                {question.text}
              </label>
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
        {level && (
          <p className="mt-6 text-xl font-semibold text-center text-slate-700">Su nivel es: {level}</p>
        )}
      </div>
    </div>
  );
}
