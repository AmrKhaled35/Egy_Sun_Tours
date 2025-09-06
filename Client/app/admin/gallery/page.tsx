"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
  Video,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { apiClient } from "@/lib/api";

interface GalleryItem {
  id: number;
  image: string;
  alt: string;
  category: string;
  type: "image" | "video";
}

export default function GalleryAdmin() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    image: "",
    alt: "",
    category: "",
    type: "image" as "image" | "video",
  });

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const data = await apiClient.getGalleryItems();
        setGalleryItems(data.results);
      } catch (error) {
        console.error("Error fetching trips:", error);
        alert("Failed to fetch GalleryItems from API");
      }
    };

    fetchGalleryItems();
  }, []);

  const resetForm = () => {
    setFormData({
      image: "",
      alt: "",
      category: "",
      type: "image",
    });
    setEditingItem(null);
    setShowForm(false);
  };

  const handleEdit = (item: GalleryItem) => {
    setFormData({
      image: item.image,
      alt: item.alt,
      category: item.category,
      type: item.type,
    });
    setEditingItem(item);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/gallery/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTI3MzE4LCJpYXQiOjE3NTcxMjM3MTgsImp0aSI6IjYwZGQyZTkxYjFjYTRiN2Q4Y2M1N2UxNGMxNzMyODc3IiwidXNlcl9pZCI6IjEifQ.2JgqXNjhG_7MB_VcHkVnkDy22cH0T8FCbr7tizgg5DE"}`,
          },
        });

        if (!res.ok) throw new Error("Failed to delete item");

        setGalleryItems(galleryItems.filter((item) => item.id !== id));
        alert("Gallery item deleted successfully!");
      } catch (error) {
        console.error("Error deleting gallery item:", error);
        alert("Error deleting item. Please try again.");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.image || !formData.alt || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const data = new FormData();
      data.append("image", formData.image); 
      data.append("alt", formData.alt);
      data.append("category", formData.category);
      data.append("type", formData.type || "image");

      let res;
      if (editingItem) {
        res = await fetch(
          `http://127.0.0.1:8000/api/gallery/${editingItem.id}/`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTI3MzE4LCJpYXQiOjE3NTcxMjM3MTgsImp0aSI6IjYwZGQyZTkxYjFjYTRiN2Q4Y2M1N2UxNGMxNzMyODc3IiwidXNlcl9pZCI6IjEifQ.2JgqXNjhG_7MB_VcHkVnkDy22cH0T8FCbr7tizgg5DE"}`,
            },
            body: data,
          }
        );
      } else {
        res = await fetch("http://127.0.0.1:8000/api/gallery/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzU3MTI3MzE4LCJpYXQiOjE3NTcxMjM3MTgsImp0aSI6IjYwZGQyZTkxYjFjYTRiN2Q4Y2M1N2UxNGMxNzMyODc3IiwidXNlcl9pZCI6IjEifQ.2JgqXNjhG_7MB_VcHkVnkDy22cH0T8FCbr7tizgg5DE"}`,
          },
          body: data,
        });
      }

      if (!res.ok) throw new Error("Failed to save item");

      const savedItem = await res.json();

      if (editingItem) {
        setGalleryItems(
          galleryItems.map((item) =>
            item.id === editingItem.id ? savedItem : item
          )
        );
        alert("Gallery item updated successfully!");
      } else {
        setGalleryItems([...galleryItems, savedItem]);
        alert("Gallery item added successfully!");
      }

      resetForm();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      alert("Error saving item. Please try again.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Gallery Management
          </h1>
          <p className="text-gray-600 mt-2">Manage photos and videos</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </div>
      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingItem ? "Edit Media" : "Add New Media"}
              </h2>
              <Button variant="ghost" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Media URL *
                  </label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setFormData({
                            ...formData,
                            image: file,
                          });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="border border-gray-300 rounded p-2 w-full"
                    // required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <Input
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Pyramids, Temples"
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Alt Text *
                  </label>
                  <Input
                    value={formData.alt}
                    onChange={(e) =>
                      setFormData({ ...formData, alt: e.target.value })
                    }
                    placeholder="Describe the image/video"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        type: e.target.value as "image" | "video",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                    required
                  >
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingItem ? "Update Media" : "Add Media"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Gallery Grid */}
      <div>
        <h2 className="text-xl font-bold mb-6">
          Gallery Items ({galleryItems.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {galleryItems.map((item) => (
            <Card
              key={item.id}
              className="border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-4">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.image}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Video className="w-8 h-8 text-white" />
                      </div>
                    </>
                  ) : (
                    <img
                      src={item.image}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {item.type === "video" ? (
                        <Video className="w-4 h-4 text-gray-500" />
                      ) : (
                        <ImageIcon className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-xs text-gray-500 capitalize">
                        {item.type}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.alt}
                  </p>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 hover:text-red-700"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
