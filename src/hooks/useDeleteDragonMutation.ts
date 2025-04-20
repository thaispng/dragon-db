import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dragonsService } from '../services/dragonService';

export function useDeleteDragonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dragonsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dragons'] });
    },
    onError: (error) => {
      console.error('Erro ao deletar dragão:', error);
    },
  });
}
