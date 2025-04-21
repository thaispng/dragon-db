import { useQuery } from "@tanstack/react-query";
import { dragonsService } from "../services/dragonService";
import { Dragon } from "../types/dragonTypes";

export function useGetDragonByIdQuery(id: string) {
  return useQuery<Dragon>({
    queryKey: ["dragon", id],
    queryFn: () => dragonsService.getById(id),
    enabled: !!id, 
  });
}
