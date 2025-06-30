import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface CaseStudy {
  _id: string;
  title: string;
  client: string;
  challenge: string;
  solution: string;
  results: string;
  industry: string;
  duration: string;
  teamSize: string;
  programmingLanguages: string[];
  testimonial?: string;
  testimonialAuthor?: string;
  imageLink: string;
  demoLink: string;
  githubLink: string;
}

interface CaseStudyCategory {
  _id: string;
  name: string;
}

const CaseStudies = () => {
  // Case studies states
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [challenge, setChallenge] = useState("");
  const [solution, setSolution] = useState("");
  const [results, setResults] = useState("");
  const [industry, setIndustry] = useState("");
  const [duration, setDuration] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [testimonial, setTestimonial] = useState("");
  const [testimonialAuthor, setTestimonialAuthor] = useState("");
  const [success, setSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Category states
  const [categories, setCategories] = useState<CaseStudyCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  // UI states
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "categories">("create");

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const [categoriesResponse, caseStudiesResponse] = await Promise.all([
          axios.get("https://new-portfolio-backend-roan.vercel.app/industry", { withCredentials: true }),
          axios.get("https://new-portfolio-backend-roan.vercel.app/caseStudies", { withCredentials: true })
        ]);

        setCategories(categoriesResponse.data);
        setCaseStudies(caseStudiesResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please refresh the page.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle category creation
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
      const response = await axios.post(
        "https://new-portfolio-backend-roan.vercel.app/industry",
        { name: newCategoryTitle },
        { withCredentials: true }
      );

      setCategories(prev => [...prev, response.data]);
      setNewCategoryTitle("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again.");
    }
  };

  // Handle case study submission
  const handleSubmitCaseStudy = async () => {
    if (!title || !client || !challenge || !solution || !results) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title,
        client,
        challenge,
        solution,
        results,
        industry,
        duration,
        teamSize,
        demoLink: demoLink || undefined,
        githubLink: githubLink || undefined,
        programmingLanguages: technologies.split(',').map(tech => tech.trim()).filter(tech => tech),
        testimonial: testimonial || undefined,
        testimonialAuthor: testimonialAuthor || undefined,
        imageLink: imageLink || undefined
      };

      let response;
      if (editingId) {
        response = await axios.put(
          `https://new-portfolio-backend-roan.vercel.app/caseStudies/${editingId}`,
          payload,
          { withCredentials: true }
        );
      } else {
        response = await axios.post(
          "https://new-portfolio-backend-roan.vercel.app/caseStudies",
          payload,
          { withCredentials: true }
        );
      }

      const updatedCaseStudy: CaseStudy = {
        _id: editingId || response.data._id,
        title: payload.title,
        client: payload.client,
        challenge: payload.challenge,
        solution: payload.solution,
        results: payload.results,
        industry: payload.industry,
        duration: payload.duration,
        teamSize: payload.teamSize,
        programmingLanguages: payload.programmingLanguages,
        testimonial: payload.testimonial,
        testimonialAuthor: payload.testimonialAuthor,
        imageLink: payload.imageLink ?? "",
        demoLink: payload.demoLink ?? "",
        githubLink: payload.githubLink ?? ""
      };

      setCaseStudies(prev =>
        editingId
          ? prev.map(cs => cs._id === editingId ? updatedCaseStudy : cs)
          : [...prev, updatedCaseStudy]
      );

      setSuccess(true);
      resetForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting case study:", error);
      alert("Failed to submit case study. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle("");
    setClient("");
    setChallenge("");
    setSolution("");
    setResults("");
    setIndustry("");
    setDuration("");
    setTeamSize("");
    setDemoLink("");
    setGithubLink("");
    setImageLink("");
    setTechnologies("");
    setTestimonial("");
    setTestimonialAuthor("");
    setEditingId(null);
  };

  // Edit existing case study
  const handleEditCaseStudy = (caseStudy: CaseStudy) => {
    setTitle(caseStudy.title);
    setClient(caseStudy.client);
    setChallenge(caseStudy.challenge);
    setSolution(caseStudy.solution);
    setResults(caseStudy.results);
    setIndustry(caseStudy.industry);
    setDuration(caseStudy.duration);
    setTeamSize(caseStudy.teamSize);
    setDemoLink(caseStudy.demoLink);
    setGithubLink(caseStudy.githubLink);
    setImageLink(caseStudy.imageLink);
    setTechnologies(caseStudy.programmingLanguages.join(', '));
    setTestimonial(caseStudy.testimonial || "");
    setTestimonialAuthor(caseStudy.testimonialAuthor || "");
    setEditingId(caseStudy._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete case study
  const handleDeleteCaseStudy = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this case study?")) return;

    try {
      await axios.delete(
        `https://new-portfolio-backend-roan.vercel.app/caseStudies/${id}`,
        { withCredentials: true }
      );
      setCaseStudies(prev => prev.filter(cs => cs._id !== id));
    } catch (error) {
      console.error("Error deleting case study:", error);
      alert("Failed to delete case study. Please try again.");
    }
  };

  // Handle category deletion
  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `https://new-portfolio-backend-roan.vercel.app/industry/${id}`,
        { withCredentials: true }
      );
      setCategories(prev => prev.filter(cat => cat._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
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
    );
  }

  return (
    <div className="w-full text-black bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => {
              setActiveTab("create");
              resetForm();
            }}
          >
            Create Case Study
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Case Studies
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "categories" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"}`}
            onClick={() => setActiveTab("categories")}
          >
            Manage Industries
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Case Study Form */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingId ? "Edit Case Study" : "Create New Case Study"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Case study title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Name *</label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Client or company name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                      <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select industry</option>
                        {categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Project Duration</label>
                      <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 6 months"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
                      <input
                        type="text"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. 5 people"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
                      <input
                        type="text"
                        value={demoLink}
                        onChange={(e) => setDemoLink(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. www.example.com/demo"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image Link</label>
                      <input
                        type="text"
                        value={imageLink}
                        onChange={(e) => setImageLink(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. www.example.com/image.jpg"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link</label>
                      <input
                        type="text"
                        value={githubLink}
                        onChange={(e) => setGithubLink(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g. github.com/username/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technologies Used</label>
                    <input
                      type="text"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma separated list (e.g. React, Node.js, MongoDB)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">The Challenge *</label>
                    <textarea
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="What problem was the client facing?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Our Solution *</label>
                    <textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="How did you solve the problem?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Results Achieved *</label>
                    <textarea
                      value={results}
                      onChange={(e) => setResults(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Quantifiable outcomes and benefits"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Client Testimonial (Optional)</label>
                    <textarea
                      value={testimonial}
                      onChange={(e) => setTestimonial(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="What did the client say about your work?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Testimonial Author (Optional)</label>
                    <input
                      type="text"
                      value={testimonialAuthor}
                      onChange={(e) => setTestimonialAuthor(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name and title of person giving testimonial"
                    />
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitCaseStudy}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting 
                        ? 'Submitting...' 
                        : editingId 
                          ? 'Update Case Study' 
                          : 'Publish Case Study'}
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

              {/* Preview Section */}
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {title ? (
                    <>
                      {imageLink && (
                        <img 
                          src={imageLink} 
                          alt={title}
                          className="w-full h-48 object-cover rounded-md mb-4"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                          }}
                        />
                      )}
                      <h3 className="text-lg font-medium mb-2">{title}</h3>
                      {client && <p className="text-gray-600 mb-1"><strong>Client:</strong> {client}</p>}
                      {industry && <p className="text-gray-600 mb-3"><strong>Industry:</strong> {industry}</p>}
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {duration && <p className="text-sm"><strong>Duration:</strong> {duration}</p>}
                        {teamSize && <p className="text-sm"><strong>Team:</strong> {teamSize}</p>}
                      </div>
                      
                      {technologies && (
                        <div className="mb-4">
                          <p className="text-sm font-medium mb-1">Technologies:</p>
                          <div className="flex flex-wrap gap-2">
                            {technologies.split(',').map((tech, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                {tech.trim()}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {challenge && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">The Challenge</h4>
                          <p className="text-sm">{challenge}</p>
                        </div>
                      )}
                      
                      {solution && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">Our Solution</h4>
                          <p className="text-sm">{solution}</p>
                        </div>
                      )}
                      
                      {results && (
                        <div className="mb-4">
                          <h4 className="font-medium mb-1">Results Achieved</h4>
                          <p className="text-sm">{results}</p>
                        </div>
                      )}
                      
                      {testimonial && (
                        <div className="bg-blue-50 p-3 rounded-md border-l-4 border-blue-500">
                          <p className="italic mb-1">"{testimonial}"</p>
                          {testimonialAuthor && <p className="text-sm font-medium">— {testimonialAuthor}</p>}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic">Start typing to see a preview</p>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === "manage" ? (
            <div className="space-y-6 min-h-[72vh]">
              <h2 className="text-xl font-semibold">Manage Case Studies</h2>
              
              {caseStudies.length === 0 ? (
                <p className="text-gray-500 italic">No case studies yet. Create your first case study.</p>
              ) : (
                <div className="space-y-4">
                  {caseStudies.map((caseStudy) => (
                    <div key={caseStudy._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          {caseStudy.imageLink && (
                            <img 
                              src={caseStudy.imageLink} 
                              alt={caseStudy.title} 
                              className="w-24 h-16 object-cover rounded-md"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://via.placeholder.com/96x64?text=Image+Not+Found";
                              }}
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{caseStudy.title}</h3>
                            <p className="text-sm text-gray-600">{caseStudy.client}</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                {caseStudy.industry}
                              </span>
                              {caseStudy.programmingLanguages.slice(0, 2).map((tech, index) => (
                                <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                  {tech}
                                </span>
                              ))}
                              {caseStudy.programmingLanguages.length > 2 && (
                                <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                  +{caseStudy.programmingLanguages.length - 2} more
                                </span>
                              )}
                            </div>
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
                            onClick={() => handleDeleteCaseStudy(caseStudy._id)}
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
          ) : (
            <div className="space-y-6 min-h-[72vh]">
              <h2 className="text-xl font-semibold">Manage Industries</h2>

              {/* Add Category Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">Add New Industry</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Industry Name *</label>
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter industry name"
                    />
                  </div>

                  <div className="flex items-end">
                    <button
                      onClick={handleAddCategory}
                      disabled={!newCategoryTitle.trim()}
                      className={`px-4 py-2 rounded-md text-white ${!newCategoryTitle.trim() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 w-full`}
                    >
                      Add Industry
                    </button>
                  </div>
                </div>
              </div>

              {/* Categories List */}
              <div>
                <h3 className="font-medium mb-3">Existing Industries</h3>

                {categories.length === 0 ? (
                  <p className="text-gray-500 italic">No industries yet. Add your first industry above.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {categories.map((category) => (
                      <div
                        key={category._id}
                        className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center"
                      >
                        <span className="text-sm font-medium">{category.name}</span>
                        <button
                          onClick={() => handleDeleteCategory(category._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Success Notification */}
      {success && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {editingId ? 'Case study updated successfully!' : 'Case study published successfully!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudies;