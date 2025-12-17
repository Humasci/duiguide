import DeadlineCalculator from '@/components/DeadlineCalculator';

export default function DeadlineCheckerPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <DeadlineCalculator />
    </div>
  );
}

export const metadata = {
  title: 'DMV Hearing Deadline Calculator | DUI Arrest Guide',
  description: 'Calculate your DMV hearing deadline after a DUI/DWI arrest. Don\'t miss the critical deadline to request your administrative hearing and protect your license.',
};