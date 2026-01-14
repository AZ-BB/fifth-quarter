"use client";

import { useState, useEffect } from "react";
import defaultContent from "./content.json";

// Form data structure with dynamic capabilities
interface FormData {
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroButton1: string;
  heroButton2: string;
  
  // Capabilities Section
  capabilitiesSubtitle: string;
  capabilities: Array<{ title: string; description: string }>;
  
  // About Section
  aboutTitle: string;
  aboutDescription: string;
  
  // Approach Section
  approachTitle: string;
  approachSubtitle: string;
  approachParagraphs: string[];
  
  // Contact Section
  contactTitle: string;
  contactEmail: string;
  contactLinkedinUrl: string;
}

// Transform JSON structure to formData structure
function transformContentToFormData(content: typeof defaultContent): FormData {
  const formData: FormData = {
    // Hero Section
    heroTitle: content.hero.title,
    heroSubtitle: content.hero.subtitle,
    heroButton1: content.hero.button1,
    heroButton2: content.hero.button2,
    
    // Capabilities Section - now dynamic array
    capabilitiesSubtitle: content.capabilities.subtitle,
    capabilities: content.capabilities.items.map(item => ({
      title: item.title,
      description: item.description,
    })),
    
    // About Section
    aboutTitle: content.about.title,
    aboutDescription: content.about.description,
    
    // Approach Section
    approachTitle: content.approach.title,
    approachSubtitle: content.approach.subtitle,
    approachParagraphs: [...content.approach.paragraphs],
    
    // Contact Section
    contactTitle: content.contact.title,
    contactEmail: content.contact.email,
    contactLinkedinUrl: (content.contact as any).linkedinUrl || "",
  };
  return formData;
}

// Transform formData structure back to JSON structure
function transformFormDataToContent(formData: FormData): typeof defaultContent {
  return {
    hero: {
      title: formData.heroTitle,
      subtitle: formData.heroSubtitle,
      button1: formData.heroButton1,
      button2: formData.heroButton2,
    },
    capabilities: {
      subtitle: formData.capabilitiesSubtitle,
      items: formData.capabilities.map(item => ({
        title: item.title,
        description: item.description,
      })),
    },
    about: {
      title: formData.aboutTitle,
      description: formData.aboutDescription,
    },
    approach: {
      title: formData.approachTitle,
      subtitle: formData.approachSubtitle,
      paragraphs: [...formData.approachParagraphs],
    },
    contact: {
      title: formData.contactTitle,
      email: formData.contactEmail,
      linkedinUrl: formData.contactLinkedinUrl,
    },
  };
}

// CMS Form Component
function CMSDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState(() => transformContentToFormData(defaultContent));
  const [isLoading, setIsLoading] = useState(true);

  // Load data from key-value store API on mount
  useEffect(() => {
    const loadContent = async () => {
      try {
        // Fetch from API
        const response = await fetch("/api/content");
        if (response.ok) {
          const data = await response.json();
          setFormData(transformContentToFormData(data));
        } else {
          // Fallback to JSON file
          setFormData(transformContentToFormData(defaultContent));
        }
      } catch (error) {
        console.error("Error loading content, using fallback:", error);
        // Fallback to JSON file
        setFormData(transformContentToFormData(defaultContent));
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCapabilityChange = (index: number, field: "title" | "description", value: string) => {
    setFormData((prev) => {
      const updatedCapabilities = [...prev.capabilities];
      updatedCapabilities[index] = {
        ...updatedCapabilities[index],
        [field]: value,
      };
      return { ...prev, capabilities: updatedCapabilities };
    });
  };

  const handleAddCapability = () => {
    setFormData((prev) => ({
      ...prev,
      capabilities: [...prev.capabilities, { title: "", description: "" }],
    }));
  };

  const handleRemoveCapability = (index: number) => {
    if (formData.capabilities.length <= 1) {
      alert("You must have at least one capability.");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      capabilities: prev.capabilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Transform formData back to JSON structure
    const contentData = transformFormDataToContent(formData);
    
    try {
      // Save content to key-value store
      const saveResponse = await fetch("/api/content", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentData),
      });

      if (!saveResponse.ok) {
        const errorData = await saveResponse.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to save content");
      }

      // Revalidate the landing page to show updated content
      const revalidateResponse = await fetch("/api/revalidate", {
        method: "POST",
      });

      if (revalidateResponse.ok) {
        alert("Content saved successfully! The landing page will be updated within a few seconds.");
      } else {
        // Content was saved but revalidation failed - still show success
        console.warn("Content saved but revalidation failed");
        alert("Content saved successfully! The page will update automatically within 1 hour.");
      }
    } catch (error) {
      console.error("Error saving content:", error);
      alert(`Failed to save content: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleReset = async () => {
    if (confirm("Are you sure you want to reset all content to default values? This cannot be undone.")) {
      try {
        // Reset to default content in key-value store
        const saveResponse = await fetch("/api/content", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(defaultContent),
        });

        if (!saveResponse.ok) {
          throw new Error("Failed to reset content");
        }

        // Revalidate the landing page
        await fetch("/api/revalidate", {
          method: "POST",
        });

        setFormData(transformContentToFormData(defaultContent));
        alert("Content reset to default values! The landing page will be updated within a few seconds.");
      } catch (error) {
        console.error("Error resetting content:", error);
        alert("Failed to reset content. Please try again.");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5a5a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  const sections = [
    { id: "hero", label: "Hero Section" },
    { id: "capabilities", label: "Capabilities" },
    { id: "about", label: "About" },
    { id: "approach", label: "Approach" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-[#2d5a5a] px-8 py-6">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-playfairDisplay font-bold text-white">
                Content Management System
              </h1>
              <button
                onClick={onLogout}
                className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex overflow-x-auto">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeSection === section.id
                      ? "border-[#2d5a5a] text-[#2d5a5a] bg-white"
                      : "border-transparent text-gray-600 hover:text-[#2d5a5a] hover:border-gray-300"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8">
            {/* Hero Section */}
            {activeSection === "hero" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Hero Section</h2>
                
                <div>
                  <label htmlFor="heroTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Main Heading
                  </label>
                  <input
                    type="text"
                    id="heroTitle"
                    value={formData.heroTitle}
                    onChange={(e) => handleInputChange("heroTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="heroSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle / Description
                  </label>
                  <textarea
                    id="heroSubtitle"
                    rows={4}
                    value={formData.heroSubtitle}
                    onChange={(e) => handleInputChange("heroSubtitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent resize-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="heroButton1" className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Button Text
                    </label>
                    <input
                      type="text"
                      id="heroButton1"
                      value={formData.heroButton1}
                      onChange={(e) => handleInputChange("heroButton1", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="heroButton2" className="block text-sm font-medium text-gray-700 mb-2">
                      Secondary Button Text
                    </label>
                    <input
                      type="text"
                      id="heroButton2"
                      value={formData.heroButton2}
                      onChange={(e) => handleInputChange("heroButton2", e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Capabilities Section */}
            {activeSection === "capabilities" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Capabilities Section</h2>
                
                <div>
                  <label htmlFor="capabilitiesSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    id="capabilitiesSubtitle"
                    value={formData.capabilitiesSubtitle}
                    onChange={(e) => handleInputChange("capabilitiesSubtitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div className="space-y-6 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-900">Capability Cards</h3>
                    <button
                      type="button"
                      onClick={handleAddCapability}
                      className="px-4 py-2 bg-[#2d5a5a] text-white text-sm font-medium rounded-md hover:bg-[#3d7a7a] transition-colors"
                    >
                      + Add Capability
                    </button>
                  </div>
                  
                  {formData.capabilities.map((capability, index) => (
                    <div key={index} className="bg-gray-50 p-6 rounded-lg border border-gray-200 relative">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="text-md font-semibold text-[#2d5a5a]">
                          Capability {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => handleRemoveCapability(index)}
                          className="px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                          </label>
                          <input
                            type="text"
                            value={capability.title}
                            onChange={(e) => handleCapabilityChange(index, "title", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                            placeholder="Enter capability title"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                          </label>
                          <textarea
                            rows={3}
                            value={capability.description}
                            onChange={(e) => handleCapabilityChange(index, "description", e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent resize-none"
                            placeholder="Enter capability description"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* About Section */}
            {activeSection === "about" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">About Section</h2>
                
                <div>
                  <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    id="aboutTitle"
                    value={formData.aboutTitle}
                    onChange={(e) => handleInputChange("aboutTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="aboutDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    id="aboutDescription"
                    rows={6}
                    value={formData.aboutDescription}
                    onChange={(e) => handleInputChange("aboutDescription", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent resize-none"
                  />
                </div>
              </div>
            )}

            {/* Approach Section */}
            {activeSection === "approach" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Approach Section</h2>
                
                <div>
                  <label htmlFor="approachTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    id="approachTitle"
                    value={formData.approachTitle}
                    onChange={(e) => handleInputChange("approachTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="approachSubtitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    id="approachSubtitle"
                    value={formData.approachSubtitle}
                    onChange={(e) => handleInputChange("approachSubtitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Content Paragraphs</h3>
                  
                  {formData.approachParagraphs.map((paragraph, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Paragraph {index + 1}
                      </label>
                      <textarea
                        rows={4}
                        value={paragraph}
                        onChange={(e) => {
                          const updatedParagraphs = [...formData.approachParagraphs];
                          updatedParagraphs[index] = e.target.value;
                          setFormData((prev) => ({ ...prev, approachParagraphs: updatedParagraphs }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Section */}
            {activeSection === "contact" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Contact Section</h2>
                
                <div>
                  <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    id="contactTitle"
                    value={formData.contactTitle}
                    onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="contactLinkedinUrl" className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    id="contactLinkedinUrl"
                    value={formData.contactLinkedinUrl}
                    onChange={(e) => handleInputChange("contactLinkedinUrl", e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                    placeholder="https://linkedin.com/company/your-company"
                  />
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex gap-4">
              <button
                type="submit"
                className="px-8 py-3 bg-[#2d5a5a] text-white font-medium rounded-md hover:bg-[#3d7a7a] transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-gray-200 text-gray-700 font-medium rounded-md hover:bg-gray-300 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Check if user is already logged in via API
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/check");
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
      } else {
        setError(data.error || "Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsAuthenticated(false);
      setUsername("");
      setPassword("");
      setError("");
    }
  };

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2d5a5a] mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <CMSDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-center text-4xl font-playfairDisplay font-bold text-[#2d5a5a]">
            Admin Login
          </h1>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                placeholder="Enter username"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d5a5a] focus:border-transparent"
                placeholder="Enter password"
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-[#2d5a5a] hover:bg-[#3d7a7a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d5a5a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-500">
              Enter your admin credentials to continue
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

