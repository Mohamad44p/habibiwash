"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface Profile01Props {
  name: string;
  role: string;
  avatar: string;
}

const defaultProfile = {
  name: "Admin User",
  role: "Administrator",
  avatar: "/images/avatar/avatar-01.png",
};

export default function UserProfile({
  name = defaultProfile.name,
  role = defaultProfile.role,
  avatar = defaultProfile.avatar,
}: Partial<Profile01Props> = defaultProfile) {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });
      
      if (response.ok) {
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
        });
        router.push("/admin/login");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: "Failed to log out",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatar} alt={name} />
          <AvatarFallback>
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </div>
      <div className="space-y-1">
        <Link href="/admin/profile">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <User className="mr-2 h-4 w-4" />
            Profile
          </Button>
        </Link>
        <Link href="/admin/settings">
          <Button
            variant="ghost"
            className="w-full justify-start text-muted-foreground"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
