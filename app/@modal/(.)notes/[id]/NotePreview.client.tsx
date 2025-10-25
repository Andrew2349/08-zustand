'use client';

import { useRouter } from 'next/navigation';
import css from "./NotePreview.module.css"
import Modal from '@/components/Modal/Modal';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';

interface Props {
  noteId: string;
}

export default function NotePreviewClient({ noteId }: Props) {
  const router = useRouter();

  const handleClose = () => router.back();

    const { data: note, isLoading, isError  } = useQuery({
    queryKey: ["note", noteId],
      queryFn: () => fetchNoteById(noteId),
    refetchOnMount:false
  });
   if (isLoading) return <Modal onClose={handleClose}><p>Loading...</p></Modal>;
  if (isError || !note) return <Modal onClose={handleClose}><p>Failed to load note</p></Modal>;
    return (
      <Modal onClose={handleClose}>
      <div className={css.container}>
  <div className={css.item}>
    <div className={css.header}>
      <h2>{note.title}</h2>
      <button onClick={handleClose} className={css.backBtn}>Close</button>
    </div>
    <p className={css.content}>{note.content}</p>
    <p className={css.tag}>{note.tag}</p>
    <p className={css.date}>{note.createdAt}</p>
  </div>
</div>
        </Modal>
  );
}