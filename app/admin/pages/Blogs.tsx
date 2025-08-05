'use client';
import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertToRaw, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import Image from "next/image";
import DOMPurify from 'dompurify';

// Dynamically import draft-js Editor component
const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), { ssr: false });

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
  const [editorState, setEditorState] = useState<EditorState | null>(null);
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

  // Initialize EditorState on client side
  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  // Update preview content when editorState changes
  useEffect(() => {
    if (editorState?.getCurrentContent().hasText()) {
      const handler = setTimeout(() => {
        import("draftjs-to-html").then(({ default: draftToHtml }) => {
          const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
          setPreviewContent(DOMPurify.sanitize(htmlContent));
        }).catch((error) => {
          console.error("Failed to convert draft to HTML:", error);
          setPreviewContent("");
        });
      }, 500); // Debounce to reduce re-renders
      return () => clearTimeout(handler);
    } else {
      setPreviewContent("");
    }
  }, [editorState]);

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

  const searchCategories = async (query: string) => {
    try {
      setCategoryError("");
      const response: AxiosResponse<BlogCategory[]> = await axios.get(
        `${API_BASE_URL}/blogCategory/search?query=${encodeURIComponent(query)}`,
        { withCredentials: true }
      );
      setBlogCategories(response.data);
    } catch (error: any) {
      setCategoryError("Failed to search blog categories. Please try again.");
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
    if (!editingCategoryTitle.trim()) {
      alert("Please enter a category title");
      return;
    }
    try {
      const response: AxiosResponse<BlogCategory> = await axios.put(
        `${API_BASE_URL}/blogCategory/${editingCategoryId}`,
        { title: editingCategoryTitle },
        { withCredentials: true }
      );
      setBlogCategories(blogCategories.map((cat) => (cat._id === editingCategoryId ? response.data : cat)));
      setEditingCategoryId(null);
      setEditingCategoryTitle("");
      setCategorySuccess(true);
      setTimeout(() => setCategorySuccess(false), 3000);
    } catch (error: any) {
      alert("Failed to update category. Please try again.");
    }
  };

  const handleInsertImage = () => {
    if (!imageLink.trim()) {
      alert("Please enter an image URL");
      return;
    }
    if (!editorState) return;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity("IMAGE", "IMMUTABLE", {
      src: imageLink,
      alt: "Blog Image",
      style: { maxWidth: "100%" },
    });
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const selection = editorState.getSelection();
    const newContentState = Modifier.insertText(contentStateWithEntity, selection, " ", undefined, entityKey);
    const newEditorState = EditorState.push(editorState, newContentState, "insert-characters");
    setEditorState(newEditorState);
    setImageLink("");
  };

  const handleSubmitBlog = async () => {
    if (!editorState || !blogTitle || !editorState.getCurrentContent().hasText() || !blogImageUrl || !blogCategory) {
      alert("Please fill all required fields (title, content, image URL, category)");
      return;
    }
    setIsSubmitting(true);
    try {
      const { default: draftToHtml } = await import("draftjs-to-html");
      const contentState = editorState.getCurrentContent();
      const rawContent = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContent);
      const blogData = {
        title: blogTitle,
        subtitle: blogSubtitle,
        content: htmlContent,
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
    setEditorState(EditorState.createEmpty());
    setBlogCategory("");
    setBlogImageUrl("");
    setEditingPostId(null);
    setImageLink("");
    setPreviewContent("");
  };

  const handleEditBlog = async (post: BlogPost) => {
    setBlogTitle(post.title);
    setBlogSubtitle(post.subtitle);
    const { default: htmlToDraft } = await import("html-to-draftjs");
    const { contentBlocks, entityMap } = htmlToDraft(post.content);
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    setEditorState(EditorState.createWithContent(contentState));
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
      setBlogCategories(blogCategories.filter((category) => !selectedCategories.includes(category.title)));
      setSelectedCategories([]);
    } catch (error: any) {
      alert("Failed to delete categories. Please try again.");
    }
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategoryId(category._id);
    setEditingCategoryTitle(category.title);
  };

  const cancelEditCategory = () => {
    setEditingCategoryId(null);
    setEditingCategoryTitle("");
  };

  const toggleCategorySelection = (category: BlogCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(category.title) ? prev.filter((t) => t !== category.title) : [...prev, category.title]
    );
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

  const handleKeyCommand = (command: string, editorState: EditorState): "handled" | "not-handled" => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    if (!editorState) return;
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType: string) => {
    if (!editorState) return;
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  const getCurrentBlockType = (): string => {
    if (!editorState) return "";
    const selection = editorState.getSelection();
    return editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  };

  const applyCustomStyle = (styleType: string, value: string) => {
    if (!editorState) return;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const newContentState = Modifier.applyInlineStyle(contentState, selection, `${styleType}-${value}`);
      setEditorState(EditorState.push(editorState, newContentState, "change-inline-style"));
    }
  };

  const fontSizes = [12, 14, 16, 18, 24, 36];
  const fontFamilies = ["Arial", "Times New Roman", "Courier New", "Georgia"];
  const colors = ["#000000", "#FF0000", "#00FF00", "#0000FF", "#FFFF00"];
  const alignments = ["left", "center", "right", "justify"];

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
          {activeTab === "create" && editorState ? (
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Insert Image in Content</label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={imageLink}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setImageLink(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter image URL"
                      />
                      <button
                        onClick={handleInsertImage}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        Insert
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content *</label>
                    <div
                      className="bg-white border border-gray-300 rounded-md shadow-sm p-1"
                      style={{ backgroundImage: "linear-gradient(#f5f5f5 1px, transparent 1px)", backgroundSize: "100% 1.5em" }}
                    >
                      <div className="items-center space-x-[8px] space-y-[5px] gap-2 mb-2 bg-gray-100 p-2 rounded-t-md border-b border-gray-300">
                        <button
                          onClick={() => toggleInlineStyle("BOLD")}
                          className={`p-1 rounded ${
                            editorState.getCurrentInlineStyle().has("BOLD")
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Bold"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 11h3.5a3.5 3.5 0 110 7H9v-7m0-4h3a3 3 0 013 3H9V4z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("ITALIC")}
                          className={`p-1 rounded ${
                            editorState.getCurrentInlineStyle().has("ITALIC")
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Italic"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4l-4 16m8-16l-4 16" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("UNDERLINE")}
                          className={`p-1 rounded ${
                            editorState.getCurrentInlineStyle().has("UNDERLINE")
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Underline"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5v6a3 3 0 006 0V5M6 19h12" />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleInlineStyle("STRIKETHROUGH")}
                          className={`p-1 rounded ${
                            editorState.getCurrentInlineStyle().has("STRIKETHROUGH")
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Strikethrough"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12h8m-8 0H4" />
                          </svg>
                        </button>
                        <select
                          onChange={(e) => applyCustomStyle("FONTSIZE", e.target.value)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Font Size"
                        >
                          <option value="">Size</option>
                          {fontSizes.map((size) => (
                            <option key={size} value={size}>
                              {size}px
                            </option>
                          ))}
                        </select>
                        <select
                          onChange={(e) => applyCustomStyle("FONTFAMILY", e.target.value)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Font Family"
                        >
                          <option value="">Font</option>
                          {fontFamilies.map((font) => (
                            <option key={font} value={font}>
                              {font}
                            </option>
                          ))}
                        </select>
                        <select
                          onChange={(e) => applyCustomStyle("COLOR", e.target.value)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Text Color"
                        >
                          <option value="">Color</option>
                          {colors.map((color) => (
                            <option key={color} value={color} style={{ color }}>
                              {color}
                            </option>
                          ))}
                        </select>
                        <select
                          onChange={(e) => applyCustomStyle("BACKGROUND", e.target.value)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Background Color"
                        >
                          <option value="">Bg</option>
                          {colors.map((color) => (
                            <option key={color} value={color} style={{ backgroundColor: color, color: color === "#FFFF00" ? "#000" : "#FFF" }}>
                              {color}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => toggleBlockType("unordered-list-item")}
                          className={`p-1 rounded ${
                            getCurrentBlockType() === "unordered-list-item"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Bulleted List"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5h12m-12 7h12m-12 7h12m-15-14h-3m0 7h-3m0 7h-3"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => toggleBlockType("ordered-list-item")}
                          className={`p-1 rounded ${
                            getCurrentBlockType() === "ordered-list-item"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Numbered List"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 5h14M7 12h14M7 19h14M3 6h2M3 13h2M3 20h2" />
                          </svg>
                        </button>
                        <select
                          onChange={(e) => toggleBlockType(e.target.value)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Headings"
                        >
                          <option value="">Heading</option>
                          {["header-one", "header-two", "header-three", "header-four", "header-five", "header-six"].map(
                            (h, i) => (
                              <option key={h} value={h}>
                                H{i + 1}
                              </option>
                            )
                          )}
                        </select>
                        <button
                          onClick={() => toggleBlockType("blockquote")}
                          className={`p-1 rounded ${
                            getCurrentBlockType() === "blockquote"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                          }`}
                          title="Blockquote"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2h2"
                            />
                          </svg>
                        </button>
                        <select
                          onChange={(e) => toggleBlockType(`align-${e.target.value}`)}
                          className="px-1 py-0.5 text-sm border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          title="Alignment"
                        >
                          <option value="">Align</option>
                          {alignments.map((align) => (
                            <option key={align} value={align}>
                              {align.charAt(0).toUpperCase() + align.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="p-4 min-h-[300px]">
                        <Editor
                          editorState={editorState}
                          onChange={setEditorState}
                          handleKeyCommand={handleKeyCommand}
                          placeholder="Write your blog content here..."
                          customStyleMap={{
                            ...fontSizes.reduce(
                              (map, size) => ({
                                ...map,
                                [`FONTSIZE-${size}`]: { fontSize: `${size}px` },
                              }),
                              {}
                            ),
                            ...fontFamilies.reduce(
                              (map, font) => ({
                                ...map,
                                [`FONTFAMILY-${font}`]: { fontFamily: font },
                              }),
                              {}
                            ),
                            ...colors.reduce(
                              (map, color) => ({
                                ...map,
                                [`COLOR-${color}`]: { color },
                                [`BACKGROUND-${color}`]: { backgroundColor: color },
                              }),
                              {}
                            ),
                            "align-left": { textAlign: "left" },
                            "align-center": { textAlign: "center" },
                            "align-right": { textAlign: "right" },
                            "align-justify": { textAlign: "justify" },
                          }}
                        />
                      </div>
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
            <div className="space-y-6  h-[70vh]">
              <h2 className="text-xl font-semibold">Manage Blog Posts</h2>
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
                    placeholder="Search blog posts..."
                  />
                </div>
              </div>
              {blogError ? (
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
                      <p className="text-sm text-red-700">{blogError}</p>
                    </div>
                  </div>
                </div>
              ) : blogPosts.length === 0 ? (
                <p className="text-gray-500 italic">No blog posts yet. Create your first blog post.</p>
              ) : (
                <div className="space-y-4 ">
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
                    placeholder="Search blog categories..."
                  />
                </div>
              </div>
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
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
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
                        className={`p-3 rounded-lg border cursor-pointer flex flex-col items-center ${
                          selectedCategories.includes(category.title) ? "ring-2 ring-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                        }`}
                      >
                        <div className="flex justify-between w-full">
                          <span className="text-sm font-medium text-center">{category.title}</span>
                          <button
                            onClick={(e: React.MouseEvent) => {
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
        {(blogSuccess || categorySuccess) && (
          <div className="fixed top-4 right-4 z-50">
            <div className="bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              {blogSuccess
                ? editingPostId
                  ? "Blog post updated successfully!"
                  : "Blog post published successfully!"
                : "Category operation successful!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsManagement;