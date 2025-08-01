import React, { useState, useEffect } from "react";
import axios from "axios";

interface BlogPost {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  blogsCategory: string;
  imageUrl: string;
  createdAt: string;
}

interface BlogCategory {
  _id: string;
  title: string;
  createdAt: string;
}

const BlogsManagement = () => {
  // Blog post states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogSubtitle, setBlogSubtitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("");
  const [blogImageUrl, setBlogImageUrl] = useState<string>("");
  const [blogSuccess, setBlogSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [blogError, setBlogError] = useState<string>("");

  // Category states
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryTitle, setEditingCategoryTitle] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [categorySuccess, setCategorySuccess] = useState<boolean>(false);

  // UI states
  const [activeTab, setActiveTab] = useState<"create" | "categories" | "manage">("create");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Base URL for API requests
  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  // Fetch blog posts
  const fetchBlogs = async () => {
    try {
      setBlogError("");
      const response = await axios.get(`${API_BASE_URL}/blogs`, {
        withCredentials: true,
      });
      setBlogPosts(response.data);
      console.log("Fetched blog posts:", response.data);
    } catch (error: any) {
      console.error("Error fetching blog posts:", error.response ? error.response.data : error.message);
      setBlogError("Failed to load blog posts. Please try again.");
    }
  };

  // Search blog posts
  const searchBlogs = async (query: string) => {
    try {
      setBlogError("");
      const response = await axios.get(`${API_BASE_URL}/blogs/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setBlogPosts(response.data);
      console.log("Searched blog posts:", response.data);
    } catch (error: any) {
      console.error("Error searching blog posts:", error.response ? error.response.data : error.message);
      setBlogError("Failed to search blog posts. Please try again.");
    }
  };

  // Fetch blog categories
  const fetchCategories = async () => {
    try {
      setCategoryError("");
      const response = await axios.get(`${API_BASE_URL}/blogCategory`, {
        withCredentials: true,
      });
      setBlogCategories(response.data);
      console.log("Fetched blog categories:", response.data);
    } catch (error: any) {
      console.error("Error fetching blog categories:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to load blog categories. Please try again.");
    }
  };

  // Search blog categories
  const searchCategories = async (query: string) => {
    try {
      setCategoryError("");
      const response = await axios.get(`${API_BASE_URL}/blogCategory/search?query=${encodeURIComponent(query)}`, {
        withCredentials: true,
      });
      setBlogCategories(response.data);
      console.log("Searched blog categories:", response.data);
    } catch (error: any) {
      console.error("Error searching blog categories:", error.response ? error.response.data : error.message);
      setCategoryError("Failed to search blog categories. Please try again.");
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Handle search with debounce
  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        if (activeTab === "manage") {
          searchBlogs(searchTerm);
        } else if (activeTab === "categories") {
          searchCategories(searchTerm);
        }
      }, 500);
      return () => clearTimeout(delayDebounceFn);
    } else {
      if (activeTab === "manage") {
        fetchBlogs();
      } else if (activeTab === "categories") {
        fetchCategories();
      }
    }
  }, [searchTerm, activeTab]);

  // Handle category creation
  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/blogCategory`,
        { title: newCategoryTitle },
        { withCredentials: true }
      );
      const newCategory: BlogCategory = {
        _id: response.data.id,
        title: newCategoryTitle,
        createdAt: new Date().toISOString(),
      };
      setBlogCategories(prev => [...prev, newCategory]);
      setNewCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      console.error("Error adding category:", error.response ? error.response.data : error.message);
      alert("Failed to add category. Please try again.");
    }
  };

  // Handle category update
  const handleUpdateCategory = async () => {
    if (!editingCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }

    try {
      const response = await axios.put(
        `${API_BASE_URL}/blogCategory/${editingCategoryId}`,
        { title: editingCategoryTitle },
        { withCredentials: true }
      );
      setBlogCategories(blogCategories.map(cat => cat._id === editingCategoryId ? response.data : cat));
      setEditingCategoryId(null);
      setEditingCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      console.error("Error updating category:", error.response ? error.response.data : error.message);
      alert("Failed to update category. Please try again.");
    }
  };

  // Handle blog submission
  const handleSubmitBlog = async () => {
    if (!blogTitle || !blogContent || !blogImageUrl || !blogCategory) {
      alert("Please fill all required fields (title, content, image URL, category)");
      return;
    }

    setIsSubmitting(true);
    try {
      const blogData = {
        title: blogTitle,
        subtitle: blogSubtitle,
        content: blogContent,
        blogsCategory: blogCategory,
        imageUrl: blogImageUrl,
      };
      let response;
      if (editingPostId) {
        response = await axios.put(
          `${API_BASE_URL}/blogs/${editingPostId}`,
          blogData,
          { withCredentials: true }
        );
        setBlogPosts(blogPosts.map(post => post._id === editingPostId ? response.data : post));
      } else {
        response = await axios.post(
          `${API_BASE_URL}/blogs`,
          blogData,
          { withCredentials: true }
        );
        setBlogPosts([...blogPosts, { ...blogData, _id: response.data.id, createdAt: new Date().toISOString() }]);
      }
      setBlogSuccess(true);
      resetBlogForm();
      setTimeout(() => setBlogSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error submitting blog post:", error.response ? error.response.data : error.message);
      alert("Failed to submit blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset blog form
  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogSubtitle("");
    setBlogContent("");
    setBlogCategory("");
    setBlogImageUrl("");
    setEditingPostId(null);
  };

  // Edit existing blog post
  const handleEditBlog = (post: BlogPost) => {
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    setBlogContent(post.content);
    setBlogCategory(post.blogsCategory);
    setBlogImageUrl(post.imageUrl);
    setEditingPostId(post._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete blog post
  const handleDeleteBlog = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`, {
        withCredentials: true,
      });
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    } catch (error: any) {
      console.error("Error deleting blog post:", error.response ? error.response.data : error.message);
      alert("Failed to delete blog post. Please try again.");
    }
  };

  // Handle category deletion
  const handleDeleteCategories = async () => {
    if (selectedCategories.length === 0) return;

    try {
      await Promise.all(
        selectedCategories.map(async (categoryTitle) => {
          const categoryObj = blogCategories.find((cat) => cat.title === categoryTitle);
          if (categoryObj) {
            await axios.delete(`${API_BASE_URL}/blogCategory/${categoryObj._id}`, {
              withCredentials: true,
            });
          }
        })
      );
      setBlogCategories(blogCategories.filter(category => !selectedCategories.includes(category.title)));
      setSelectedCategories([]);
    } catch (error: any) {
      console.error("Error deleting categories:", error.response ? error.response.data : error.message);
      alert("Failed to delete categories. Please try again.");
    }
  };

  // Edit existing category
  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategoryId(category._id);
    setEditingCategoryTitle(category.title);
  };

  // Cancel category edit
  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryTitle("");
  };

  // Toggle category selection
  const toggleCategorySelection = (category: BlogCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category.title)
        ? prev.filter(t => t !== category.title)
        : [...prev, category.title]
    );
  };

  // Format date
  const formatDate = (dateString: string) => {
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
              resetBlogForm();
            }}
          >
            Create Blog Post
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"}`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Blog Posts
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
              {/* Blog Form */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4">
                  {editingPostId ? "Edit Blog Post" : "Create New Blog Post"}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Image URL *</label>
                    <input
                      type="text"
                      value={blogImageUrl}
                      onChange={(e) => setBlogImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog image URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e) => setBlogTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={blogSubtitle}
                      onChange={(e) => setBlogSubtitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={blogCategory}
                      onChange={(e) => setBlogCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a category</option>
                      {blogCategories.map((category) => (
                        <option key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                    <textarea
                      value={blogContent}
                      onChange={(e) => setBlogContent(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-64"
                      placeholder="Write your blog content here..."
                    />
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitBlog}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting ? 'Submitting...' : editingPostId ? 'Update Blog Post' : 'Publish Blog Post'}
                    </button>
                    {editingPostId && (
                      <button
                        onClick={resetBlogForm}
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
                  {blogTitle ? (
                    <>
                      {blogImageUrl && (
                        <img
                          src={blogImageUrl}
                          alt="Blog preview"
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="text-lg font-medium mb-2">{blogTitle}</h3>
                      {blogSubtitle && <p className="text-gray-600 mb-3">{blogSubtitle}</p>}
                      {blogCategory && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                          {blogCategories.find(cat => cat._id === blogCategory)?.title || 'Unknown Category'}
                        </span>
                      )}
                      {blogContent && (
                        <div className="prose max-w-none">
                          <p>{blogContent}</p>
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
            <div className="space-y-6 h-[70vh]">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
              {/* Search Bar */}
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
                    placeholder="Search blog posts..."
                  />
                </div>
              </div>
              {blogError ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{blogError}</p>
                    </div>
                  </div>
                </div>
              ) : blogPosts.length === 0 ? (
                <p className="text-gray-500 italic">No blog posts yet. Create your first blog post.</p>
              ) : (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          {post.imageUrl && (
                            <img
                              src={post.imageUrl}
                              alt={post.title}
                              className="w-24 h-16 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.subtitle}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                              {blogCategories.find(cat => cat._id === post.blogsCategory)?.title || 'Unknown Category'}
                            </span>
                            <p className="text-sm text-gray-600 mt-1">{formatDate(post.createdAt)}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-3 md:mt-0">
                          <button
                            onClick={() => handleEditBlog(post)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 focus:outline-none"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(post._id)}
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
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Manage Categories</h2>
              {/* Search Bar */}
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
                    placeholder="Search blog categories..."
                  />
                </div>
              </div>
              {/* Add/Edit Category Form */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">{editingCategoryId ? "Edit Category" : "Add New Category"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
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
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Existing Categories</h3>
                  {selectedCategories.length > 0 && (
                    <button
                      onClick={handleDeleteCategories}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none"
                    >
                      Delete Selected
                    </button>
                  )}
                </div>
                {categoryError ? (
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
                ) : blogCategories.length === 0 ? (
                  <p className="text-gray-500 italic">No categories yet. Add your first category above.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {blogCategories.map((category) => (
                      <div
                        key={category._id}
                        className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center ${selectedCategories.includes(category.title) ? 'ring-2 ring-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}`}
                      >
                        <div className="flex justify-between w-full">
                          <span className="text-sm font-medium text-center">{category.title}</span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditCategory(category);
                            }}
                            className="text-blue-600 hover:text-blue-800 text-xs"
                          >
                            Edit
                          </button>
                        </div>
                        <p className="text-xs text-gray-600 mt-1">{formatDate(category.createdAt)}</p>
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category.title)}
                          onChange={() => toggleCategorySelection(category)}
                          className="mt-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Success Notification */}
        {(blogSuccess || categorySuccess) && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {blogSuccess ? (editingPostId ? 'Blog post updated successfully!' : 'Blog post published successfully!') : 'Category operation successful!'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsManagement;