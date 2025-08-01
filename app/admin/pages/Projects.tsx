import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";

interface Project {
  _id?: string;
  title: string;
  projectOverview: string;
  images?: {
    imageUrl1?: string;
    imageUrl2?: string;
    imageUrl3?: string;
    imageUrl4?: string;
    imageUrl5?: string;
    imageUrl6?: string;
  };
  projectCategory: string;
  problem: string;
  solution: string;
  techStack: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectCategory {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

const Projects = () => {
  const router = useRouter();

  // State for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState<string>("");
  const [projectOverview, setProjectOverview] = useState<string>("");
  const [imageUrl1, setImageUrl1] = useState<string>("");
  const [imageUrl2, setImageUrl2] = useState<string>("");
  const [imageUrl3, setImageUrl3] = useState<string>("");
  const [imageUrl4, setImageUrl4] = useState<string>("");
  const [imageUrl5, setImageUrl5] = useState<string>("");
  const [imageUrl6, setImageUrl6] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [problem, setProblem] = useState<string>("");
  const [solution, setSolution] = useState<string>("");
  const [techStack, setTechStack] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectError, setProjectError] = useState<string>("");

  // State for categories
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryTitle, setEditingCategoryTitle] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [categorySuccess, setCategorySuccess] = useState<boolean>(false);

  // UI state
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "categories">("create");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Base URL for API requests
  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setProjectError("");
        setCategoryError("");

        // Fetch projects
        const projectsResponse = await axios.get(`${API_BASE_URL}/projects`, { withCredentials: true });
        setProjects(projectsResponse.data);
        console.log("Projects fetched:", projectsResponse.data);

        // Fetch categories
        const categoriesResponse = await axios.get(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
        setProjectCategories(categoriesResponse.data);
        console.log("Categories fetched:", categoriesResponse.data);
      } catch (error: any) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
        setProjectError("Failed to load projects. Please try again.");
        setCategoryError("Failed to load categories. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        if (activeTab === "manage") {
          searchProjects(searchTerm);
        } else if (activeTab === "categories") {
          searchCategories(searchTerm);
        }
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      if (activeTab === "manage") {
        fetchProjects();
      } else if (activeTab === "categories") {
        fetchCategories();
      }
    }
  }, [searchTerm, activeTab]);

  // Fetch projects
  const fetchProjects = async () => {
    try {
      setProjectError("");
      const response = await axios.get(`${API_BASE_URL}/projects`, { withCredentials: true });
      setProjects(response.data);
      console.log("Fetched projects:", response.data);
    } catch (error: any) {
      console.error("Error fetching projects:", error.response ? error.response.data : error.message);
      setProjectError("Failed to load projects. Please try again.");
    }
  };

  // Search projects
  const searchProjects = async (query: string) => {
    try {
      setProjectError("");
      const response = await axios.get(`${API_BASE_URL}/projects/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setProjects(response.data);
      console.log("Searched projects:", response.data);
    } catch (error: any) {
      console.error("Error searching projects:", error.response ? error.response.data : error.message);
      setProjectError("Failed to search projects. Please try again.");
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setCategoryError("");
      const response = await axios.get(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
      setProjectCategories(response.data);
      console.log("Fetched categories:", response.data);
    } catch (error: any) {
      console.error("Error fetching categories:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to load categories. Please try again.");
    }
  };

  // Search categories
  const searchCategories = async (query: string) => {
    try {
      setCategoryError("");
      const response = await axios.get(`${API_BASE_URL}/projectCategory/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setProjectCategories(response.data);
      console.log("Searched categories:", response.data);
    } catch (error: any) {
      console.error("Error searching categories:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to search categories. Please try again.");
    }
  };

  // Reset project form
  const resetProjectForm = () => {
    setTitle("");
    setProjectOverview("");
    setImageUrl1("");
    setImageUrl2("");
    setImageUrl3("");
    setImageUrl4("");
    setImageUrl5("");
    setImageUrl6("");
    setProjectCategory("");
    setProblem("");
    setSolution("");
    setTechStack("");
    setEditingId(null);
  };

  // Add or update project
  const handleSubmitProject = async () => {
    if (!title || !projectOverview || !imageUrl1 || !projectCategory || !problem || !solution || !techStack) {
      alert("Please fill all required fields (title, overview, image URL 1, category, problem, solution, tech stack)");
      return;
    }

    try {
      setIsLoading(true);
      setProjectError("");

      const projectData = {
        title,
        projectOverview,
        images: {
          imageUrl1,
          imageUrl2: imageUrl2 || undefined,
          imageUrl3: imageUrl3 || undefined,
          imageUrl4: imageUrl4 || undefined,
          imageUrl5: imageUrl5 || undefined,
          imageUrl6: imageUrl6 || undefined,
        },
        projectCategory,
        problem,
        solution,
        techStack,
      };

      let response: AxiosResponse<any, any>;
      if (editingId) {
        // Update existing project
        response = await axios.put(`${API_BASE_URL}/projects/${editingId}`, projectData, { withCredentials: true });
        setProjects(projects.map(proj => proj._id === editingId ? response.data : proj));
      } else {
        // Add new project
        response = await axios.post(`${API_BASE_URL}/projects`, projectData, { withCredentials: true });
        setProjects([...projects, { ...projectData, _id: response.data.id, createdAt: new Date().toISOString() }]);
      }

      setSuccess(true);
      resetProjectForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error saving project:", error.response ? error.response.data : error.message);
      setProjectError("Failed to save project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Edit existing project
  const handleEditProject = (project: Project) => {
    if (!project._id) return;

    setTitle(project.title);
    setProjectOverview(project.projectOverview);
    setImageUrl1(project.images?.imageUrl1 || "");
    setImageUrl2(project.images?.imageUrl2 || "");
    setImageUrl3(project.images?.imageUrl3 || "");
    setImageUrl4(project.images?.imageUrl4 || "");
    setImageUrl5(project.images?.imageUrl5 || "");
    setImageUrl6(project.images?.imageUrl6 || "");
    setProjectCategory(project.projectCategory);
    setProblem(project.problem);
    setSolution(project.solution);
    setTechStack(project.techStack);
    setEditingId(project._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`, { withCredentials: true });
        setProjects(projects.filter(project => project._id !== id));
      } catch (error: any) {
        console.error("Error deleting project:", error.response ? error.response.data : error.message);
        setProjectError("Failed to delete project. Please try again.");
      }
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/projectCategory`,
        { title: newCategoryTitle },
        { withCredentials: true }
      );
      setProjectCategories([...projectCategories, response.data]);
      setNewCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      console.error("Error adding category:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to add category. Please try again.");
    }
  };

  // Update category
  const handleUpdateCategory = async () => {
    if (!editingCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/projectCategory/${editingCategoryId}`,
        { title: editingCategoryTitle },
        { withCredentials: true }
      );
      setProjectCategories(projectCategories.map(cat => cat._id === editingCategoryId ? response.data : cat));
      setEditingCategoryId(null);
      setEditingCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      console.error("Error updating category:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to update category. Please try again.");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category? Projects using it will need to be updated.")) {
      try {
        await axios.delete(`${API_BASE_URL}/projectCategory/${id}`, { withCredentials: true });
        setProjectCategories(projectCategories.filter(cat => cat._id !== id));
      } catch (error: any) {
        console.error("Error deleting category:", error.response ? error.response.data : error.message);
        setCategoryError("Failed to delete category. Please try again.");
      }
    }
  };

  // Cancel category edit
  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryTitle("");
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full text-black bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "cursor-pointer text-gray-600"}`}
            onClick={() => {
              setActiveTab("create");
              resetProjectForm();
            }}
          >
            {editingId ? "Edit Project" : "Create Project"}
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Projects
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "categories" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"}`}
            onClick={() => setActiveTab("categories")}
          >
            Manage Categories
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Form */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingId ? "Edit Project" : "Create New Project"}
                </h2>
                {projectError && (
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">{projectError}</p>
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
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Overview *</label>
                    <textarea
                      value={projectOverview}
                      onChange={(e) => setProjectOverview(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Project overview"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 1 *</label>
                    <input
                      type="url"
                      value={imageUrl1}
                      onChange={(e) => setImageUrl1(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image1.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 2</label>
                    <input
                      type="url"
                      value={imageUrl2}
                      onChange={(e) => setImageUrl2(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image2.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 3</label>
                    <input
                      type="url"
                      value={imageUrl3}
                      onChange={(e) => setImageUrl3(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image3.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 4</label>
                    <input
                      type="url"
                      value={imageUrl4}
                      onChange={(e) => setImageUrl4(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image4.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 5</label>
                    <input
                      type="url"
                      value={imageUrl5}
                      onChange={(e) => setImageUrl5(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image5.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL 6</label>
                    <input
                      type="url"
                      value={imageUrl6}
                      onChange={(e) => setImageUrl6(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/image6.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {projectCategories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Problem *</label>
                    <textarea
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Describe the problem"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                    <textarea
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Describe the solution"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tech Stack *</label>
                    <input
                      type="text"
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter tech stack (e.g., React, Node.js)"
                    />
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitProject}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isLoading ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
                    </button>
                    {editingId && (
                      <button
                        onClick={resetProjectForm}
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
                      {imageUrl1 && (
                        <Image
                          src={imageUrl1}
                          alt="Project preview"
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="text-lg font-medium mb-2">{title}</h3>
                      {projectCategory && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Category:</p>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {projectCategories.find(c => c._id === projectCategory)?.title || projectCategory}
                          </span>
                        </div>
                      )}
                      {projectOverview && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Overview:</p>
                          <p className="text-sm text-gray-600">{projectOverview}</p>
                        </div>
                      )}
                      {problem && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Problem:</p>
                          <p className="text-sm text-gray-600">{problem}</p>
                        </div>
                      )}
                      {solution && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Solution:</p>
                          <p className="text-sm text-gray-600">{solution}</p>
                        </div>
                      )}
                      {techStack && (
                        <div>
                          <p className="text-sm font-medium mb-1">Tech Stack:</p>
                          <p className="text-sm text-gray-600">{techStack}</p>
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
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search projects..."
                  />
                </div>
              </div>
              {projectError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{projectError}</p>
                    </div>
                  </div>
                </div>
              )}
              {projects.length === 0 ? (
                <p className="text-gray-500 italic">No projects yet. Create your first project.</p>
              ) : (
                <div className="space-y-4">
                  {projects.map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          {project.images?.imageUrl1 && (
                            <Image
                              src={project.images.imageUrl1}
                              alt={project.title}
                              width={96}
                              height={64}
                              className="w-24 h-16 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{project.title}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2">{project.projectOverview}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                                {projectCategories.find(c => c._id === project.projectCategory)?.title || project.projectCategory}
                              </span>
                              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                {project.techStack}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{formatDate(project.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3 md:mt-0">
                          <button
                            onClick={() => project._id && handleEditProject(project)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => project._id && handleDeleteProject(project._id)}
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
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              <div className="mb-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search categories..."
                  />
                </div>
              </div>
              {categoryError && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{categoryError}</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Add/Edit Category Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">{editingCategoryId ? "Edit Category" : "Add New Category"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                    <input
                      type="text"
                      value={editingCategoryId ? editingCategoryTitle : newCategoryTitle}
                      onChange={(e) => editingCategoryId ? setEditingCategoryTitle(e.target.value) : setNewCategoryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category title"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                    disabled={!(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim())}
                    className={`px-4 py-2 rounded-md text-white ${!(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim()) ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                  >
                    {editingCategoryId ? "Update Category" : "Add Category"}
                  </button>
                  {editingCategoryId && (
                    <button
                      onClick={cancelEditCategory}
                      className="px-4 py-2 rounded-md text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
              {/* Categories List */}
              <div>
                <h3 className="font-medium mb-3">Existing Categories</h3>
                {projectCategories.length === 0 ? (
                  <p className="text-gray-500 italic">No categories yet. Add your first category above.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {projectCategories.map((category) => (
                      <div
                        key={category._id}
                        className="p-3 rounded-lg border border-gray-200 bg-white flex justify-between items-center"
                      >
                        <span className="text-sm font-medium">{category.title}</span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setEditingCategoryId(category._id);
                              setEditingCategoryTitle(category.title);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => category._id && handleDeleteCategory(category._id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Success Notification */}
        {(success || categorySuccess) && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {success
                ? editingId
                  ? 'Project updated successfully!'
                  : 'Project created successfully!'
                : 'Category operation successful!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;