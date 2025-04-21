import { useMutation, useQueryClient } from '@tanstack/react-query';
import { dragonsService } from '../services/dragonService';
import { Dragon } from '../types/dragonTypes';

export function useCreateDragonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newDragon: Omit<Dragon, 'id' | 'createdAt'>) => dragonsService.create(newDragon),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dragons'] });
    },
    onError: (error) => {
      console.error('Erro ao criar dragão:', error);
    },
  });
}
