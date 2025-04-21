"use client";

import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { Shield, BookOpen } from "lucide-react";
import Card from "../Card/card";
import "./dragon-form.css";

interface DragonData {
  name: string;
  type: string;
  histories: string[];
  imageUrl: string;
}

export function DragonForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dragonData, setDragonData] = useState<DragonData>({
    name: "",
    type: "",
    histories: [],
    imageUrl: "",
  });

  const navigate = useNavigate(); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDragonData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const newDragon = {
      ...dragonData,
      createdAt: new Date().toISOString(),
      id: Math.floor(Math.random() * 1000).toString(),
    };

    console.log("Novo dragão:", newDragon);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setDragonData({
      name: "",
      type: "",
      histories: [],
      imageUrl: "",
    });
  };

  return (
    <div className="dragon-form-wrapper">
      <div className="dragon-form-header">
        <div>
          <h2 className="dragon-form-title">Adicionar Novo Dragão</h2>
          <p className="dragon-form-subtitle">
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
              value={dragonData.histories.join(", ")}
              onChange={(e) => {
                const histories = e.target.value
                  .split(",")
                  .map((h) => h.trim());
                setDragonData((prev) => ({
                  ...prev,
                  histories,
                }));
              }}
              required
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
            cancelar
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Adicionando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
