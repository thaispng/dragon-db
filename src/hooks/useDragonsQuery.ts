import { useQuery } from '@tanstack/react-query';
import { dragonsService } from '../services/dragonService';
import { Dragon } from '../types/dragonTypes';

export function useDragonsQuery() {
  return useQuery<Dragon[]>({
    queryKey: ['dragons'],
    queryFn: () => dragonsService.getAll(),
  });
}
