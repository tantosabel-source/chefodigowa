import Link from "next/link";
import { notFound } from "next/navigation";

import { deletePostAction } from "@/app/actions/admin";
import { ConfirmDelete } from "@/components/admin/confirm-submit";
import { PostForm } from "@/components/admin/post-form";
import { getAdminPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function EditPostPage({ params }: PageProps) {
  const { id } = await params;
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) notFound();

  const post = await getAdminPost(numericId);
  if (!post) notFound();

  return (
    <div className="pb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="eyebrow text-clay">Editing</p>
          <h2 className="mt-1 font-display text-2xl text-forest">{post.title}</h2>
        </div>
        <Link
          href="/admin/posts"
          className="text-[0.75rem] font-semibold text-ink/50 hover:text-forest"
        >
          ← All entries
        </Link>
      </div>

      <div className="mb-5 mt-4">
        <PostForm post={post} />
      </div>

      <div className="mt-5 flex flex-col gap-3 rounded-2xl border border-clay/20 bg-clay/5 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-display text-lg text-forest">Remove this entry</h3>
          <p className="mt-1 text-[0.75rem] text-ink/55">
            This deletes the {post.kind === "recipe" ? "recipe" : "journal post"} from the site
            completely. There is no undo.
          </p>
        </div>
        <form action={deletePostAction}>
          <input type="hidden" name="id" value={post.id} />
          <ConfirmDelete
            label="Delete entry"
            className="rounded-full bg-clay px-4 py-2.5 text-[0.75rem] font-semibold text-cream transition-colors hover:bg-clay-deep"
          />
        </form>
      </div>
    </div>
  );
}
