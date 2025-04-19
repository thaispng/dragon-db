import { useDragonsQuery } from '../../hooks/useDragonsQuery';
import { DragonsList } from '../../components/DragonList/DragonsList';

export function DragonsListPage() {
  const { data: dragons, isLoading, isError } = useDragonsQuery();

  if (isLoading) return <p>Carregando dragões...</p>;
  if (isError) return <p>Erro ao carregar os dragões.</p>;

  return (
    <div>
      <h1>Lista de Dragões</h1>
      {dragons && <DragonsList dragons={dragons} />}
    </div>
  );
}
