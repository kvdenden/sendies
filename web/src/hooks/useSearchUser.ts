import { useQuery } from "@tanstack/react-query";

export default function useSearchUser(address?: `0x${string}`) {
  const query = useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      return fetch("/api/users/search", {
        method: "POST",
        body: JSON.stringify({ address }),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
    },
    enabled: !!address,
  });
  return query;
}
