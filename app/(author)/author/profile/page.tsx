import { AuthorProfileForm } from '@/components/author/author-profile-form';

export default function AuthorProfilePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Profile</h1>
      <AuthorProfileForm />
    </div>
  );
}
