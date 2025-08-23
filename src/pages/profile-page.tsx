import { useGetUserProfile } from "@/hooks/use-auth";

const ProfilePage: React.FC = () => {
  const { data: res, isLoading, error } = useGetUserProfile();
  // console.log("user", res);
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong</p>;
  return <div>Hi, {res?.data?.name}</div>;
};

export default ProfilePage;
