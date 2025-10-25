'use client'

import { useId } from "react";
import css from "./NoteForm.module.css"

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import type { CreateNoteRequest } from "@/types/note";
import { useRouter } from "next/navigation";
import { useNoteStore } from "@/lib/store/noteStore";

interface NoteFormValues{
  title: string,
  content: string,
  tag:"Todo" | "Work" | "Personal" | "Meeting" | "Shopping"
}




export default function NoteForm() {
     const router = useRouter();
  const { draft, setDraft, clearDraft } = useNoteStore();
  const queryClient = useQueryClient()
   const fieldId = useId();

    const mutation = useMutation({
      mutationFn: (values: CreateNoteRequest) => createNote(values),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] })
        clearDraft();
        router.push("/notes/filter/all");
      },
      
    })
    const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
	  
    setDraft({
      ...draft,
      [event.target.name]: event.target.value,
    });
  };
    function handleSubmit(formData: FormData) {
      const newNote: CreateNoteRequest = {
      title: formData.get("title") as string,
      content: formData.get("content") as string,
      tag: formData.get("tag") as
        | "Todo"
        | "Work"
        | "Personal"
        | "Meeting"
        | "Shopping",
    };

    mutation.mutate(newNote);
    }

    
    
    return (
        
        <form action={handleSubmit} className={css.form}>
      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-title`}>Title</label>
        <input id={`${fieldId}-title`} name="title" type="text" required className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-content`}>Content</label>
        <textarea id={`${fieldId}-content`} name="content" rows={8} className={css.textarea} defaultValue={draft?.content} onChange={handleChange}/>
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`${fieldId}-tag`}>Tag</label>
        <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitButton}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Creating..." : "Create note"}
        </button>
      </div>
    </form>
            
    )
}