import { useMutation, useQueryClient } from "@tanstack/react-query";
import { dragonsService } from "../services/dragonService";
import { Dragon } from "../types/dragonTypes";

export function useUpdateDragonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, dragon }: { id: string; dragon: Partial<Dragon> }) =>
      dragonsService.update(id, dragon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dragons"] });
    },
    onError: (error) => {
      console.error("Erro ao atualizar dragão:", error);
    },
  });
}
