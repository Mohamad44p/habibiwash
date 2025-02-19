"use client"

import { useState } from "react"
import type { Package } from "@/types/package"
import { Button } from "@/components/ui/button"
import { Pencil, Trash, Star } from "lucide-react"
import Link from "next/link"
import { deletePackage } from "@/app/actions/packagesActions"
import { DataTable } from "../packages/data-table"
import Image from "next/image"

export default function PackagesTable({
  initialPackages,
}: {
  initialPackages: Package[]
}) {
  const [packages, setPackages] = useState<Package[]>(initialPackages)

  const columns = [
    {
      key: "name" as keyof Package,
      label: "Name",
      sortable: true,
    },
    {
      key: "image" as keyof Package,
      label: "Image",
      render: (value: string) => (
        <div className="relative w-10 h-10">
          <Image src={value || "/Logo1.png"} alt="Package" fill className="object-cover rounded" sizes="40px" />
        </div>
      ),
    },
    {
      key: "subPackages" as keyof Package,
      label: "Sub Packages",
      render: (value: Package["subPackages"]) => value.length,
    },
    {
      key: "featured" as keyof Package,
      label: "Featured",
      render: (value: boolean) => (value ? <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> : null),
    },
    {
      key: "id" as keyof Package,
      label: "Actions",
      render: (value: string, package_: Package) => (
        <div className="flex items-center gap-2">
          <Link href={`/admin/packages/${package_.id}/edit`}>
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
                await deletePackage(package_.id!)
                setPackages(packages.filter((p) => p.id !== package_.id))
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

  return <DataTable columns={columns} data={packages} />
}

