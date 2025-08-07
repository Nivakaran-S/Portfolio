'use client';
import Image from 'next/image';
import React, { useEffect, useState, useRef } from 'react';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

interface Project {
  _id: string;
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
  githubLink?: string;
  demoLink?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ProjectCategory {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ApiError {
  message: string;
}

const Projects = () => {
  const router = useRouter();
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  // State for projects
  const [projects, setProjects] = useState<Project[]>([]);
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState<string>('');
  const [projectOverview, setProjectOverview] = useState<string>('');
  const [imageUrl1, setImageUrl1] = useState<string>('');
  const [imageUrl2, setImageUrl2] = useState<string>('');
  const [imageUrl3, setImageUrl3] = useState<string>('');
  const [imageUrl4, setImageUrl4] = useState<string>('');
  const [imageUrl5, setImageUrl5] = useState<string>('');
  const [imageUrl6, setImageUrl6] = useState<string>('');
  const [githubLink, setGithubLink] = useState<string>('');
  const [demoLink, setDemoLink] = useState<string>('');
  const [projectCategory, setProjectCategory] = useState<string>('');
  const [problem, setProblem] = useState<string>('');
  const [solution, setSolution] = useState<string>('');
  const [techStack, setTechStack] = useState<string>('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [projectError, setProjectError] = useState<string>('');

  // State for categories
  const [projectCategories, setProjectCategories] = useState<ProjectCategory[]>([]);
  const [allCategories, setAllCategories] = useState<ProjectCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>('');
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryTitle, setEditingCategoryTitle] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');
  const [categorySuccess, setCategorySuccess] = useState<boolean>(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(false);

  // UI state
  const [activeTab, setActiveTab] = useState<'create' | 'manage' | 'categories'>('create');
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://portfolio-backend-new-2.vercel.app';

  const validateUrl = (url: string): boolean => {
    if (!url) return true;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoadingCategories(true);
        setCategoryError('');
        const categoriesResponse = await axios.get<ProjectCategory[]>(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
        setProjectCategories(categoriesResponse.data);
        setAllCategories(categoriesResponse.data);
      } catch (error: any) {
        setCategoryError((error.response?.data as ApiError)?.message || 'Failed to load categories.');
        setProjectCategories([]);
        setAllCategories([]);
      } finally {
        setIsLoadingCategories(false);
      }

      try {
        setIsLoadingProjects(true);
        setProjectError('');
        const projectsResponse = await axios.get<Project[]>(`${API_BASE_URL}/projects`, { withCredentials: true });
        setProjects(projectsResponse.data);
        setAllProjects(projectsResponse.data);
      } catch (error: any) {
        setProjectError((error.response?.data as ApiError)?.message || 'Failed to load projects.');
        setProjects([]);
        setAllProjects([]);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSearchTerm('');
    if (activeTab === 'manage') {
      setProjects(allProjects);
    } else if (activeTab === 'categories') {
      setProjectCategories(allCategories);
    }
  }, [activeTab, allProjects, allCategories]);

  useEffect(() => {
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    timeoutIdRef.current = setTimeout(() => {
      if (searchTerm.trim()) {
        if (activeTab === 'manage') {
          searchProjects(searchTerm);
        } else if (activeTab === 'categories') {
          searchCategories(searchTerm);
        }
      } else {
        if (activeTab === 'manage') {
          setProjects(allProjects);
        } else if (activeTab === 'categories') {
          setProjectCategories(allCategories);
        }
      }
    }, 500);

    return () => {
      if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);
    };
  }, [searchTerm, activeTab, allProjects, allCategories]);

  const fetchProjects = async () => {
    try {
      setIsLoadingProjects(true);
      setProjectError('');
      const response = await axios.get<Project[]>(`${API_BASE_URL}/projects`, { withCredentials: true });
      setProjects(response.data);
      setAllProjects(response.data);
    } catch (error: any) {
      setProjectError((error.response?.data as ApiError)?.message || 'Failed to load projects.');
      setProjects([]);
      setAllProjects([]);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const searchProjects = async (query: string) => {
    try {
      setIsLoadingProjects(true);
      setProjectError('');
      const response = await axios.get<Project[]>(`${API_BASE_URL}/projects/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setProjects(response.data);
    } catch (error: any) {
      setProjectError((error.response?.data as ApiError)?.message || 'Search unavailable. Filtering locally.');
      const filtered = allProjects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.projectOverview.toLowerCase().includes(query.toLowerCase()) ||
        project.techStack.toLowerCase().includes(query.toLowerCase()) ||
        getCategoryTitle(project.projectCategory).toLowerCase().includes(query.toLowerCase())
      );
      setProjects(filtered);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setIsLoadingCategories(true);
      setCategoryError('');
      const response = await axios.get<ProjectCategory[]>(`${API_BASE_URL}/projectCategory`, { withCredentials: true });
      setProjectCategories(response.data);
      setAllCategories(response.data);
    } catch (error: any) {
      setCategoryError((error.response?.data as ApiError)?.message || 'Failed to load categories.');
      setProjectCategories([]);
      setAllCategories([]);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const searchCategories = async (query: string) => {
    try {
      setIsLoadingCategories(true);
      setCategoryError('');
      const response = await axios.get<ProjectCategory[]>(`${API_BASE_URL}/projectCategory/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setProjectCategories(response.data);
    } catch (error: any) {
      setCategoryError((error.response?.data as ApiError)?.message || 'Search unavailable. Filtering locally.');
      const filtered = allCategories.filter(category =>
        category.title.toLowerCase().includes(query.toLowerCase())
      );
      setProjectCategories(filtered);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const resetProjectForm = () => {
    if (editingId && !window.confirm('Are you sure you want to cancel editing?')) {
      return;
    }
    setTitle('');
    setProjectOverview('');
    setImageUrl1('');
    setImageUrl2('');
    setImageUrl3('');
    setImageUrl4('');
    setImageUrl5('');
    setImageUrl6('');
    setDemoLink('');
    setGithubLink('');
    setProjectCategory('');
    setProblem('');
    setSolution('');
    setTechStack('');
    setEditingId(null);
    setProjectError('');
  };

  const handleSubmitProject = async () => {
    if (!title.trim() || !projectOverview.trim() || !imageUrl1 || !projectCategory || !problem.trim() || !solution.trim() || !techStack.trim()) {
      setProjectError('Please fill all required fields.');
      return;
    }
    if (!validateUrl(imageUrl1) || (imageUrl2 && !validateUrl(imageUrl2)) || (imageUrl3 && !validateUrl(imageUrl3)) ||
        (imageUrl4 && !validateUrl(imageUrl4)) || (imageUrl5 && !validateUrl(imageUrl5)) || (imageUrl6 && !validateUrl(imageUrl6)) ||
        (githubLink && !validateUrl(githubLink)) || (demoLink && !validateUrl(demoLink))) {
      setProjectError('Please provide valid URLs.');
      return;
    }
    if (!projectCategories.find(c => c._id === projectCategory)) {
      setProjectError('Selected category is invalid.');
      return;
    }

    try {
      setIsSaving(true);
      setProjectError('');

      const projectData = {
        title: title.trim(),
        projectOverview: projectOverview.trim(),
        images: {
          imageUrl1,
          imageUrl2: imageUrl2 || undefined,
          imageUrl3: imageUrl3 || undefined,
          imageUrl4: imageUrl4 || undefined,
          imageUrl5: imageUrl5 || undefined,
          imageUrl6: imageUrl6 || undefined,
        },
        projectCategory,
        githubLink: githubLink || undefined,
        demoLink: demoLink || undefined,
        problem: problem.trim(),
        solution: solution.trim(),
        techStack: techStack.trim(),
      };

      let response: AxiosResponse<Project>;
      if (editingId) {
        response = await axios.put(`${API_BASE_URL}/projects/${editingId}`, projectData, { withCredentials: true });
        setProjects(projects.map(proj => proj._id === editingId ? response.data : proj));
        setAllProjects(allProjects.map(proj => proj._id === editingId ? response.data : proj));
      } else {
        response = await axios.post(`${API_BASE_URL}/projects`, projectData, { withCredentials: true });
        setProjects([...projects, response.data]);
        setAllProjects([...allProjects, response.data]);
      }

      setSuccess(true);
      resetProjectForm();
      setTimeout(() => setSuccess(false), 3000);
    } catch (error: any) {
      setProjectError((error.response?.data as ApiError)?.message || 'Failed to save project.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleEditProject = (project: Project) => {
    setTitle(project.title);
    setProjectOverview(project.projectOverview);
    setImageUrl1(project.images?.imageUrl1 || '');
    setImageUrl2(project.images?.imageUrl2 || '');
    setImageUrl3(project.images?.imageUrl3 || '');
    setImageUrl4(project.images?.imageUrl4 || '');
    setImageUrl5(project.images?.imageUrl5 || '');
    setImageUrl6(project.images?.imageUrl6 || '');
    setProjectCategory(project.projectCategory);
    setGithubLink(project.githubLink || '');
    setDemoLink(project.demoLink || '');
    setProblem(project.problem);
    setSolution(project.solution);
    setTechStack(project.techStack);
    setEditingId(project._id);
    setActiveTab('create');
    window.scrollTo(0, 0);
  };

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await axios.delete(`${API_BASE_URL}/projects/${id}`, { withCredentials: true });
        setProjects(projects.filter(project => project._id !== id));
        setAllProjects(allProjects.filter(project => project._id !== id));
      } catch (error: any) {
        setProjectError((error.response?.data as ApiError)?.message || 'Failed to delete project.');
      }
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      setCategoryError('Please enter a category title.');
      return;
    }

    try {
      setIsLoadingCategories(true);
      const response = await axios.post<ProjectCategory>(
        `${API_BASE_URL}/projectCategory`,
        { title: newCategoryTitle.trim() },
        { withCredentials: true }
      );
      setProjectCategories([...projectCategories, response.data]);
      setAllCategories([...allCategories, response.data]);
      setNewCategoryTitle('');
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      setCategoryError((error.response?.data as ApiError)?.message || 'Failed to add category.');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategoryTitle.trim()) {
      setCategoryError('Please enter a category title.');
      return;
    }

    try {
      setIsLoadingCategories(true);
      const response = await axios.put<ProjectCategory>(
        `${API_BASE_URL}/projectCategory/${editingCategoryId}`,
        { title: editingCategoryTitle.trim() },
        { withCredentials: true }
      );
      setProjectCategories(projectCategories.map(cat => cat._id === editingCategoryId ? response.data : cat));
      setAllCategories(allCategories.map(cat => cat._id === editingCategoryId ? response.data : cat));
      setEditingCategoryId(null);
      setEditingCategoryTitle('');
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      setCategoryError((error.response?.data as ApiError)?.message || 'Failed to update category.');
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (projects.some(project => project.projectCategory === id)) {
      setCategoryError('Cannot delete category used by projects.');
      return;
    }

    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        setIsLoadingCategories(true);
        await axios.delete(`${API_BASE_URL}/projectCategory/${id}`, { withCredentials: true });
        setProjectCategories(projectCategories.filter(cat => cat._id !== id));
        setAllCategories(allCategories.filter(cat => cat._id !== id));
      } catch (error: any) {
        setCategoryError((error.response?.data as ApiError)?.message || 'Failed to delete category.');
      } finally {
        setIsLoadingCategories(false);
      }
    }
  };

  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryTitle('');
    setCategoryError('');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getCategoryTitle = (categoryId: string): string => {
    const category = projectCategories.find(c => c._id === categoryId);
    return category ? category.title : 'Unknown Category';
  };

  return (
    <div className="min-h-screen text-black bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="flex border-b border-gray-200">
          {(['create', 'manage', 'categories'] as const).map(tab => (
            <button
              key={tab}
              className={`flex-1 py-4 px-6 text-sm font-semibold transition-colors duration-200 ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => {
                setActiveTab(tab);
                if (tab === 'create') resetProjectForm();
              }}
              aria-label={`Switch to ${tab} tab`}
            >
              {tab === 'create' ? (editingId ? 'Edit Project' : 'Create Project') :
               tab === 'manage' ? 'Manage Projects' : 'Manage Categories'}
            </button>
          ))}
        </div>
        <div className="p-6">
          {(isLoadingCategories || isLoadingProjects) ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : activeTab === 'create' ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  {editingId ? 'Edit Project' : 'Create New Project'}
                </h2>
                {projectError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-red-700">{projectError}</p>
                  </div>
                )}
                {isLoadingCategories && (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg flex items-center">
                    <svg className="h-5 w-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-sm text-yellow-700">Loading categories...</p>
                  </div>
                )}
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Project title"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="overview" className="block text-sm font-medium text-gray-700 mb-1">Project Overview *</label>
                    <textarea
                      id="overview"
                      value={projectOverview}
                      onChange={(e) => setProjectOverview(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="Project overview"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="demoLink" className="block text-sm font-medium text-gray-700 mb-1">Demo Link</label>
                    <input
                      id="demoLink"
                      type="url"
                      value={demoLink}
                      onChange={(e) => setDemoLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/demo"
                    />
                  </div>
                  <div>
                    <label htmlFor="githubLink" className="block text-sm font-medium text-gray-700 mb-1">Github Link</label>
                    <input
                      id="githubLink"
                      type="url"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://github.com/example"
                    />
                  </div>
                  <div>
                    <label htmlFor="image1" className="block text-sm font-medium text-gray-700 mb-1">Image URL 1 *</label>
                    <input
                      id="image1"
                      type="url"
                      value={imageUrl1}
                      onChange={(e) => setImageUrl1(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image1.jpg"
                      aria-required="true"
                    />
                  </div>
                  {['imageUrl2', 'imageUrl3', 'imageUrl4', 'imageUrl5', 'imageUrl6'].map((field, index) => (
                    <div key={field}>
                      <label htmlFor={field} className="block text-sm font-medium text-gray-700 mb-1">Image URL {index + 2}</label>
                      <input
                        id={field}
                        type="url"
                        value={[imageUrl2, imageUrl3, imageUrl4, imageUrl5, imageUrl6][index]}
                        onChange={(e) => [setImageUrl2, setImageUrl3, setImageUrl4, setImageUrl5, setImageUrl6][index](e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder={`https://example.com/image${index + 2}.jpg`}
                      />
                    </div>
                  ))}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      id="category"
                      value={projectCategory}
                      onChange={(e) => setProjectCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                      aria-required="true"
                      disabled={projectCategories.length === 0}
                    >
                      <option value="">Select category</option>
                      {projectCategories.map((cat) => (
                        <option key={cat._id} value={cat._id}>
                          {cat.title}
                        </option>
                      ))}
                    </select>
                    {projectCategories.length === 0 && (
                      <p className="text-sm text-yellow-600 mt-1">No categories available. Add a category in the "Manage Categories" tab.</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="problem" className="block text-sm font-medium text-gray-700 mb-1">Problem *</label>
                    <textarea
                      id="problem"
                      value={problem}
                      onChange={(e) => setProblem(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="Describe the problem"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="solution" className="block text-sm font-medium text-gray-700 mb-1">Solution *</label>
                    <textarea
                      id="solution"
                      value={solution}
                      onChange={(e) => setSolution(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
                      placeholder="Describe the solution"
                      aria-required="true"
                    />
                  </div>
                  <div>
                    <label htmlFor="techStack" className="block text-sm font-medium text-gray-700 mb-1">Tech Stack *</label>
                    <input
                      id="techStack"
                      type="text"
                      value={techStack}
                      onChange={(e) => setTechStack(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., React, Node.js"
                      aria-required="true"
                    />
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleSubmitProject}
                      disabled={isSaving || projectCategories.length === 0}
                      className={`px-6 py-2 rounded-lg text-white font-medium ${
                        isSaving || projectCategories.length === 0 ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors`}
                      aria-label={editingId ? 'Update project' : 'Create project'}
                    >
                      {isSaving ? 'Saving...' : editingId ? 'Update Project' : 'Create Project'}
                    </button>
                    {editingId && (
                      <button
                        onClick={resetProjectForm}
                        className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                        aria-label="Cancel editing"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Preview</h2>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  {title ? (
                    <>
                      {imageUrl1 && (
                        <Image
                          src={imageUrl1}
                          alt="Project preview"
                          width={300}
                          height={200}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                          placeholder="blur"
                          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                        />
                      )}
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                      {projectCategory && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Category:</p>
                          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                            {getCategoryTitle(projectCategory)}
                          </span>
                        </div>
                      )}
                      {projectOverview && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Overview:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{projectOverview}</p>
                        </div>
                      )}
                      {githubLink && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Github Link:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{githubLink}</p>
                        </div>
                      )}
                      {demoLink && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Demo Link:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{demoLink}</p>
                        </div>
                      )}
                      {problem && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Problem:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{problem}</p>
                        </div>
                      )}
                      {solution && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">Solution:</p>
                          <p className="text-sm text-gray-600 line-clamp-3">{solution}</p>
                        </div>
                      )}
                      {techStack && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Tech Stack:</p>
                          <p className="text-sm text-gray-600">{techStack}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-500 italic text-center">Start typing to see a preview</p>
                  )}
                </div>
              </div>
            </div>
          ) : activeTab === 'manage' ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Projects</h2>
              <div className="relative">
                <svg className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search projects..."
                  aria-label="Search projects"
                />
              </div>
              {projectError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{projectError}</p>
                </div>
              )}
              {projects.length === 0 && !isLoadingProjects && searchTerm ? (
                <p className="text-gray-500 italic text-center">No projects match your search.</p>
              ) : projects.length === 0 && !isLoadingProjects ? (
                <p className="text-gray-500 italic text-center">No projects found. Create your first project.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((project) => (
                    <div key={project._id} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-lg transition-shadow duration-200">
                      <div className="flex flex-col space-y-3">
                        {project.images?.imageUrl1 && (
                          <Image
                            src={project.images.imageUrl1}
                            alt={project.title}
                            width={300}
                            height={200}
                            className="w-full h-40 object-cover rounded-lg"
                            placeholder="blur"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGUrGwU6AAAAABJRU5ErkJggg=="
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">{project.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{project.projectOverview}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                              {getCategoryTitle(project.projectCategory)}
                            </span>
                            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full">
                              {project.techStack}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">{formatDate(project.createdAt)}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditProject(project)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            aria-label={`Edit project ${project.title}`}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteProject(project._id)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
                            aria-label={`Delete project ${project.title}`}
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Manage Categories</h2>
              <div className="relative">
                <svg className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search categories..."
                  aria-label="Search categories"
                />
              </div>
              {categoryError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg flex items-center">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-700">{categoryError}</p>
                </div>
              )}
              {isLoadingCategories && (
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg flex items-center">
                  <svg className="h-5 w-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v4a1 1 0 11-2 0V8a1 1 0 011-1zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-yellow-700">Loading categories...</p>
                </div>
              )}
              {projectCategories.length === 0 && !isLoadingCategories && searchTerm ? (
                <p className="text-gray-500 italic text-center">No categories match your search.</p>
              ) : (
                <>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {editingCategoryId ? 'Edit Category' : 'Add New Category'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <label htmlFor="categoryTitle" className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                        <input
                          id="categoryTitle"
                          type="text"
                          value={editingCategoryId ? editingCategoryTitle : newCategoryTitle}
                          onChange={(e) => editingCategoryId ? setEditingCategoryTitle(e.target.value) : setNewCategoryTitle(e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter category title"
                          aria-required="true"
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                        disabled={!(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim()) || isLoadingCategories}
                        className={`px-6 py-2 rounded-lg text-white font-medium ${
                          !(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim()) || isLoadingCategories
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-green-600 hover:bg-green-700'
                        } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors`}
                        aria-label={editingCategoryId ? 'Update category' : 'Add category'}
                      >
                        {editingCategoryId ? 'Update Category' : 'Add Category'}
                      </button>
                      {editingCategoryId && (
                        <button
                          onClick={cancelEditCategory}
                          className="px-6 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                          aria-label="Cancel category edit"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Existing Categories</h3>
                    {projectCategories.length === 0 && !isLoadingCategories ? (
                      <p className="text-gray-500 italic text-center">No categories found. Add your first category above.</p>
                    ) : (
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 bg-gray-100 text-gray-700 font-semibold text-sm p-4">
                          <div className="col-span-5">Title</div>
                          <div className="col-span-5">Created At</div>
                          <div className="col-span-2 text-right">Actions</div>
                        </div>
                        {projectCategories.map((category) => (
                          <div
                            key={category._id}
                            className="grid grid-cols-12 gap-4 p-4 border-t border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                          >
                            <div className="col-span-5 flex items-center">
                              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
                                {category.title}
                              </span>
                            </div>
                            <div className="col-span-5 flex items-center text-sm text-gray-600">
                              {formatDate(category.createdAt)}
                            </div>
                            <div className="col-span-2 flex justify-end space-x-3">
                              <button
                                onClick={() => {
                                  setEditingCategoryId(category._id);
                                  setEditingCategoryTitle(category.title);
                                }}
                                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                                aria-label={`Edit category ${category.title}`}
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCategory(category._id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                                aria-label={`Delete category ${category.title}`}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
        {(success || categorySuccess) && (
          <div className="fixed top-4 right-4 z-50 animate-slide-in">
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
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
      <style jsx>{`
        @keyframes slide-in {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Projects;