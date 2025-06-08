import { ContentSuggester } from '@/components/curation/ContentSuggester';

export default function CurationPage() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-0">
      <header className="mb-10 text-center md:text-left">
        <h1 className="text-4xl font-bold font-headline text-primary mb-2">AI-Powered Content Curation</h1>
        <p className="text-xl text-muted-foreground">Let our AI guide you to the best learning resources tailored to your needs.</p>
      </header>
      <ContentSuggester />
    </div>
  );
}
