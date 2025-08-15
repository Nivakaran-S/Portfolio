import React, { useState, useEffect, useCallback } from "react";
import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import Tiptap from "@/app/components/Tiptap";

interface CaseStudy {
  _id?: string;
  title: string;
  challenge: string;
  solution: string;
  overview: string;
  results: string;
  learnings?: string;
  technologies?: string[];
  imageUrl: string;
  demoUrl: string;
  githubUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://portfolio-backend-new-2.vercel.app";

const CaseStudies: React.FC = () => {
  // State management
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [formData, setFormData] = useState<Omit<CaseStudy, "_id" | "createdAt" | "updatedAt">>({
    title: "",
    challenge: "",
    solution: "",
    results: "",
    learnings: "",
    overview: "",
    technologies: [],
    imageUrl: "",
    demoUrl: "",
    githubUrl: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [content, setContent] = useState<string>("");

  // Fetch case studies
  const fetchCaseStudies = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = searchTerm 
        ? `${API_BASE_URL}/caseStudies/search?query=${encodeURIComponent(searchTerm)}`
        : `${API_BASE_URL}/caseStudies`;
      
      const response = await axios.get<CaseStudy[]>(url);
      setCaseStudies(response.data);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      toast.error("Failed to load case studies. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  // Initial load and search term effect
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCaseStudies();
    }, searchTerm ? 500 : 0);

    return () => clearTimeout(timer);
  }, [searchTerm, fetchCaseStudies]);

  // Form handling
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === "technologies") {
      setFormData(prev => ({
        ...prev,
        technologies: value.split(",").map(t => t.trim()).filter(t => t)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle rich text editor changes
  const handleRichTextChange = (field: string, content: string) => {
    setFormData(prev => ({ ...prev, [field]: content }));
  };

  // Validation
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    const requiredFields: Array<keyof typeof formData> = [
      "title", "challenge", "solution", "overview",
      "results", "imageUrl", "demoUrl", "githubUrl"
    ];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = "This field is required";
      }
    });

    // URL validation
    const urlFields = ["imageUrl", "demoUrl", "githubUrl"];
    urlFields.forEach(field => {
      if (formData[field as keyof typeof formData] && !isValidUrl(formData[field as keyof typeof formData] as string)) {
        errors[field] = "Please enter a valid URL";
      }
    });

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    try {
      setIsSubmitting(true);
      let response: AxiosResponse<CaseStudy>;

      if (editingId) {
        response = await axios.put<CaseStudy>(
          `${API_BASE_URL}/caseStudies/${editingId}`,
          formData
        );
        setCaseStudies(caseStudies.map(cs => cs._id === editingId ? response.data : cs));
        toast.success("Case study updated successfully!");
      } else {
        response = await axios.post<CaseStudy>(
          `${API_BASE_URL}/caseStudies`,
          formData
        );
        setCaseStudies([...caseStudies, response.data]);
        toast.success("Case study created successfully!");
      }

      resetForm();
      setActiveTab("manage");
    } catch (error: any) {
      console.error("Error submitting case study:", error);
      const errorMessage = error.response?.data?.message || "Failed to submit case study. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit case study
  const handleEdit = (caseStudy: CaseStudy) => {
    if (!caseStudy._id) return;

    setFormData({
      title: caseStudy.title,
      overview:caseStudy.overview,
      challenge: caseStudy.challenge,
      solution: caseStudy.solution,
      results: caseStudy.results,
      learnings: caseStudy.learnings || "",
      technologies: caseStudy.technologies || [],
      imageUrl: caseStudy.imageUrl,
      demoUrl: caseStudy.demoUrl,
      githubUrl: caseStudy.githubUrl,
    });
    
    setEditingId(caseStudy._id);
    setActiveTab("create");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete case study
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/caseStudies/${id}`);
      setCaseStudies(caseStudies.filter(cs => cs._id !== id));
      toast.success("Case study deleted successfully!");
    } catch (error) {
      console.error("Error deleting case study:", error);
      toast.error("Failed to delete case study. Please try again.");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: "",
      challenge: "",
      solution: "",
      results: "",
      overview: "",
      learnings: "",
      technologies: [],
      imageUrl: "",
      demoUrl: "",
      githubUrl: "",
    });
    setEditingId(null);
    setValidationErrors({});
    setContent("");
  };

  // Format date
  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Render form field with error handling
  const renderFormField = (
    name: string,
    label: string,
    type: string = "text",
    isRequired: boolean = true,
    isTextarea: boolean = false
  ) => {
    const value = formData[name as keyof typeof formData];
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
        {isTextarea ? (
          <div className="min-h-[200px]">
            <Tiptap
              description={value as string}
              onChange={(richText: string) => handleRichTextChange(name, richText)}
            />
          </div>
        ) : (
          <input
            type={type}
            name={name}
            value={value as string}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border ${
              validationErrors[name] ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        )}
        {validationErrors[name] && (
          <p className="mt-1 text-sm text-red-600">{validationErrors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-black bg-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-3 font-medium text-sm md:text-base ${
              activeTab === "create" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => {
              setActiveTab("create");
              resetForm();
            }}
          >
            {editingId ? "Edit Case Study" : "Create Case Study"}
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm md:text-base ${
              activeTab === "manage" 
                ? "text-blue-600 border-b-2 border-blue-600" 
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Case Studies
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : activeTab === "create" ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold mb-4">
                {editingId ? "Edit Case Study" : "Create New Case Study"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {renderFormField("title", "Title")}
                {renderFormField("overview", "Overview", "text", true, true)}
                {renderFormField("challenge", "Challenge", "text", true, true)}
                {renderFormField("solution", "Solution", "text", true, true)}
                {renderFormField("results", "Results", "text", true, true)}
                {renderFormField("learnings", "Learnings", "text", false, true)}
                
                {/* Technologies Field */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies
                  </label>
                  <input
                    type="text"
                    name="technologies"
                    value={(formData.technologies ?? []).join(", ")}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Comma-separated technologies (e.g., React, Node.js)"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Separate multiple technologies with commas
                  </p>
                </div>

                {renderFormField("imageUrl", "Image URL", "url")}
                {renderFormField("demoUrl", "Demo URL", "url")}
                {renderFormField("githubUrl", "GitHub URL", "url")}

                <div className="pt-4 flex space-x-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 py-2 rounded-md text-white ${
                      isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {editingId ? "Updating..." : "Creating..."}
                      </span>
                    ) : editingId ? "Update Case Study" : "Create Case Study"}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          ) : (
            // Manage Tab
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Manage Case Studies</h2>
              
              {/* Search Bar */}
              <div className="relative max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search case studies..."
                />
              </div>

              {/* Case Studies List */}
              {caseStudies.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-lg">No case studies found</p>
                  <p className="text-sm mt-2">
                    {searchTerm ? "Try a different search term" : "Create your first case study"}
                  </p>
                  {!searchTerm && (
                    <button
                      onClick={() => setActiveTab("create")}
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Create Case Study
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {caseStudies.map((caseStudy) => (
                    <div
                      key={caseStudy._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        {/* Case Study Info */}
                        <div className="flex items-start space-x-4 flex-grow">
                          {caseStudy.imageUrl && (
                            <div className="w-24 h-16 flex-shrink-0 relative">
                              <Image
                                src={caseStudy.imageUrl}
                                alt={caseStudy.title}
                                fill
                                className="object-cover rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex-grow">
                            <h3 className="font-medium">{caseStudy.title}</h3>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {caseStudy.technologies?.slice(0, 3).map((tech, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                                >
                                  {tech}
                                </span>
                              ))}
                              {caseStudy.technologies && caseStudy.technologies.length > 3 && (
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                  +{caseStudy.technologies.length - 3} more
                                </span>
                              )}
                            </div>
                            {caseStudy.createdAt && (
                              <p className="text-xs text-gray-500 mt-2">
                                Created: {formatDate(caseStudy.createdAt)}
                                {caseStudy.updatedAt && caseStudy.updatedAt !== caseStudy.createdAt && (
                                  <span> • Updated: {formatDate(caseStudy.updatedAt)}</span>
                                )}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 justify-end md:justify-normal">
                          <button
                            onClick={() => caseStudy._id && handleEdit(caseStudy)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                            Edit
                          </button>
                          <button
                            onClick={() => caseStudy._id && handleDelete(caseStudy._id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none transition-colors flex items-center"
                          >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;