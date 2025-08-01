import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

interface MiniProject {
  _id?: string; // Made optional to fix TypeScript error
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  miniProjectCategory: string;
  demoUrl: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MiniProjectCategory {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

const MiniProjects: React.FC = () => {
  // Project states
  const [projects, setProjects] = useState<MiniProject[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [projectSuccess, setProjectSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Category states
  const [projectCategories, setProjectCategories] = useState<MiniProjectCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");

  // UI states
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "categories">("create");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  // Fetch initial data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setError(null);
        const response = await axios.get<MiniProject[]>(`${API_BASE_URL}/miniProjects`, { withCredentials: true });
        setProjects(response.data);
      } catch (err: unknown) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects. Please try again.");
      }
    };

    const fetchCategories = async () => {
      try {
        setError(null);
        const response = await axios.get<MiniProjectCategory[]>(`${API_BASE_URL}/miniProjectCategory`, {
          withCredentials: true,
        });
        setProjectCategories(response.data);
      } catch (err: unknown) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories. Please try again.");
      }
    };

    fetchProjects();
    fetchCategories();
  }, []);

  // Handle category creation
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      setError("Category title is required");
      return;
    }

    try {
      setError(null);
      const response = await axios.post<MiniProjectCategory>(
        `${API_BASE_URL}/miniProjectCategory`,
        { title: newCategoryTitle },
        { withCredentials: true }
      );

      setProjectCategories((prev) => [...prev, response.data]);
      setNewCategoryTitle("");
    } catch (err: unknown) {
      console.error("Error adding category:", err);
      setError("Failed to add category. Please try again.");
    }
  };

  // Handle project submission
  const handleSubmitProject = async () => {
    if (!projectTitle || !projectDescription || !imageUrl || !githubUrl || !projectCategory || !demoUrl) {
      setError(
        "Please fill all required fields: Title, Description, Image URL, GitHub URL, Category, Demo URL"
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload: MiniProject = {
        title: projectTitle,
        description: projectDescription,
        imageUrl,
        githubUrl,
        miniProjectCategory: projectCategory,
        demoUrl,
      };

      let response: AxiosResponse<MiniProject, any>;
      if (editingProjectId) {
        response = await axios.put<MiniProject>(
          `${API_BASE_URL}/miniProjects/${editingProjectId}`,
          payload,
          { withCredentials: true }
        );
        setProjects(projects.map((p) => (p._id === editingProjectId ? response.data : p)));
      } else {
        response = await axios.post<MiniProject>(`${API_BASE_URL}/miniProjects`, payload, { withCredentials: true });
        setProjects([...projects, response.data]);
      }

      setProjectSuccess(true);
      resetProjectForm();
      setTimeout(() => setProjectSuccess(false), 3000);
    } catch (err: unknown) {
      console.error("Error submitting project:", err);
      setError("Failed to submit project. Ensure all fields are valid and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset project form
  const resetProjectForm = () => {
    setProjectTitle("");
    setProjectDescription("");
    setGithubUrl("");
    setDemoUrl("");
    setImageUrl("");
    setProjectCategory("");
    setEditingProjectId(null);
    setError(null);
  };

  // Edit existing project
  const handleEditProject = (project: MiniProject) => {
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setGithubUrl(project.githubUrl);
    setDemoUrl(project.demoUrl);
    setImageUrl(project.imageUrl);
    setProjectCategory(project.miniProjectCategory);
    setEditingProjectId(project._id || null);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;

    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/miniProjects/${id}`, { withCredentials: true });
      setProjects(projects.filter((project) => project._id !== id));
    } catch (err: unknown) {
      console.error("Error deleting project:", err);
      setError("Failed to delete project. Please try again.");
    }
  };

  // Handle category deletion
  const handleDeleteCategories = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category? Projects using it will need to be updated.")) {
      return;
    }

    try {
      setError(null);
      await axios.delete(`${API_BASE_URL}/miniProjectCategory/${id}`, { withCredentials: true });
      setProjectCategories(projectCategories.filter((cat) => cat._id !== id));
      setSelectedCategories((prev) => prev.filter((catId) => catId !== id));
    } catch (err: unknown) {
      console.error("Error deleting category:", err);
      setError("Failed to delete category. Please try again.");
    }
  };

  // Toggle category selection
  const toggleCategorySelection = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  // Format date for display
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
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("create");
              resetProjectForm();
            }}
          >
            {editingProjectId ? "Edit Project" : "Create Project"}
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Projects
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "categories" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Manage Categories
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
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

          {activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Form */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingProjectId ? "Edit Project" : "Create New Project"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/project-image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProjectTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={projectCategory}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setProjectCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {projectCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL *</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setGithubUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/your-username/project-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL *</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDemoUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://your-project-demo.example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={projectDescription}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProjectDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                      placeholder="Describe your project, its features, and purpose..."
                    />
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitProject}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${
                        isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting ? "Submitting..." : editingProjectId ? "Update Project" : "Add Project"}
                    </button>
                    {editingProjectId && (
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
                  {projectTitle && imageUrl ? (
                    <>
                      <img
                        src={imageUrl}
                        alt={projectTitle}
                        className="w-full h-48 object-cover rounded-md mb-4"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                        }}
                      />
                      <h3 className="text-lg font-medium mb-2">{projectTitle}</h3>
                      {projectCategory && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-3">
                          {projectCategories.find((cat) => cat._id === projectCategory)?.title || "Unknown"}
                        </span>
                      )}
                      {projectDescription && <p className="text-sm text-gray-700 mb-4">{projectDescription}</p>}
                      <div className="flex space-x-2">
                        {githubUrl && (
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            GitHub
                          </a>
                        )}
                        {demoUrl && (
                          <a
                            href={demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Live Demo
                          </a>
                        )}
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-500 italic">Enter Title and Image URL to see a preview</p>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === "manage" ? (
            <div className="space-y-6 min-h-[70.5vh]">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              {projects.length === 0 ? (
                <p className="text-gray-500 italic">No projects yet. Create your first project.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div
                      key={project._id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-48 object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                          }}
                        />
                      )}
                      <div className="p-4">
                        <h3 className="font-medium">{project.title}</h3>
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mt-1 mb-2">
                          {projectCategories.find((cat) => cat._id === project.miniProjectCategory)?.title || "Unknown"}
                        </span>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {project.githubUrl && (
                              <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                GitHub
                              </a>
                            )}
                            {project.demoUrl && (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                              >
                                Demo
                              </a>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditProject(project)}
                              className="text-blue-600 hover:text-blue-800 text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteProject(project._id!)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{formatDate(project.createdAt)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 min-h-[70.5vh]">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              {/* Add Category Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">Add New Category</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewCategoryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category title"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      onClick={handleAddCategory}
                      disabled={!newCategoryTitle.trim()}
                      className={`px-4 py-2 rounded-md text-white ${
                        !newCategoryTitle.trim() ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
                      } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                    >
                      Add Category
                    </button>
                  </div>
                </div>
              </div>
              {/* Categories List */}
<div>
  <div className="flex justify-between items-center mb-3">
    <h3 className="font-medium">Existing Categories</h3>
    {selectedCategories.length > 0 && (
      <button
        onClick={async () => {
          for (const id of selectedCategories) {
            await handleDeleteCategories(id);
          }
        }}
        className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
      >
        Delete Selected
      </button>
    )}
  </div>

  {projectCategories.length === 0 ? (
    <p className="text-gray-500 italic">
      No categories yet. Add your first category above.
    </p>
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
      {projectCategories.map((category) => {
        const key = category._id || `${category.title}-${category.createdAt}` || Math.random();
        return (
          <div
            key={key}
            onClick={() => toggleCategorySelection(category._id)}
            className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center ${
              selectedCategories.includes(category._id)
                ? "ring-2 ring-blue-500 bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <span className="text-sm font-medium text-center">{category.title}</span>
            <p className="text-xs text-gray-500 mt-1">{formatDate(category.createdAt)}</p>
          </div>
        );
      })}
    </div>
  )}


              </div>
            </div>
          )}
        </div>

        {/* Success Notification */}
        {projectSuccess && (
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
              {editingProjectId ? "Project updated successfully!" : "Project added successfully!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniProjects;