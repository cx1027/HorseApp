"use client";

import { useEffect, useState, useRef } from "react";
import { PageHeader, Card, Badge } from "@/components/ui";

interface Document {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: string;
  horseName: string | null;
  category: string;
  uploadedAt: string;
}

const mockDocuments: Document[] = [
  { id: "1", fileName: "Vaccination Certificate.pdf", fileType: "PDF", fileSize: "2.4 MB", horseName: "Golden Gallop", category: "Health", uploadedAt: "2026-06-15" },
  { id: "2", fileName: "Insurance Policy 2026.pdf", fileType: "PDF", fileSize: "1.8 MB", horseName: "Golden Gallop", category: "Insurance", uploadedAt: "2026-01-01" },
  { id: "3", fileName: "Ownership Contract.pdf", fileType: "PDF", fileSize: "956 KB", horseName: "Golden Gallop", category: "Legal", uploadedAt: "2024-01-15" },
  { id: "4", fileName: "Microchip Certificate.pdf", fileType: "PDF", fileSize: "445 KB", horseName: "Golden Gallop", category: "Registration", uploadedAt: "2023-06-20" },
];

const categories = ["All", "Health", "Insurance", "Legal", "Registration"];

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => {
      setDocuments(mockDocuments);
      setIsLoading(false);
    }, 300);
  }, []);

  const filteredDocuments = documents.filter((doc) => {
    if (selectedCategory === "All") return true;
    return doc.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-background-primary">
      <PageHeader
        title="Documents"
        subtitle={`${documents.length} files`}
      />

      <div className="p-5 space-y-5">
        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-3xl p-8 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary-soft"
              : "border-border hover:border-primary/50"
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); }}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            multiple
          />
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-soft">
            <svg className="h-7 w-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
          </div>
          <p className="text-sm font-medium text-text-primary">Click to upload files</p>
          <p className="mt-2 text-xs text-text-muted">PDF, DOC, JPG, PNG max 10MB</p>
        </div>

        {/* Category Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-primary text-white shadow-button"
                  : "bg-surface text-text-secondary hover:bg-background-primary"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Documents List */}
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-background-primary" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-48 rounded bg-background-primary" />
                  <div className="h-3 w-32 rounded bg-background-primary" />
                </div>
              </div>
            </Card>
          ))
        ) : (
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <Card key={doc.id} className="py-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-2xl bg-primary-soft flex items-center justify-center">
                    <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary truncate">{doc.fileName}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant="primary" size="sm">{doc.category}</Badge>
                      {doc.horseName && (
                        <span className="text-xs text-text-muted">{doc.horseName}</span>
                      )}
                      <span className="text-xs text-text-muted">·</span>
                      <span className="text-xs text-text-muted">{doc.uploadedAt}</span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
