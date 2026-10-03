import { useLogout } from "@/components/hooks/auth.hook";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useQueryClient } from "@tanstack/react-query";

export default function Logout() {
  const { mutate: logout } = useLogout();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        toast.add({
          title: "Logout Successful",
          description: "You have been logged out successfully.",
          type: "success",
        });

        queryClient.removeQueries({
          queryKey: ["user"],
        });
      },

      onError: () => {
        toast.add({
          title: "Logout Failed",
          description: "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <Button
      className="cursor-pointer"
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
