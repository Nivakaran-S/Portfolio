import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Project {
  _id?: string;
  title: string;
  description: string;
  category: string;
  demoLink: string;
  githubLink: string;
  programmingLanguages: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectCategory {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

const Rooms = () => {
  const router = useRouter();
  
  // State for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [demoLink, setDemoLink] = useState<string>("");
  const [githubLink, setGithubLink] = useState<string>("");
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("");
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // State for categories
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  
  // UI state
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "categories">("create");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch projects
        const projectsResponse = await axios.get('https://new-portfolio-backend-roan.vercel.app/project');
        setProjects(projectsResponse.data);
        console.log("Projects fetched:", projectsResponse.data);
        
        // Fetch categories
        const categoriesResponse = await axios.get('https://new-portfolio-backend-roan.vercel.app/projectCategory');
        setProjectCategories(categoriesResponse.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Handle adding a programming language
  const handleAddProgrammingLanguage = () => {
    if (programmingLanguage.trim() !== "") {
      setProgrammingLanguages([...programmingLanguages, programmingLanguage.trim()]);
      setProgrammingLanguage("");
    }
  };

  // Handle removing a programming language
  const handleRemoveProgrammingLanguage = (index: number) => {
    const updatedLanguages = [...programmingLanguages];
    updatedLanguages.splice(index, 1);
    setProgrammingLanguages(updatedLanguages);
  };

  // Reset project form
  const resetProjectForm = () => {
    setTitle("");
    setDescription("");
    setCategory("");
    setDemoLink("");
    setGithubLink("");
    setProgrammingLanguages([]);
    setProgrammingLanguage("");
    setEditingId(null);
  };

  // Add or update project
  const handleSubmitProject = async () => {
    if (
      !title || !description || !category ||
      programmingLanguages.length === 0 ||
      !demoLink || !githubLink
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setIsLoading(true);
      
      const projectData = {
        title,
        description,
        category,
        demoLink,
        githubLink,
        programmingLanguages
      };

      if (editingId) {
        // Update existing project
        await axios.put(`https://new-portfolio-backend-roan.vercel.app/project/${editingId}`, projectData);
        setProjects(projects.map(proj => proj._id === editingId ? {...proj, ...projectData} : proj));
      } else {
        // Add new project
        const response = await axios.post('https://new-portfolio-backend-roan.vercel.app/project', projectData);
        setProjects([...projects, response.data]);
      }

      setSuccess(true);
      resetProjectForm();
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Error saving project:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit existing project
  const handleEditProject = (project: Project) => {
    if (!project._id) return;
    
    setTitle(project.title);
    setDescription(project.description);
    setCategory(project.category);
    setDemoLink(project.demoLink);
    setGithubLink(project.githubLink);
    setProgrammingLanguages(project.programmingLanguages);
    setEditingId(project._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete project
  const handleDeleteProject = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      try {
        await axios.delete(`https://new-portfolio-backend-roan.vercel.app/project/${id}`);
        setProjects(projects.filter(project => project._id !== id));
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  // Add new category
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const response = await axios.post('https://new-portfolio-backend-roan.vercel.app/projectCategory', {
        name: newCategoryName
      });
      
      setProjectCategories([...projectCategories, response.data]);
      setNewCategoryName("");
      setSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
      setTimeout(() => setProjectCategories([...projectCategories, response.data]), 3000)
      location.reload();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete category
  const handleDeleteCategory = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category? Projects using it will need to be updated.")) {
      try {
        await axios.delete(`https://new-portfolio-backend-roan.vercel.app/projectCategory/${id}`);
        setProjectCategories(projectCategories.filter(cat => cat._id !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="w-full text-black  bg-gray-100 p-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                      placeholder="Project description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category</option>
                      {projectCategories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Programming Languages *</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {programmingLanguages.map((lang, index) => (
                        <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                          <span className="text-sm">{lang}</span>
                          <button
                            onClick={() => handleRemoveProgrammingLanguage(index)}
                            className="ml-1 text-gray-500 hover:text-red-500"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        value={programmingLanguage}
                        onChange={(e) => setProgrammingLanguage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddProgrammingLanguage()}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add programming language"
                      />
                      <button
                        onClick={handleAddProgrammingLanguage}
                        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Demo Link *</label>
                    <input
                      type="url"
                      value={demoLink}
                      onChange={(e) => setDemoLink(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://example.com/demo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub Link *</label>
                    <input
                      type="url"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitProject}
                      disabled={isLoading}
                      className={`px-4 py-2 rounded-md text-white ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isLoading 
                        ? 'Saving...' 
                        : editingId 
                          ? 'Update Project' 
                          : 'Create Project'}
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
                      <h3 className="text-lg font-medium mb-2">{title}</h3>
                      {description && <p className="text-gray-600 mb-3">{description}</p>}
                      
                      {category && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Category:</p>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                            {projectCategories.find(c => c._id === category)?.name || category}
                          </span>
                        </div>
                      )}
                      
                      {programmingLanguages.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium mb-1">Technologies:</p>
                          <div className="flex flex-wrap gap-2">
                            {programmingLanguages.map((lang, index) => (
                              <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        {demoLink && (
                          <a 
                            href={demoLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View Demo →
                          </a>
                        )}
                        {githubLink && (
                          <a 
                            href={githubLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            View Code →
                          </a>
                        )}
                      </div>
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
              
              {projects.length === 0  ? (
                <p className="text-gray-500 italic">No projects yet. Create your first project.</p>
              ) : (
                <div className="space-y-4">
                  { projects && projects.map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="font-medium">{project.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {projectCategories.find(c => c._id === project.category)?.name || project.category}
                            </span>
                            {project.programmingLanguages.slice(0, 3).map((lang, index) => (
                              <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                {lang}
                              </span>
                            ))}
                            {project.programmingLanguages.length > 3 && (
                              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                                +{project.programmingLanguages.length - 3} more
                              </span>
                            )}
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

              {/* Add Category Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">Add New Category</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                    <input
                      type="text"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category name"
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className={`px-4 py-2 rounded-md text-white ${!newCategoryName.trim() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                  >
                    Add Category
                  </button>
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
                        <span className="text-sm font-medium">{category.name}</span>
                        <button
                          onClick={() => category._id && handleDeleteCategory(category._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Delete
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
            {editingId ? 'Project updated successfully!' : activeTab === 'categories' ? 'Category added successfully!' : 'Project created successfully!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default Rooms;