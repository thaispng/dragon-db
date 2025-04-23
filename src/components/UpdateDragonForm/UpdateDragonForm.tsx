import type React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { Shield, BookOpen } from "lucide-react";
import Card from "../Card/card";
import { useUpdateDragonMutation } from "../../hooks/useUpdateDragonMutation";
import { useGetDragonByIdQuery } from "../../hooks/useGetDragonByIdQuery";
import "./dragon-form.css";
import { useToast } from "../Toast/use-toast";
import { Loading } from "../Loading/Loading"; 
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

export function UpdateDragonForm() {
  const [dragonData, setDragonData] = useState<DragonData>({
    name: "",
    type: "",
    histories: [],
    imageUrl: "",
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { mutate, isPending } = useUpdateDragonMutation();
  const { data: dragon, isLoading } = useGetDragonByIdQuery(id || "");

  const { success } = useToast();

  useEffect(() => {
    if (dragon) {
      setDragonData({
        name: dragon.name || "",
        type: dragon.type || "",
        histories: dragon.histories || [],
        imageUrl: dragon.imageUrl || "",
      });
    }
  }, [dragon]);

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
        id: id || "",
        dragon: {
          name: dragonData.name,
          type: dragonData.type,
          histories: dragonData.histories ?? [],
          imageUrl: dragonData.imageUrl?.trim() || "",
        },
      },
      {
        onSuccess: () => {
          success("Dragão atualizado com sucesso!");
          navigate("/dragonsListPage");
        },
      }
    );
  };

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <div className="dragon-form-wrapper">
      <div className="dragon-form-header">
        <div className="dragons-header">
          <h1 className="dragons-title">Atualizar Dragão</h1>
          <p className="dragons-subtitle">
            Edite os detalhes do seu dragão lendário
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
            {isPending ? "Atualizando..." : "Salvar Alterações"}
          </Button>
        </div>
      </form>
    </div>
  );
}
