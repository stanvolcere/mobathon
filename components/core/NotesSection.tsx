import { useState } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs-simple";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea-simple";
import { Plus, Edit2, Check, X } from "lucide-react";
import type { Note } from "@/types/recipe";

interface NotesSectionProps {
  notes: Note[];
  onAddNote: (category: Note["category"], content: string) => void;
  onUpdateNote: (id: string, content: string) => void;
  onDeleteNote: (id: string) => void;
}

export function NotesSection({
  notes,
  onAddNote,
  onUpdateNote,
  onDeleteNote,
}: NotesSectionProps) {
  const [activeTab, setActiveTab] = useState<Note["category"]>("ingredients");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState("");

  const categoryNotes = notes.filter((note) => note.category === activeTab);

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditContent(note.content);
  };

  const saveEdit = () => {
    if (editingId && editContent.trim()) {
      onUpdateNote(editingId, editContent);
      setEditingId(null);
      setEditContent("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const startAdding = () => {
    setIsAdding(true);
    setNewContent("");
  };

  const saveNew = () => {
    if (newContent.trim()) {
      onAddNote(activeTab, newContent);
      setIsAdding(false);
      setNewContent("");
    }
  };

  const cancelNew = () => {
    setIsAdding(false);
    setNewContent("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3>Notes ({notes.length})</h3>
        <Button variant="ghost" size="sm" onClick={startAdding}>
          Add note
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as Note["category"])}
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
          <TabsTrigger value="method">Method</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {isAdding && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg space-y-2">
              <Textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                placeholder="Add your note here..."
                className="min-h-[80px] bg-white"
                autoFocus
              />
              <div className="flex gap-2">
                <Button size="sm" onClick={saveNew}>
                  <Check className="w-4 h-4 mr-1" />
                  Save
                </Button>
                <Button size="sm" variant="ghost" onClick={cancelNew}>
                  <X className="w-4 h-4 mr-1" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {categoryNotes.length === 0 && !isAdding && (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No notes yet. Click "Add note" to get started.
            </div>
          )}

          {categoryNotes.map((note) => (
            <div
              key={note.id}
              className="p-3 bg-orange-50 border border-orange-200 rounded-lg space-y-2"
            >
              {editingId === note.id ? (
                <>
                  <Textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="min-h-[80px] bg-white"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={saveEdit}>
                      <Check className="w-4 h-4 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="ghost" onClick={cancelEdit}>
                      <X className="w-4 h-4 mr-1" />
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-sm whitespace-pre-wrap">{note.content}</p>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => startEdit(note)}
                    >
                      <Edit2 className="w-3.5 h-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDeleteNote(note.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="w-3.5 h-3.5 mr-1" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
