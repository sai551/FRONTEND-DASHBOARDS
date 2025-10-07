import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { FileText, Download, Upload, Search, Filter, Eye } from "lucide-react";

interface DocumentType {
  id: number;
  name: string;
  size: string;
  type: string;
  updatedAt: string;
  category: string;
  url: string;
}

export default function EmpDocuments() {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  // Fetch documents (replace with your backend API when ready)
  useEffect(() => {
    const fetchDocs = async () => {
      try {
        // const res = await axios.get("/api/documents");
        // setDocuments(res.data);
        setTimeout(() => {
          setDocuments([
            {
              id: 1,
              name: "Employee Handbook 2024",
              size: "2.4 MB",
              type: "PDF",
              updatedAt: "2 days ago",
              category: "Company Policy",
              url: "/docs/employee-handbook.pdf",
            },
            {
              id: 2,
              name: "Project Requirements - E-commerce",
              size: "1.8 MB",
              type: "DOCX",
              updatedAt: "1 week ago",
              category: "Project",
              url: "/docs/project-requirements.docx",
            },
          ]);
          setLoading(false);
        }, 1500); // simulate API delay
      } catch (error) {
        console.error("Failed to fetch documents:", error);
        setLoading(false);
      }
    };

    fetchDocs();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    // ---- Backend API upload ----
    // const formData = new FormData();
    // formData.append("file", file);
    // await axios.post("/api/documents/upload", formData);

    console.log("Uploading file:", file.name);
  };

  const handleDownload = (url: string) => {
    window.open(url, "_blank");
  };

  const handlePreview = (url: string) => {
    window.open(url, "_blank");
  };

  const filteredDocs = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (filter === "all" || doc.category === filter)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Documents</h1>
        <Button className="gap-2" asChild>
          <label className="cursor-pointer">
            <Upload className="h-4 w-4" />
            Upload Document
            <input type="file" hidden onChange={handleUpload} />
          </label>
        </Button>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "Company Policy" ? "default" : "outline"}
          onClick={() => setFilter("Company Policy")}
        >
          Policy
        </Button>
        <Button
          variant={filter === "Project" ? "default" : "outline"}
          onClick={() => setFilter("Project")}
        >
          Project
        </Button>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {loading ? (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Skeleton className="h-8 w-8 rounded" />
                    <div>
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20 rounded" />
                </CardContent>
              </Card>
            ))}
          </>
        ) : filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <Card key={doc.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size} • Updated {doc.updatedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">{doc.category}</Badge>
                    <Button size="sm" variant="outline" onClick={() => handlePreview(doc.url)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDownload(doc.url)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No documents found.</p>
        )}
      </div>
    </div>
  );
}
