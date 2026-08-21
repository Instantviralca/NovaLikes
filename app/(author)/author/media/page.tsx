import { MediaLibrary } from '@/components/author/media-library';

export default function AuthorMediaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Media</h1>
      <MediaLibrary />
    </div>
  );
}
