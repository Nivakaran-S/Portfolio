import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Project {
  _id: string;
  title: string;
  description: string;
  programmingLanguages: string[];
  category: string;
  githubLink?: string;
  demoLink?: string;
  imageLink?: string;
}

interface ProjectCategory {
    _id: number;
    name: string;
    
}

const MiniProjects = () => {
  // Project states
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectTitle, setProjectTitle] = useState<string>("");
  const [projectDescription, setProjectDescription] = useState<string>("");
  const [technologies, setTechnologies] = useState<string>("");
  const [projectCategory, setProjectCategory] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [demoUrl, setDemoUrl] = useState<string>("");
  const [projectImage, setProjectImage] = useState<File | null>(null);
  const [projectImagePreview, setProjectImagePreview] = useState<string | null>(null);
  const [projectSuccess, setProjectSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Category states
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [newCategoryIcon, setNewCategoryIcon] = useState<string>("");

  // UI states
  const [activeTab, setActiveTab] = useState<"create" | "manage" | "categories">("create");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const [projectImageLink, setProjectImageLink] = useState<string>("");

  // Fetch initial data (simulated)
  useEffect(() => {
  // Define fetch functions
  const fetchProjects = async () => {
    try {
      const response = await axios.get('https://new-portfolio-backend-roan.vercel.app/miniProject');
      setProjects(response.data);
      console.log("Projects fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      // Optional: set error state for UI feedback
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://new-portfolio-backend-roan.vercel.app/projectCategory');
      setProjectCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Optional: set error state for UI feedback
    }
  };

  // Execute both fetches
  fetchProjects();
  fetchCategories();
}, []);

 

  // Handle category creation
  const handleAddCategory = async () => {
  if (!newCategoryTitle.trim()) {
    alert("Please enter a category name");
    return;
  }

  try {
    // First send data to server
    const response = await axios.post(
      'https://new-portfolio-backend-roan.vercel.app/projectCategory', 
      {
        name: newCategoryTitle,
      },
      { withCredentials: true } // Include if auth is needed
    );

    // Then update local state with server response
    const newCategory: ProjectCategory = {
      _id: response.data._id, // Use server-generated ID
      name: newCategoryTitle,
      
    };

    setProjectCategories(prev => [...prev, newCategory]);
    setNewCategoryTitle("");
    setNewCategoryIcon("");
    
  } catch (error) {
    console.error("Error adding category:", error);
    alert("Failed to add category. Please try again.");
  }
};

  // Handle project submission
  const handleSubmitProject = async () => {
  // Validate required fields
  if (!projectTitle || !projectDescription || !projectCategory || !technologies || !demoUrl || !githubUrl) {
    alert("Please fill all required fields");
    return;
  }

  setIsSubmitting(true);

  try {
    // Make API request
    await axios.post(
      'https://new-portfolio-backend-roan.vercel.app/miniProject',
      {
        title: projectTitle,
        description: projectDescription,
        programmingLanguages: technologies.split(',')
          .map(tech => tech.trim())
          .filter(tech => tech),
        category: projectCategory,
        githubLink: githubUrl ,
        demoLink: demoUrl ,
        imageLink: projectImageLink 
      },
      { withCredentials: true }
    );

    // Only show success and reset if API call succeeds
    setProjectSuccess(true);
    resetProjectForm();

    // Hide success message after 3 seconds
    setTimeout(() => setProjectSuccess(false), 3000);

  } catch (error) {
    console.error("Error submitting project:", error);
    alert("Failed to submit project. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  // Reset project form
  const resetProjectForm = () => {
    setProjectTitle("");
    setProjectDescription("");
    setTechnologies("");
    setProjectCategory("");
    setGithubUrl("");
    setDemoUrl("");
    setProjectImage(null);
    setProjectImagePreview(null);
    setEditingProjectId(null);
    
  };

  // Edit existing project
  const handleEditProject = (project: Project) => {
    setProjectTitle(project.title);
    setProjectDescription(project.description);
    setTechnologies(project.programmingLanguages.join(', '));
    setProjectCategory(project.category);
    setGithubUrl(project.githubLink || "");
    setDemoUrl(project.demoLink || "");
    if (project.imageLink) setProjectImagePreview(project.imageLink);
    setEditingProjectId(project._id);

    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete project
  const handleDeleteProject = (id: string) => {
    try {
        axios.delete(`https://new-portfolio-backend-roan.vercel.app/miniProject/${id}`, { withCredentials: true })
            .then(() => {
            setProjects(prev => prev.filter(project => project._id !== id));
            alert("Project deleted successfully");
            });
    } catch (error) {
        console.error("Error deleting project:", error);
        alert("Failed to delete project. Please try again.");
    }
  };

  // Handle category deletion


    const handleDeleteCategories = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category? Projects using it will need to be updated.")) {
      try {
        await axios.delete(`https://new-portfolio-backend-roan.vercel.app/projectCategory/${id}`);
        setProjectCategories(projectCategories.filter(cat => String(cat._id) !== id));
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  // Toggle category selection
  const toggleCategorySelection = (title: string) => {
    setSelectedCategories(prev =>
      prev.includes(title)
        ? prev.filter(t => t !== title)
        : [...prev, title]
    );
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
            Create Project
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
          {activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Project Form */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingProjectId ? "Edit Project" : "Create New Project"}
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Image</label>
                    <input
                      type="text"
                      value={projectImageLink}
                      onChange={(e) => setProjectImageLink(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project Image Url"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={projectTitle}
                      onChange={(e) => setProjectTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project title"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={projectCategory}
                        onChange={(e) => setProjectCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select a category</option>
                        {projectCategories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                   
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Technologies</label>
                    <input
                      type="text"
                      value={technologies}
                      onChange={(e) => setTechnologies(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Comma separated list (React, Node.js, MongoDB)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://github.com/your-username/project-name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Demo URL</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://your-project-demo.example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={projectDescription}
                      onChange={(e) => setProjectDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-40"
                      placeholder="Describe your project, its features, and purpose..."
                    />
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitProject}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting 
                        ? 'Submitting...' 
                        : editingProjectId 
                          ? 'Update Project' 
                          : 'Add Project'}
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
                  {projectTitle ? (
                    <>
                      {projectImagePreview && (
                        <img 
                          src={projectImagePreview} 
                          alt="Project preview" 
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{projectTitle}</h3>
                        
                      </div>
                      
                      {projectCategory && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mb-3">
                          {projectCategory}
                        </span>
                      )}
                      
                      {technologies && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {technologies.split(',').map(tech => (
                            <span key={tech} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {tech.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      {projectDescription && <p className="text-sm text-gray-700 mb-4">{projectDescription}</p>}
                      
                      <div className="flex space-x-2">
                        {githubUrl && (
                          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            GitHub
                          </a>
                        )}
                        {demoUrl && (
                          <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                            Live Demo
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
            <div className="space-y-6 min-h-[70.5vh]">
              <h2 className="text-xl font-semibold">Manage Projects</h2>
              
              {projects.length === 0 ? (
                <p className="text-gray-500 italic">No projects yet. Create your first project.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                      {project.imageLink && (
                        <img 
                          src={project.imageLink} 
                          alt={project.title} 
                          className="w-full h-48 object-cover"
                        />
                      )}
                      <div className="p-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{project.title}</h3>
                         
                        </div>
                        
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded mt-1 mb-2">
                          {project.category}
                        </span>
                        
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {project.programmingLanguages.map(tech => (
                            <span key={tech} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            {project.githubLink && (
                              <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                GitHub
                              </a>
                            )}
                            {project.demoLink && (
                              <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
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
                              onClick={() => handleDeleteProject(project._id)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                    <input
                      type="text"
                      value={newCategoryTitle}
                      onChange={(e) => setNewCategoryTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category name"
                    />
                  </div>

                  
                  <div className="flex items-end">
                    <button
                      onClick={handleAddCategory}
                      disabled={!newCategoryTitle.trim()}
                      className={`px-4 py-2 rounded-md text-white ${!newCategoryTitle.trim() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
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
                        for (const catName of selectedCategories) {
                          const category = projectCategories.find(c => c.name === catName);
                          if (category) {
                            await handleDeleteCategories(String(category._id));
                          }
                        }
                        setSelectedCategories([]);
                      }}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
                    >
                      Delete Selected
                    </button>
                  )}
                </div>

                {projectCategories.length === 0 ? (
                  <p className="text-gray-500 italic">No categories yet. Add your first category above.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {projectCategories.map((category) => (
                      <div
                        key={category._id}
                        onClick={() => toggleCategorySelection(category.name)}
                        className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center ${selectedCategories.includes(category.name) ? 'ring-2 ring-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                      >
                      
                        <span className="text-sm font-medium text-center">{category.name}</span>
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
      {projectSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {editingProjectId ? 'Project updated successfully!' : 'Project added successfully!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniProjects;