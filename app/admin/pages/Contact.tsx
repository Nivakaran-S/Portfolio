import React, { useState, useEffect } from "react";
import axios from "axios";

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  title: string;
  message: string;
  createdAt: string;
}

interface NewsletterSubscriber {
  _id: string;
  email: string;
  createdAt: string;
}

const Contact = () => {
  // State for contact messages
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState<boolean>(true);
  const [messageError, setMessageError] = useState<string>("");

  // State for newsletter subscribers
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [loadingSubscribers, setLoadingSubscribers] = useState<boolean>(true);
  const [subscriberError, setSubscriberError] = useState<string>("");

  // UI state
  const [activeTab, setActiveTab] = useState<"messages" | "subscribers">("messages");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch contact messages from API
  const fetchContactMessages = async () => {
    try {
      setLoadingMessages(true);
      const response = await axios.get("https://new-portfolio-backend-roan.vercel.app/contact");
      setMessages(response.data);
        console.log("Fetched contact messages:", response.data);
      setMessageError("");
    } catch (err) {
      console.error("Failed to fetch contact messages:", err);
      setMessageError("Failed to load contact messages. Please try again.");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Fetch newsletter subscribers from API
  const fetchSubscribers = async () => {
    try {
      setLoadingSubscribers(true);
      const response = await axios.get("https://new-portfolio-backend-roan.vercel.app/newsletter");
      setSubscribers(response.data);
      console.log("Fetched subscribers:", response.data);
      setSubscriberError("");
    } catch (err) {
      console.error("Failed to fetch subscribers:", err);
      setSubscriberError("Failed to load subscribers. Please try again.");
    } finally {
      setLoadingSubscribers(false);
    }
  };

  // Delete a contact message
  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(`https://new-portfolio-backend-roan.vercel.app/contact/${id}`);
      setMessages(messages.filter(message => message._id !== id));
    } catch (err) {
      console.error("Failed to delete message:", err);
      alert("Failed to delete message. Please try again.");
    }
  };

  // Delete a subscriber
  const deleteSubscriber = async (id: string) => {
    try {
      await axios.delete(`https://new-portfolio-backend-roan.vercel.app/newsletter/${id}`);
      setSubscribers(subscribers.filter(subscriber => subscriber._id !== id));
    } catch (err) {
      console.error("Failed to delete subscriber:", err);
      alert("Failed to delete subscriber. Please try again.");
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchContactMessages();
    fetchSubscribers();
  }, []);

  // Filter messages based on search term
  const filteredMessages = messages.filter(message =>
    message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter subscribers based on search term
  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full text-black bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "messages" ? "text-blue-600 border-b-2 border-blue-600" : "cursor-pointer text-gray-600"}`}
            onClick={() => setActiveTab("messages")}
          >
            Contact Messages
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "subscribers" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 cursor-pointer"}`}
            onClick={() => setActiveTab("subscribers")}
          >
            Newsletter Subscribers
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
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
                placeholder={`Search ${activeTab === "messages" ? "messages" : "subscribers"}...`}
              />
            </div>
          </div>

          {activeTab === "messages" ? (
            <div className="min-h-[63vh]">
              <h2 className="text-xl font-semibold mb-4">Contact Messages</h2>
              
              {loadingMessages ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : messageError ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{messageError}</p>
                    </div>
                  </div>
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        {searchTerm ? "No messages match your search." : "No contact messages yet."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredMessages.map((message) => (
                    <div key={message._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{message.name}</h3>
                          <p className="text-sm text-gray-600">{message.email}</p>
                          <p className="text-sm text-gray-600 mt-1">{formatDate(message.createdAt)}</p>
                        </div>
                        <button
                          onClick={() => deleteMessage(message._id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      <div className="mt-3">
                        <h4 className="font-medium text-gray-800">{message.title}</h4>
                        <p className="text-gray-700 mt-1 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="min-h-[63vh]">
              <h2 className="text-xl font-semibold mb-4">Newsletter Subscribers</h2>
              
              {loadingSubscribers ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : subscriberError ? (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{subscriberError}</p>
                    </div>
                  </div>
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        {searchTerm ? "No subscribers match your search." : "No newsletter subscribers yet."}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                  <ul className="divide-y divide-gray-200">
                    {filteredSubscribers.map((subscriber) => (
                      <li key={subscriber._id}>
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <p className="text-sm font-medium text-blue-600 truncate">
                                {subscriber.email}
                              </p>
                            </div>
                            <div className="ml-2 flex-shrink-0 flex">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {formatDate(subscriber.createdAt)}
                              </p>
                              <button
                                onClick={() => deleteSubscriber(subscriber._id)}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;