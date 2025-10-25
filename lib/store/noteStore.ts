import { create } from 'zustand'
import { persist } from 'zustand/middleware';

interface DraftNote{
    title: string;
    content: string;
    tag:'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping'
}

const initialDraft:DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
};

type NoteStore = {
  draft: DraftNote;
  setDraft: (note:DraftNote) => void;
  clearDraft: () => void;
};

export const useNoteStore = create<NoteStore>()(persist((set) => ({
  draft: initialDraft,
  setDraft: (note) => set(() => ({ draft: note })),
  clearDraft: () => set(() => ({ draft: initialDraft })),
}),
    {
        name: 'note-draft',
        partialize: (state) => ({ draft: state.draft })
}
)
);