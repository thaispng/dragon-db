import { useDragonsQuery } from '../../hooks/useDragonsQuery';
import { DragonsList } from '../../components/DragonList/DragonsList';
import { Loading } from '../../components/Loading/Loading'; 

export function DragonsListPage() {
  const { data: dragons, isLoading, isError } = useDragonsQuery();

  if (isLoading) return <Loading />; 
  if (isError) return <p>Erro ao carregar os dragões.</p>;

  return (
    <div>
      {dragons && <DragonsList dragons={dragons} />}
    </div>
  );
}
