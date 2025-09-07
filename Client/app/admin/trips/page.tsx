"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Clock,
  Users,
  MapPin,
  Save,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { allTrips } from "@/data/trips-data";
import { apiClient } from "@/lib/api";

interface Trip {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  price: string;
  image: string;
  category: string;
  highlights: string[];
  timeline: {
    time: string;
    title: string;
    description: string;
    image: string;
  }[];
  gallery: string[];
}

export default function TripsAdmin() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [formData, setFormData] = useState<Partial<Trip>>({
    title: "",
    shortDescription: "",
    fullDescription: "",
    duration: "",
    price: "",
    image: "",
    category: "",
    highlights: [""],
    timeline: [{ time: "", title: "", description: "", image: "" }],
    gallery: [""],
  });

  useEffect(() => {
    const fetchtrips = async () => {
      try {
        const res = await fetch("https://egysuntours-production.up.railway.app/api/trips/");
        if (!res.ok) throw new Error("Failed to fetch trips");
        const data = await res.json();
        setTrips(data.results);
      } catch (err) {
        console.error("Error fetching trips:", err);
      }
    };

    fetchtrips();
  }, []);

  const resetForm = () => {
    setFormData({
      title: "",
      shortDescription: "",
      fullDescription: "",
      duration: "",
      price: "",
      image: undefined,
      category: "",
      highlights: [""],
      timeline: [{ time: "", title: "", description: "", image: "" }],
      gallery: [""],
    });
    setEditingTrip(null);
    setShowForm(false);
  };

  const handleEdit = (trip: Trip) => {
    setFormData(trip);
    setEditingTrip(trip);
    setShowForm(true);
  };
  const token = localStorage.getItem("accessToken");
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`https://egysuntours-production.up.railway.app/api/trips/${id}/`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const updatedTrips = trips.filter((trip) => trip.id !== id);
          setTrips(updatedTrips);
          alert("Trip deleted successfully!");
        } else {
          alert("Error deleting trip from API.");
        }
      } catch (error) {
        console.error("Error deleting trip:", error);
        alert("Error deleting trip. Please try again.");
      }
    }
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.title || !formData.shortDescription) {
      alert("Please fill in all required fields");
      return;
    }
  
    try {
      const payload = new FormData();
      payload.append("title", formData.title || "");
      payload.append("shortDescription", formData.shortDescription || "");
      payload.append("fullDescription", formData.fullDescription || "");
      payload.append("duration", formData.duration || "");
      payload.append("price", formData.price || "");
      payload.append("category", formData.category || "");
      const image = formData.image as File | string | undefined;
      if (image && image instanceof File) {
        payload.append("image", image);
        console.log("Image file appended to payload");
      }
      let response;
      if (editingTrip) {
        // console.log(`http://127.0.0.1:8000/api/trips/${editingTrip.id}/`);
        response = await fetch(`https://egysuntours-production.up.railway.app/api/trips/${editingTrip.id}/`, {
          method: "PATCH",
          body: payload,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      } else {
        response = await fetch("https://egysuntours-production.up.railway.app/api/trips/", {
          method: "POST",
          body: payload,
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
      }
  
      if (!response.ok) {
        throw new Error("Failed to save trip");
      }
  
      const result = await response.json();
  
      setTrips(
        editingTrip
          ? trips.map((trip) => (trip.id === editingTrip.id ? result : trip))
          : [...trips, result]
      );
  
      alert(editingTrip ? "Trip updated successfully!" : "Trip created successfully!");
      resetForm();
    } catch (error) {
      console.error(error);
      alert("Error saving trip. Please check the console for details.");
    }
  };
  

  const handleAddHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...(formData.highlights || []), ""],
    });
  };

  const handleRemoveHighlight = (index: number) => {
    const newHighlights =
      formData.highlights?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleAddTimelineStep = () => {
    setFormData({
      ...formData,
      timeline: [
        ...(formData.timeline || []),
        { time: "", title: "", description: "", image: "" },
      ],
    });
  };

  const handleRemoveTimelineStep = (index: number) => {
    const newTimeline = formData.timeline?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, timeline: newTimeline });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...(formData.highlights || [])];
    newHighlights[index] = value;
    setFormData({ ...formData, highlights: newHighlights });
  };

  const handleTimelineChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const newTimeline = [...(formData.timeline || [])];
    newTimeline[index] = { ...newTimeline[index], [field]: value };
    setFormData({ ...formData, timeline: newTimeline });
  };

  const handleAddGalleryImage = () => {
    setFormData({
      ...formData,
      gallery: [...(formData.gallery || []), ""],
    });
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = (formData.gallery || []).filter((_, i) => i !== index);
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryChange = (index: number, value: string) => {
    const newGallery = [...(formData.gallery || [])];
    newGallery[index] = value;
    setFormData({ ...formData, gallery: newGallery });
  };

  const handleGalleryUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newGallery = [...(formData.gallery || [])];
        newGallery[index] = reader.result as string;
        setFormData({ ...formData, gallery: newGallery });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trips Management</h1>
          <p className="text-gray-600 mt-2">Manage tours and experiences</p>
        </div>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-black text-white hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Trip
        </Button>
      </div>

      {showForm && (
        <Card className="border-2 border-black">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">
                {editingTrip ? "Edit Trip" : "Add New Trip"}
              </h2>
              <Button variant="ghost" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Trip Name *
                  </label>
                  <Input
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="Enter trip name"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <Input
                    value={formData.category || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    placeholder="e.g., Historical, Cultural"
                    className="border-gray-300"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Duration *
                  </label>
                  <Input
                    value={formData.duration || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., Full Day (8 hours)"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price *
                  </label>
                  <Input
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    placeholder="e.g., From $80 per person"
                    className="border-gray-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Main Image *
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
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Main"
                      className="mt-2 w-40 h-40 object-cover rounded"
                    />
                  )}
                </div>
              </div>

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Short Description *
                </label>
                <Textarea
                  value={formData.shortDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  placeholder="Brief description for cards"
                  className="border-gray-300"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Description *
                </label>
                <Textarea
                  value={formData.fullDescription || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fullDescription: e.target.value,
                    })
                  }
                  placeholder="Detailed description for trip page"
                  className="border-gray-300"
                  rows={4}
                  required
                />
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  What's Included
                </label>
                {formData.highlights?.map((highlight, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <Input
                      value={highlight}
                      onChange={(e) =>
                        handleHighlightChange(index, e.target.value)
                      }
                      placeholder="Enter highlight"
                      className="border-gray-300"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveHighlight(index)}
                      className="text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddHighlight}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Highlight
                </Button>
              </div>

              {/* Timeline */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Journey Timeline
                </label>
                {formData.timeline?.map((step, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 p-4 rounded-lg mb-4"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Step {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleRemoveTimelineStep(index)}
                        className="text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <Input
                        value={step.time}
                        onChange={(e) =>
                          handleTimelineChange(index, "time", e.target.value)
                        }
                        placeholder="Time (e.g., 9:00 AM)"
                        className="border-gray-300"
                      />
                      <Input
                        value={step.title}
                        onChange={(e) =>
                          handleTimelineChange(index, "title", e.target.value)
                        }
                        placeholder="Step title"
                        className="border-gray-300"
                      />
                    </div>
                    <Textarea
                      value={step.description}
                      onChange={(e) =>
                        handleTimelineChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Step description"
                      className="border-gray-300 mb-4"
                      rows={2}
                    />
                    <Input
                      value={step.image}
                      onChange={(e) =>
                        handleTimelineChange(index, "image", e.target.value)
                      }
                      placeholder="Image URL"
                      className="border-gray-300"
                    />
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddTimelineStep}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Timeline Step
                </Button>
              </div>

              {/* Gallery */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Gallery
                </label>
                {(formData.gallery || [""]).map((img, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleGalleryUpload(e, index)}
                      className="border-gray-300"
                    />
                    {img ? (
                      <img
                        src={img}
                        alt={`Gallery ${index + 1}`}
                        className="w-16 h-16 object-cover rounded"
                      />
                    ) : null}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => handleRemoveGalleryImage(index)}
                      className="text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddGalleryImage}
                  className="mt-2"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-gray-800"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {editingTrip ? "Update Trip" : "Save Trip"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Trips */}
      <div>
        <h2 className="text-xl font-bold mb-6">
          Existing Trips ({trips.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden">
                  <img
                    src={trip.image}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {trip.category}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(trip)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(trip.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900">{trip.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {trip.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{trip.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      <span>{trip.price}</span>
                    </div>
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
