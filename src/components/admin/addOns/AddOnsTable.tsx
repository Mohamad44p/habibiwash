"use client"

import { useState } from "react"
import type { AddOn } from "@/types/addOn"
import { Button } from "@/components/ui/button"
import { Pencil, Trash } from "lucide-react"
import Link from "next/link"
import { deleteAddOn } from "@/app/actions/addOnsActions"
import { DataTable } from "../packages/data-table"
import { AVAILABLE_ICONS } from "@/lib/icons/icons"
import type { LucideIcon } from "lucide-react"

export default function AddOnsTable({
  initialAddOns,
}: {
  initialAddOns: AddOn[]
}) {
  const [addOns, setAddOns] = useState(initialAddOns)

  const columns = [
    {
      key: "name" as keyof AddOn,
      label: "Name",
      sortable: true,
    },
    {
      key: "description" as keyof AddOn,
      label: "Description",
      sortable: true,
      render: (value: AddOn["description"]) => (
        <span className="line-clamp-2 max-w-[300px]" title={value}>
          {value}
        </span>
      ),
    },
    {
      key: "price" as keyof AddOn,
      label: "Price",
      sortable: true,
      render: (value: AddOn["price"]) => `$${value.toFixed(2)}`,
    },
    {
      key: "icon" as keyof AddOn,
      label: "Icon",
      render: (value: AddOn["icon"]) => {
        const IconComponent = AVAILABLE_ICONS[value] as LucideIcon
        return IconComponent ? <IconComponent className="w-5 h-5 text-primary" /> : null
      },
    },
    {
      key: "id" as keyof AddOn,
      label: "Actions",
      render: (value: AddOn["id"], addOn: AddOn) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/add-ons/${addOn.id}/edit`}>
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
                await deleteAddOn(addOn.id!)
                setAddOns(addOns.filter((a) => a.id !== addOn.id))
              }
            }}
          >
            <Trash className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={addOns} />
}

