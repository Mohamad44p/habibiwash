"use client";

import { useState } from "react";
import { Package } from "@/types/package";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { deletePackage } from "@/app/actions/packagesActions";
import { DataTable } from "./data-table";
import Image from "next/image";

export default function PackagesTable({
  initialPackages,
}: {
  initialPackages: Package[];
}) {
  const [packages, setPackages] = useState(initialPackages);

  const columns: ColumnDef<Package>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ row }) => (
        <Image
          src={row.original.image || "/Logo1.png"}
          alt={row.original.name}
          width={40}
          height={40}
          className="object-cover"
        />
      ),
    },
    {
      accessorKey: "subPackages",
      header: "Sub Packages",
      cell: ({ row }) => row.original.subPackages.length,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/packages/${row.original.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this package?")) {
                await deletePackage(row.original.id!);
                setPackages(packages.filter((p) => p.id !== row.original.id));
              }
            }}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={packages}
      filterColumn="name"
      filterPlaceholder="Filter packages..."
    />
  );
}
