import { useRouter } from "next/navigation";

export const loginRedirect = () => {
  const router = useRouter();
  router.push("/login");
}