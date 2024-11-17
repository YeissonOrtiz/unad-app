// app/tutorials/page.tsx
'use client';

import { useContext, useState } from 'react';
import Link from 'next/link';
import { UserAnswersContext } from '@/context/UserAnswersContext';
import { questions } from '../../data/questions';

export default function Tutorials() {
  const { answers } = useContext(UserAnswersContext);
  const [showAll, setShowAll] = useState(false);

  const filteredTutorials = questions.filter((_, index) => answers[index] === false);

  const handleShowAll = () => {
    setShowAll(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-6 text-center text-slate-900">
          Mejora tu Ciberseguridad
        </h1>
        <p className="mb-6 text-slate-700">
          Gracias por completar el cuestionario. A continuación, encontrarás tutoriales que te ayudarán a mejorar y proteger tu PYME. Te recomendamos leerlos y aplicar las recomendaciones.
        </p>
        <ul className="space-y-4">
          {(showAll ? questions : filteredTutorials).map((question) => (
            <li key={question.slug}>
              <Link href={`/tutorials/${question.slug}`}>
                <span className="text-blue-600 hover:underline text-lg">
                  {question.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {!showAll && (
          <div className="mt-6">
            <button
              onClick={handleShowAll}
              className="text-blue-600 hover:underline"
            >
              Ver todos los tutoriales
            </button>
          </div>
        )}
      </div>
    </div>
  );
}