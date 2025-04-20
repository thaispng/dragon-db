import { DragonForm } from "../../components/DragonForm/DragonForm";
import { ThemeToggle } from "../../components/ThemeToggle";


export function CreateDragonPage() {
  return (
    <div>
          <div className="dragons-container">
      <div className="dragons-header">
        <ThemeToggle />
        <DragonForm />
      </div>

          </div>
    </div>
  );
}
