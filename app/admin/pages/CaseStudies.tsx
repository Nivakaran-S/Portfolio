import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface CaseStudy {
  _id?: string;
  title: string;
  description: string;
  client: string;
  industry: string;
  services: string[];
  challenge: string;
  solution: string;
  results: string;
  images: {
    imageUrl1: string;
    imageUrl2?: string;
    imageUrl3?: string;
  };
  demoUrl: string;
  githubUrl: string;
  createdTimestamp?: string;
  updatedTimestamp?: string;
}

const CaseStudies: React.FC = () => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [client, setClient] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [services, setServices] = useState<string>("");
  const [challenge, setChallenge] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [results, setResults] = useState<string>("");
  const [imageUrl1, setImageUrl1] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");
  const [imageUrl3, setImageUrl3] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get<CaseStudy[]>(`${API_BASE_URL}/caseStudies`, { withCredentials: true });
        setCaseStudies(response.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error";
        console.error("Error fetching case studies:", err);
        setError("Failed to load case studies. Please try again or refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let delayDebounceFn: NodeJS.Timeout;
    if (searchTerm) {
      delayDebounceFn = setTimeout(() => {
        searchCaseStudies(searchTerm);
      }, 500);
    } else {
      fetchCaseStudies();
    }
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  const fetchCaseStudies = async () => {
    try {
      setError(null);
      const response = await axios.get<CaseStudy[]>(`${API_BASE_URL}/caseStudies`, { withCredentials: true });
      setCaseStudies(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error fetching case studies:", err);
      setError("Failed to load case studies. Please try again.");
    }
  };

  const searchCaseStudies = async (query: string) => {
    try {
      setError(null);
      const response = await axios.get<CaseStudy[]>(`${API_BASE_URL}/caseStudies/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setCaseStudies(response.data);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error searching case studies:", err);
      setError("No case studies found matching your search. Please try a different query.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setClient("");
    setIndustry("");
    setServices("");
    setChallenge("");
    setSolution("");
    setResults("");
    setImageUrl1("");
    setImageUrl2("");
    setImageUrl3("");
    setDemoUrl("");
    setGithubUrl("");
    setEditingId(null);
  };

  const handleSubmitCaseStudy = async () => {
    const servicesArray = services.split(",").map((s) => s.trim()).filter((s) => s);
    if (
      !title ||
      !description ||
      !client ||
      !industry ||
      !servicesArray.length ||
      !challenge ||
      !solution ||
      !results ||
      !imageUrl1 ||
      !demoUrl ||
      !githubUrl
    ) {
      setError(
        "Please fill all required fields: Title, Description, Client, Industry, Services, Challenge, Solution, Results, Image URL 1, Demo URL, GitHub URL"
      );
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const payload: CaseStudy = {
        title,
        description,
        client,
        industry,
        services: servicesArray,
        challenge,
        solution,
        results,
        images: {
          imageUrl1,
          imageUrl2: imageUrl2 || undefined,
          imageUrl3: imageUrl3 || undefined,
        },
        demoUrl,
        githubUrl,
      };

      let response: AxiosResponse<CaseStudy, any>;
      if (editingId) {
        response = await axios.put<CaseStudy>(`${API_BASE_URL}/caseStudies/${editingId}`, payload, { withCredentials: true });
        setCaseStudies(caseStudies.map((cs) => (cs._id === editingId ? response.data : cs)));
      } else {
        response = await axios.post<CaseStudy>(`${API_BASE_URL}/caseStudies`, payload, { withCredentials: true });
        setCaseStudies([...caseStudies, response.data]);
      }

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error submitting case study:", err);
      setError("Failed to submit case study. Ensure all required fields are valid and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCaseStudy = (caseStudy: CaseStudy) => {
    if (!caseStudy._id) return;

    setTitle(caseStudy.title);
    setDescription(caseStudy.description);
    setClient(caseStudy.client);
    setIndustry(caseStudy.industry);
    setServices(caseStudy.services.join(", "));
    setChallenge(caseStudy.challenge);
    setSolution(caseStudy.solution);
    setResults(caseStudy.results);
    setImageUrl1(caseStudy.images.imageUrl1);
    setImageUrl2(caseStudy.images.imageUrl2 || "");
    setImageUrl3(caseStudy.images.imageUrl3 || "");
    setDemoUrl(caseStudy.demoUrl);
    setGithubUrl(caseStudy.githubUrl);
    setEditingId(caseStudy._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  const handleDeleteCaseStudy = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;

    try {
      await axios.delete(`${API_BASE_URL}/caseStudies/${id}`, { withCredentials: true });
      setCaseStudies(caseStudies.filter((cs) => cs._id !== id));
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      console.error("Error deleting case study:", err);
      setError("Failed to delete case study. Please try again.");
    }
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="w-full text-black bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("create");
              resetForm();
            }}
          >
            {editingId ? "Edit Case Study" : "Create Case Study"}
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Case Studies
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-red-500 text-center p-4 bg-red-100 rounded-lg">
                {error}
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Refresh Page
                </button>
              </div>
            </div>
          ) : activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingId ? "Edit Case Study" : "Create New Case Study"}
                </h2>
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{error}</p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Case study title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Case study description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setClient(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Client or company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry *</label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIndustry(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Industry (e.g., Healthcare, Finance)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Services *</label>
                    <input
                      type="text"
                      value={services}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setServices(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma-separated services (e.g., Web Development, API Integration)"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 1 *</label>
                    <input
                      type="url"
                      value={imageUrl1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image1.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 2</label>
                    <input
                      type="url"
                      value={imageUrl2}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image2.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 3</label>
                    <input
                      type="url"
                      value={imageUrl3}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl3(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image3.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL *</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/demo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL *</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Challenge *</label>
                    <textarea
                      value={challenge}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setChallenge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="What problem was the client facing?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                    <textarea
                      value={solution}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSolution(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="How did you solve the problem?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Results *</label>
                    <textarea
                      value={results}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setResults(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Quantifiable outcomes and benefits"
                    />
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitCaseStudy}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${
                        isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting ? "Submitting..." : editingId ? "Update Case Study" : "Create Case Study"}
                    </button>
                    {editingId && (
                      <button
                        onClick={resetForm}
                        className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {title && imageUrl1 ? (
                    <>
                      <img
                        src={imageUrl1}
                        alt={title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                      <h3 className="text-lg font-medium mb-2">{title}</h3>
                      {client && (
                        <p className="text-sm text-gray-600 mb-1">
                          <strong>Client:</strong> {client}
                        </p>
                      )}
                      {industry && (
                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Industry:</strong> {industry}
                        </p>
                      )}
                      {services && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Services:</p>
                          <div className="flex flex-wrap gap-2">
                            {services.split(",").map((service, index) => (
                              <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {service.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {description && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Description:</p>
                          <p className="text-sm text-gray-600">{description}</p>
                        </div>
                      )}
                      {challenge && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Challenge:</p>
                          <p className="text-sm text-gray-600">{challenge}</p>
                        </div>
                      )}
                      {solution && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Solution:</p>
                          <p className="text-sm text-gray-600">{solution}</p>
                        </div>
                      )}
                      {results && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Results:</p>
                          <p className="text-sm text-gray-600">{results}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic">Enter Title and Image URL 1 to see a preview</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6 min-h-[72vh]">
              <h2 className="text-xl font-semibold">Manage Case Studies</h2>
              <div className="mb-6">
                <div className="relative">
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
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search case studies..."
                  />
                </div>
              </div>
              {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}
              {caseStudies.length === 0 ? (
                <p className="text-gray-500 italic">No case studies found. Create your first case study.</p>
              ) : (
                <div className="space-y-4">
                  {caseStudies.map((caseStudy) => (
                    <div
                      key={caseStudy._id}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          {caseStudy.images.imageUrl1 && (
                            <img
                              src={caseStudy.images.imageUrl1}
                              alt={caseStudy.title}
                              className="w-24 h-16 object-cover rounded-md"
                              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/96x64?text=Image+Not+Found";
                              }}
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{caseStudy.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{caseStudy.description}</p>
                            <p className="text-sm text-gray-600">{caseStudy.client}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                {caseStudy.industry}
                              </span>
                              {caseStudy.services.slice(0, 2).map((service, index) => (
                                <span
                                  key={index}
                                  className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded"
                                >
                                  {service}
                                </span>
                              ))}
                              {caseStudy.services.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                  +{caseStudy.services.length - 2} more
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{formatDate(caseStudy.createdTimestamp)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3 md:mt-0">
                          <button
                            onClick={() => handleEditCaseStudy(caseStudy)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => caseStudy._id && handleDeleteCaseStudy(caseStudy._id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
                          >
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

        {success && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {editingId ? "Case study updated successfully!" : "Case study created successfully!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseStudies;