import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

interface BlogPost {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  category: string;
  description: string;
  imageLink: string;
}

interface BlogCategory {
  _id: number;
  name: string;
}

const BlogsManagement = () => {
  // Blog post states
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [blogTitle, setBlogTitle] = useState<string>("");
  const [blogSubtitle, setBlogSubtitle] = useState<string>("");
  const [blogContent, setBlogContent] = useState<string>("");
  const [blogCategory, setBlogCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [blogImageLink, setBlogImageLink] = useState<string>("");
  
  const [blogSuccess, setBlogSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // Category states
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [newCategoryImage, setNewCategoryImage] = useState<File | null>(null);
  const [categoryPreview, setCategoryPreview] = useState<string | null>(null);

  // UI states
  const [activeTab, setActiveTab] = useState<"create" | "categories" | "manage">("create");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const blogFileInputRef = useRef<HTMLInputElement>(null);

  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);

  // Fetch initial data (simulated)
  useEffect(() => {
    // Fetch blog posts and categories asynchronously
    const fetchData = async () => {
      try {
        const blogsResponse = await axios.get("https://new-portfolio-backend-roan.vercel.app/blog", {
          withCredentials: true,
        });
        setBlogPosts(blogsResponse.data);
        console.log("Fetched blog posts:", blogsResponse.data);

        const categoriesResponse = await axios.get("https://new-portfolio-backend-roan.vercel.app/blogCategory", {
          withCredentials: true,
        });
        setBlogCategories(categoriesResponse.data);
        console.log("Fetched blog categories:", categoriesResponse.data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
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
    // Clear previous state
    setNewCategoryTitle("");
    
    // Send request to server
    const response = await axios.post(
      "https://new-portfolio-backend-roan.vercel.app/blogCategory",
      {
        name: newCategoryTitle,
        
      },
      { withCredentials: true }  // Added credentials if needed
    );

    // Use server response for the new category
    const newCategory: BlogCategory = {
      _id: response.data._id || Date.now().toString(),  // Prefer server ID
      name: newCategoryTitle
    };

    // Update state with the new category
    setBlogCategories(prev => [...prev, newCategory]);

  } catch (error) {
    console.error("Error adding category:", error);
    alert("Failed to add category. Please try again.");
    // Optionally restore form values if you want to let user retry
  }
};

  // Handle blog submission
  const handleSubmitBlog = async () => {
  if (!blogTitle || !blogImageLink || !blogContent || !blogCategory) {
    alert("Please fill all required fields");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await axios.post(
      "https://new-portfolio-backend-roan.vercel.app/blog",
      {
        title: blogTitle,
        subtitle: blogSubtitle,
        content: blogContent,
        category: blogCategory,
        description: description,
        imageLink: blogImageLink,
      },
      {
        withCredentials: true,
      }
    );

    const newPost: BlogPost = {
      _id: editingPostId || response.data.id || Date.now().toString(),
      title: blogTitle,
      subtitle: blogSubtitle,
      content: blogContent,
      category: blogCategory,
      description: description,
      imageLink: blogImageLink,
    };

    if (editingPostId) {
      setBlogPosts(blogPosts.map(post => post._id === editingPostId ? newPost : post));
    } else {
      setBlogPosts([...blogPosts, newPost]);
    }

    setBlogSuccess(true);
    resetBlogForm();

    setTimeout(() => setBlogSuccess(false), 3000);

  } catch (error) {
    console.error("Error submitting blog post:", error);
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
    setDescription("");
    setBlogImageLink("");
    setEditingPostId(null);
    if (blogFileInputRef.current) blogFileInputRef.current.value = "";
  };

  // Edit existing blog post
  const handleEditBlog = (post: BlogPost) => {
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    setBlogContent(post.content);
    setBlogCategory(post.category);
    setDescription(post.description);
    setBlogImageLink(post.imageLink);
    setEditingPostId(post._id);
    setActiveTab("create");
    window.scrollTo(0, 0);
  };

  // Delete blog post
  const handleDeleteBlog = (id: string) => {
    try {
      axios.delete(`https://new-portfolio-backend-roan.vercel.app/blog/${id}`, {
        withCredentials: true,
      });
      setBlogPosts(blogPosts.filter(post => post._id !== id));
    
    } catch (error) {
      console.error("Error deleting blog post:", error);
      alert("Failed to delete blog post. Please try again.");
    }
  };

  // Handle category deletion
  const handleDeleteCategories = async () => {
  if (selectedCategories.length === 0) return;

  try {
    // Wait for ALL deletions to complete
    await Promise.all(
      selectedCategories.map(async (categoryName) => {
        const categoryObj = blogCategories.find((cat) => cat.name === categoryName);
        if (categoryObj) {
          await axios.delete(
            `https://new-portfolio-backend-roan.vercel.app/blogCategory/${categoryObj._id}`,
            { withCredentials: true }
          );
        }
      })
    );

    // Only update UI after successful deletions
    const updatedCategories = blogCategories.filter(
      (category) => !selectedCategories.includes(category.name)
    );

    setBlogCategories(updatedCategories);
    setSelectedCategories([]);

  } catch (error) {
    console.error("Error deleting categories:", error);
    alert("Failed to delete categories. Please try again.");
  }
};

  // Toggle category selection
  const toggleCategorySelection = (category: any) => {
    setDeleteCategoryId(category._id);
    
    setSelectedCategories(prev =>
      prev.includes(category.name)
        ? prev.filter(t => t !== category.name)
        : [...prev, category.name]
    );
  };

  return (
    <div className="w-full text-black bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">


        {/* Tabs */}
        <div className="flex  border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : " cursor-pointer text-gray-600"}`}
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blog Image Link</label>
                    <input
                      type="text"
                      value={blogImageLink}
                      onChange={(e) => setBlogImageLink(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog image link"
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
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description (Max 100 characters)
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={100}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                      placeholder="Brief description of your blog"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {description.length}/100 characters
                    </p>
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

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="confirmation"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="confirmation" className="ml-2 block text-sm text-gray-700">
                      I confirm that the information provided is correct
                    </label>
                  </div>

                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitBlog}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting 
                        ? 'Submitting...' 
                        : editingPostId 
                          ? 'Update Blog Post' 
                          : 'Publish Blog Post'}
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
                      {blogImageLink && (
                        <img 
                          src={blogImageLink} 
                          alt="Blog preview" 
                          className="w-full h-48 object-cover rounded-md mb-4"
                        />
                      )}
                      <h3 className="text-lg font-medium mb-2">{blogTitle}</h3>
                      {blogSubtitle && <p className="text-gray-600 mb-3">{blogSubtitle}</p>}
                      {blogCategory && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                          {blogCategory}
                        </span>
                      )}
                      {description && <p className="text-sm text-gray-700 mb-4">{description}</p>}
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
              
              {blogPosts.length === 0 ? (
                <p className="text-gray-500 italic">No blog posts yet. Create your first blog post.</p>
              ) : (
                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-start space-x-4">
                          {post.imageLink && (
                            <img 
                              src={post.imageLink} 
                              alt={post.title} 
                              className="w-24 h-16 object-cover rounded-md"
                            />
                          )}
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.subtitle}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                              {post.category}
                            </span>
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

                  <div className="md:col-span-2">
                    
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleAddCategory}
                    disabled={!newCategoryTitle.trim()}
                    className={`px-4 py-2 rounded-md text-white ${!newCategoryTitle.trim() ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
                  >
                    Add Category
                  </button>
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

                {blogCategories.length === 0 ? (
                  <p className="text-gray-500 italic">No categories yet. Add your first category above.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {blogCategories.map((category) => (
                      <div
                        key={category._id}
                        onClick={() => toggleCategorySelection(category)}
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
      {blogSuccess && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            {editingPostId ? 'Blog post updated successfully!' : 'Blog post published successfully!'}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogsManagement;