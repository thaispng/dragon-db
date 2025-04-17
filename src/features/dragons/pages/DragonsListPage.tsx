import { useDragonsQuery } from '../../../hooks/useDragonsQuery';

export function DragonsListPage() {
  const { data: dragons, isLoading, isError } = useDragonsQuery();

  if (isLoading) return <p>Carregando dragões...</p>;
  if (isError) return <p>Erro ao carregar os dragões.</p>;

  return (
    <div>
      <h1>Lista de Dragões</h1>
      <ul>
        {dragons?.map((dragon) => (
          <li key={dragon.id}>
            {dragon.name} ({dragon.type})
          </li>
        ))}
      </ul>
    </div>
  );
}
