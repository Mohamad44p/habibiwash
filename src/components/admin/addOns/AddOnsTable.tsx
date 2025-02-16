"use client";

import { useState } from "react";
import { AddOn } from "@/types/addOn";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { deleteAddOn } from "@/app/actions/addOnsActions";
import { DataTable } from "../packages/data-table";
import { AVAILABLE_ICONS} from "@/lib/icons/icons";
import { LucideIcon } from "lucide-react";

export default function AddOnsTable({
  initialAddOns,
}: {
  initialAddOns: AddOn[];
}) {
  const [addOns, setAddOns] = useState(initialAddOns);

  const columns: ColumnDef<AddOn>[] = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => `$${row.original.price.toFixed(2)}`,
    },
    {
      accessorKey: "icon",
      header: "Icon",
      cell: ({ row }) => {
        const IconComponent = AVAILABLE_ICONS[row.original.icon] as LucideIcon;
        return IconComponent ? <IconComponent className="w-5 h-5 text-primary" /> : null;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/add-ons/${row.original.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            size="sm"
            onClick={async () => {
              if (confirm("Are you sure you want to delete this add-on?")) {
                await deleteAddOn(row.original.id!);
                setAddOns(addOns.filter((a) => a.id !== row.original.id));
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
      data={addOns}
      filterColumn="name"
      filterPlaceholder="Filter add-ons..."
    />
  );
}
