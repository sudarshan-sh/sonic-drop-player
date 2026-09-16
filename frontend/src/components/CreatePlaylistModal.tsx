/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import type { Playlist } from "./Playlists/PlaylistCard";

interface CreatePlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, description: string) => Promise<void>;
  mode?: "create" | "edit";
  editingPlaylist?: Playlist | null;
}

const emptyForm = { title: "", description: "" };

const CreatePlaylistModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode = "create",
  editingPlaylist = null,
}: CreatePlaylistModalProps) => {
  const [form, setForm] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // populate the form when opening for edit, reset it when opening for create
  useEffect(() => {
    if (!isOpen) return;

    if (mode === "edit" && editingPlaylist) {
      setForm({
        title: editingPlaylist.title,
        description: editingPlaylist.description,
      });
    } else {
      setForm(emptyForm);
    }
  }, [isOpen, mode, editingPlaylist]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    try {
      setIsSubmitting(true);
      await onSubmit(form.title, form.description);
      setForm(emptyForm);
      onClose();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  const isEdit = mode === "edit";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="absolute inset-0" onClick={onClose} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150"
      >
        <h2 className="text-xl font-bold text-white mb-4">
          {isEdit ? "Edit Playlist" : "Create New Playlist"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">
              Playlist Name *
            </label>
            <input
              type="text"
              required
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Chill Late Night Mix"
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2.5 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">
              Description (Optional)
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Give your mix a mood summary..."
              className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-lg p-2.5 text-sm h-24 resize-none focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-800 px-4 py-2 text-xs font-semibold text-zinc-300 hover:bg-zinc-700 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !form.title}
            className="rounded-lg bg-emerald-600 px-5 py-2 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95 disabled:opacity-50 disabled:scale-100 transition"
          >
            {isSubmitting
              ? isEdit
                ? "Saving..."
                : "Creating..."
              : isEdit
                ? "Save Changes"
                : "Create Playlist"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylistModal;
