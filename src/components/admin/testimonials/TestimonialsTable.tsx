"use client";

import { useState } from "react";
import type { Column } from "@/types/data-table";
import { DataTable } from "../packages/data-table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Pencil, Trash2, Plus, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TestimonialDialog } from "./TestimonialDialog";
import { deleteTestimonial } from "@/app/actions/testimonialActions";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  comment: string;
  rating: number;
  service: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export default function TestimonialsTable({
  initialTestimonials,
}: {
  initialTestimonials: Testimonial[];
}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | undefined>(undefined); // Changed from null to undefined
  const [showDialog, setShowDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    const result = await deleteTestimonial(id);
    if (result.success) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      toast({
        title: "Success",
        description: "Testimonial deleted successfully",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
    setDeleteDialogOpen(false);
    setTestimonialToDelete(null);
  };

  const columns: Column<Testimonial>[] = [
    {
      key: "name",
      label: "Customer",
    },
    {
      key: "role",
      label: "Role",
    },
    {
      key: "rating",
      label: "Rating",
      render: (value) => (
        <div className="flex">
          {Array.from({ length: value }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-primary text-primary" />
          ))}
        </div>
      ),
    },
    {
      key: "service",
      label: "Service",
    },
    {
      key: "createdAt",
      label: "Created",
      render: (value) => format(new Date(value), "PPp"),
    },
    {
      key: "active",
      label: "Status",
      render: (value) => (value ? "Active" : "Inactive"),
    },
    {
      key: "id",
      label: "Actions",
      render: (_, testimonial) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setEditingTestimonial(testimonial);
              setShowDialog(true);
            }}
          >
            <Pencil className="w-4 h-4" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setTestimonialToDelete(testimonial.id);
              setDeleteDialogOpen(true);
            }}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="mb-4">
        <Button
          onClick={() => {
            setEditingTestimonial(undefined); // Changed from null to undefined
            setShowDialog(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>

      <DataTable columns={columns} data={testimonials} />

      <TestimonialDialog
        open={showDialog}
        onOpenChange={setShowDialog}
        testimonial={editingTestimonial}
        onSuccess={(updatedTestimonial) => {
          if (editingTestimonial) {
            setTestimonials(
              testimonials.map((t) =>
                t.id === updatedTestimonial.id ? updatedTestimonial : t
              )
            );
          } else {
            setTestimonials([updatedTestimonial, ...testimonials]);
          }
          setShowDialog(false);
          setEditingTestimonial(undefined);
        }}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              testimonial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => testimonialToDelete && handleDelete(testimonialToDelete)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
