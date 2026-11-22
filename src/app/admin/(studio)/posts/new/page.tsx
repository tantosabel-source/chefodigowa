import { PostForm } from "@/components/admin/post-form";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="pb-6">
      <p className="eyebrow text-clay">Create</p>
      <h2 className="mt-1 font-display text-2xl text-forest">Add a recipe or journal entry</h2>
      <p className="mt-1 mb-5 max-w-xl text-sm text-ink/55">
        Write it the way you would tell it. The form handles the rest.
      </p>
      <PostForm />
    </div>
  );
}
