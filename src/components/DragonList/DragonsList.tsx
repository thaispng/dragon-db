interface Dragon {
    id: string;
    name: string;
    type: string;
  }
  
  interface DragonsListProps {
    dragons: Dragon[];
  }
  
  export function DragonsList({ dragons }: DragonsListProps) {
    return (
      <ul>
        {dragons.map((dragon) => (
          <li key={dragon.id}>
            {dragon.name} ({dragon.type})
          </li>
        ))}
      </ul>
    );
  }
  