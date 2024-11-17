// app/tutorials/[slug]/page.tsx

import { getTutorial, getAllTutorialSlugs } from '../../../lib/tutorials';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = await getAllTutorialSlugs();
  return slugs.map((slug) => ({ slug: slug.slug }));
}

export default async function TutorialPage({params}: Props) {
  const { slug } = await params;
  const tutorial = await getTutorial(slug);

  return (
    <div className="prose mx-auto p-8 w-full max-w-2xl">
      <h1>{tutorial.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: tutorial.contentHtml }} />
    </div>
  );
}