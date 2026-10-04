import UserDetails from "@/app/(dashboard)/_components/user/UserDetails";



interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({
  params,
}: UserDetailsPageProps) {
  const { id } = await params;

  return <UserDetails id={id} />
}
