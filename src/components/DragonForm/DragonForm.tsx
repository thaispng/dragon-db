import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { Shield, BookOpen } from "lucide-react";
import Card from "../Card/card";
import { useCreateDragonMutation } from "../../hooks/useCreateDragonMutation"; 
import "./dragon-form.css";
import { useToast } from "../Toast/use-toast";

interface DragonData {
  name: string;
  type: string;
  histories?: string[];
  imageUrl?: string;
}

interface FieldErrors {
  name?: string;
  type?: string;
}

export function DragonForm() {
  const [dragonData, setDragonData] = useState<DragonData>({
    name: "",
    type: "",
    histories: [],
    imageUrl: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const { mutate, isPending } = useCreateDragonMutation();
  const {success} = useToast();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDragonData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setFieldErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: FieldErrors = {};
    if (!dragonData.name.trim()) {
      errors.name = "O nome do dragão é obrigatório.";
    }
    if (!dragonData.type.trim()) {
      errors.type = "O tipo do dragão é obrigatório.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    mutate(
      {
        name: dragonData.name,
        type: dragonData.type,
        histories:
          dragonData.histories && dragonData.histories.length > 0
            ? dragonData.histories
            : [],
        imageUrl: dragonData.imageUrl?.trim() || "",
      },
      {
        onSuccess: () => {
          success("Dragão adicionado com sucesso!")
          navigate("/dragonsListPage");
        },
      }
    );
  };

  return (
    <div className="dragon-form-wrapper">
      <div className="dragon-form-header">
        <div className="dragons-header">
        <h1 className="dragons-title">Adicionar Novo Dragão</h1>
        <p className="dragons-subtitle">
        Preencha os detalhes do seu dragão lendário
        </p>
      </div>
      </div>

      <form onSubmit={handleSubmit} className="dragon-form">
        <div className="dragon-form-sections">
          <Card
            title="Identidade do Dragão"
            icon={<Shield className="section-icon" />}
            variant="outlined"
            size="medium"
            className="dragon-section-card"
          >
            <div className="input-group">
              <Input
                name="name"
                label="Nome do Dragão"
                placeholder="Ex: Logan, o Terrível"
                value={dragonData.name}
                onChange={handleChange}
                required
                inputSize="medium"
                fullWidth
                className="dragon-input"
                showRequired
                variant={fieldErrors.name ? "error" : "default"}
                helperText={fieldErrors.name}
              />

              <Input
                name="type"
                label="Tipo do Dragão"
                placeholder="Ex: Dragão de Fogo, Dragão Aquático"
                value={dragonData.type}
                onChange={handleChange}
                required
                inputSize="medium"
                fullWidth
                className="dragon-input"
                showRequired
                variant={fieldErrors.type ? "error" : "default"}
                helperText={fieldErrors.type}
              />

              <Input
                name="imageUrl"
                label="URL da Imagem"
                placeholder="Ex: https://exemplo.com/imagem-dragao.jpg"
                value={dragonData.imageUrl}
                onChange={handleChange}
                inputSize="medium"
                fullWidth
                className="dragon-input"
                showRequired
              />
            </div>
          </Card>

          <Card
            title="Lendas e Histórias"
            icon={<BookOpen className="section-icon" />}
            variant="outlined"
            size="medium"
            className="dragon-section-card"
          >
            <Input
              name="histories"
              label="Histórias do Dragão"
              placeholder="Ex: Guardião das montanhas, Protetor do tesouro antigo"
              value={dragonData.histories?.join(", ") || ""}
              onChange={(e) => {
                const histories = e.target.value
                  .split(",")
                  .map((h) => h.trim())
                  .filter((h) => h.length > 0);
                setDragonData((prev) => ({
                  ...prev,
                  histories,
                }));
              }}
              inputSize="medium"
              fullWidth
              className="dragon-input"
            />
          </Card>
        </div>

        <div className="dragon-form-actions">
          <Button
            type="button"
            variant="outline"
            className="reset-button"
            onClick={() => navigate("/dragonsListPage")}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isPending}
            className="submit-button"
          >
            {isPending ? "Adicionando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
