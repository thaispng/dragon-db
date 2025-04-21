import { UpdateDragonForm } from "../../components/UpdateDragonForm/UpdateDragonForm";
import { ThemeToggle } from "../../components/ThemeToggle";

export function updateDragonPage() {
  return (
    <div>
          <div className="dragons-container">
      <div className="dragons-header">
        <ThemeToggle />
        <UpdateDragonForm />
      </div>
          </div>
    </div>
  );
}
