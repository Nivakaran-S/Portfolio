'use client';
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Image from "next/image";
import DOMPurify from 'dompurify';
import dynamic from 'next/dynamic';

// Dynamically import Tiptap with SSR disabled
const Tiptap = dynamic(() => import('@/app/components/Tiptap'), {
  ssr: false,
});

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

const BlogsManagement: React.FC = () => {
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
  const [blogCategories, setBlogCategories] = useState<BlogCategory[]>([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState<string>("");
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryTitle, setEditingCategoryTitle] = useState<string>("");
  const [categoryError, setCategoryError] = useState<string>("");
  const [categorySuccess, setCategorySuccess] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"create" | "categories" | "manage">("create");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [imageLink, setImageLink] = useState<string>("");
  const [previewContent, setPreviewContent] = useState<string>("");

  const API_BASE_URL = "https://portfolio-backend-new-2.vercel.app";

  // Update preview content when blogContent changes
  useEffect(() => {
    if (blogContent) {
      setPreviewContent(DOMPurify.sanitize(blogContent));
    } else {
      setPreviewContent("");
    }
  }, [blogContent]);

  const fetchBlogs = async () => {
    try {
      setBlogError("");
      const response: AxiosResponse<BlogPost[]> = await axios.get(`${API_BASE_URL}/blogs`, {
        withCredentials: true,
      });
      setBlogPosts(response.data);
    } catch (error: any) {
      setBlogError("Failed to load blog posts. Please try again.");
    }
  };

  const searchBlogs = async (query: string) => {
    try {
      setBlogError("");
      const response: AxiosResponse<BlogPost[]> = await axios.get(
        `${API_BASE_URL}/blogs/search?query=${encodeURIComponent(query)}`,
        { withCredentials: true }
      );
      setBlogPosts(response.data);
    } catch (error: any) {
      setBlogError("Failed to search blog posts. Please try again.");
    }
  };

  const fetchCategories = async () => {
    try {
      setCategoryError("");
      const response: AxiosResponse<BlogCategory[]> = await axios.get(`${API_BASE_URL}/blogCategory`, {
        withCredentials: true,
      });
      setBlogCategories(response.data);
    } catch (error: any) {
      setCategoryError("Failed to load blog categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const delayDebounceFn = setTimeout(() => {
        if (activeTab === "manage") {
          searchBlogs(searchTerm);
        } else if (activeTab === "categories") {
          fetchCategories();
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

  const handleAddCategory = async () => {
    if (!newCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }
    try {
      const response: AxiosResponse<{ id: string }> = await axios.post(
        `${API_BASE_URL}/blogCategory`,
        { title: newCategoryTitle },
        { withCredentials: true }
      );
      setBlogCategories((prev) => [
        ...prev,
        { _id: response.data.id, title: newCategoryTitle, createdAt: new Date().toISOString() },
      ]);
      setNewCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      alert("Failed to add category. Please try again.");
    }
  };

  const handleUpdateCategory = async () => {
    if (!editingCategoryTitle.trim() || !editingCategoryId) {
      alert("Please enter a category title");
      return;
    }
    try {
      await axios.put(
        `${API_BASE_URL}/blogCategory/${editingCategoryId}`,
        { title: editingCategoryTitle },
        { withCredentials: true }
      );
      setBlogCategories((prev) =>
        prev.map((cat) =>
          cat._id === editingCategoryId
            ? { ...cat, title: editingCategoryTitle }
            : cat
        )
      );
      setEditingCategoryId(null);
      setEditingCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      alert("Failed to update category. Please try again.");
    }
  };

  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryTitle("");
  };

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
      let response: AxiosResponse<BlogPost>;
      if (editingPostId) {
        response = await axios.put(`${API_BASE_URL}/blogs/${editingPostId}`, blogData, {
          withCredentials: true,
        });
        setBlogPosts(blogPosts.map((post) => (post._id === editingPostId ? response.data : post)));
      } else {
        response = await axios.post(`${API_BASE_URL}/blogs`, blogData, { withCredentials: true });
        setBlogPosts([...blogPosts, { ...blogData, _id: response.data._id, createdAt: new Date().toISOString() }]);
      }
      setBlogSuccess(true);
      resetBlogForm();
      setTimeout(() => setBlogSuccess(false), 3000);
    } catch (error: any) {
      alert("Failed to submit blog post. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetBlogForm = () => {
    setBlogTitle("");
    setBlogSubtitle("");
    setBlogContent("");
    setBlogCategory("");
    setBlogImageUrl("");
    setEditingPostId(null);
    setImageLink("");
    setPreviewContent("");
  };

  const handleEditBlog = (post: BlogPost) => {
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    setBlogContent(post.content);
    setBlogCategory(post.blogsCategory);
    setBlogImageUrl(post.imageUrl);
    setEditingPostId(post._id);
    setActiveTab("create");
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  };

  const handleDeleteBlog = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/blogs/${id}`, { withCredentials: true });
      setBlogPosts(blogPosts.filter((post) => post._id !== id));
    } catch (error: any) {
      alert("Failed to delete blog post. Please try again.");
    }
  };

  const formatDate = (dateString: string): string => {
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
              activeTab === "create" ? "text-blue-600 border-b-2 border-blue-600" : "cursor-pointer text-gray-600"
            }`}
            onClick={() => {
              setActiveTab("create");
              resetBlogForm();
            }}
          >
            Create Blog Post
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "manage" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"
            }`}
            onClick={() => setActiveTab("manage")}
          >
            Manage Blog Posts
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "categories" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"
            }`}
            onClick={() => setActiveTab("categories")}
          >
            Manage Categories
          </button>
        </div>
        <div className="p-6 overflow-y-scroll">
          {activeTab === "create" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog image URL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      value={blogTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={blogSubtitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBlogSubtitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter blog subtitle"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={blogCategory}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setBlogCategory(e.target.value)}
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
                    <div className="bg-white border border-gray-300 rounded-md shadow-sm">
                      <Tiptap
                        description={blogContent}
                        onChange={(richText: string) => {
                          setBlogContent(richText);
                        }}
                      />
                    </div>
                  </div>
                  <div className="pt-2 flex space-x-3">
                    <button
                      onClick={handleSubmitBlog}
                      disabled={isSubmitting}
                      className={`px-4 py-2 rounded-md text-white ${
                        isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                    >
                      {isSubmitting ? "Submitting..." : editingPostId ? "Update Blog Post" : "Publish Blog Post"}
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
              <div className="hidden lg:block">
                <h2 className="text-xl font-semibold mb-4">Preview</h2>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {blogTitle ? (
                    <>
                      {blogImageUrl && (
                        <Image src={blogImageUrl} quality={100} height={150} width={150} alt="Blog preview" className="w-full h-48 object-cover rounded-md mb-4" />
                      )}
                      <h3 className="text-lg font-medium mb-2">{blogTitle}</h3>
                      {blogSubtitle && <p className="text-gray-600 mb-3">{blogSubtitle}</p>}
                      {blogCategory && (
                        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-3">
                          {blogCategories.find((cat) => cat._id === blogCategory)?.title || "Unknown Category"}
                        </span>
                      )}
                      {previewContent ? (
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: previewContent }} />
                      ) : (
                        <p className="text-gray-500 italic">Start typing to see a preview</p>
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
              <div className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Search blog posts..."
                  />
                </div>
              </div>
              {blogError ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
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
                            <Image width={100} height={100} quality={100} src={post.imageUrl} alt={post.title} className="w-24 h-16 object-cover rounded-md" />
                          )}
                          <div>
                            <h3 className="font-medium">{post.title}</h3>
                            <p className="text-sm text-gray-600">{post.subtitle}</p>
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded mt-1">
                              {blogCategories.find((cat) => cat._id === post.blogsCategory)?.title || "Unknown Category"}
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
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-3">{editingCategoryId ? "Edit Category" : "Add New Category"}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title *</label>
                    <input
                      type="text"
                      value={editingCategoryId ? editingCategoryTitle : newCategoryTitle}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        editingCategoryId ? setEditingCategoryTitle(e.target.value) : setNewCategoryTitle(e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter category title"
                    />
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button
                    onClick={editingCategoryId ? handleUpdateCategory : handleAddCategory}
                    disabled={!(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim())}
                    className={`px-4 py-2 rounded-md text-white ${
                      !(editingCategoryId ? editingCategoryTitle.trim() : newCategoryTitle.trim())
                        ? "bg-gray-400"
                        : "bg-green-600 hover:bg-green-700"
                    } focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2`}
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogsManagement;