import { useQuery } from "@tanstack/react-query";

export default function useSearchUser(address?: `0x${string}`) {
  const query = useQuery({
    queryKey: ["user", address],
    queryFn: async () => {
      if (!address) return;
      return fetch(`/api/profile?${new URLSearchParams({ address })}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => {
        if (!res.ok) return;

        return res.json();
      });
    },
    enabled: !!address,
  });
  return query;
}
