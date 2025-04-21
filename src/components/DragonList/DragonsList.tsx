"use client";

import { useState } from "react";
import { useDeleteDragonMutation } from "../../hooks/useDeleteDragonMutation";
import "./dragons-list.css";
import { ThemeToggle } from "../ThemeToggle";
import { Input } from "../Input/input";
import { Button } from "../Button/button";
import { ChevronLeft, ChevronRight, ImageOffIcon, Pen } from "lucide-react";
import { DeleteModalPure } from "../DeleteModal/delete-modal-pure";
import { useToast } from "../../components/Toast/use-toast";

interface Dragon {
  id: string;
  name: string;
  type: string;
  histories: string[];
  imageUrl: string;
}

interface DragonsListProps {
  dragons: Dragon[];
}

export function DragonsList({ dragons }: DragonsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedDragons, setSelectedDragons] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { mutate: deleteDragon, isPending: isDeleting } =
    useDeleteDragonMutation();
  const { success, error } = useToast();

  const filteredDragons = dragons.filter((dragon) => {
    const matchesSearch =
      dragon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dragon.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      !activeFilter || dragon.type.toLowerCase() === activeFilter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const totalPages = Math.ceil(filteredDragons.length / itemsPerPage);

  const currentDragons = filteredDragons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
      case "fogo":
        return "tier-extraordinary";
      case "ice":
      case "gelo":
        return "tier-elevated";
      case "earth":
      case "terra":
        return "tier-essential";
      case "lightning":
      case "relâmpago":
      case "electric":
        return "tier-exceptional";
      case "wind":
      case "vento":
      case "air":
      case "ar":
        return "tier-elevated";
      default:
        return "tier-essential";
    }
  };

  const toggleDragonSelection = (id: string) => {
    setSelectedDragons((prev) =>
      prev.includes(id)
        ? prev.filter((dragonId) => dragonId !== id)
        : [...prev, id]
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleDeleteDragon = (id: string) => {
    deleteDragon(id, {
      onSuccess: (data) => {
        success("Dragão excluído", `O dragão foi removido com sucesso.`);
        if (selectedDragons.includes(id)) {
          setSelectedDragons(
            selectedDragons.filter((dragonId) => dragonId !== id)
          );
        }
      },
      onError: (err) => {
        error(
          "Erro ao excluir",
          "Não foi possível excluir o dragão. Tente novamente."
        );
      },
    });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    if (startPage > 1) {
      pageNumbers.push(
        <Button
          key="first"
          variant="outline"
          size="small"
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </Button>
      );

      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-ellipsis">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Button
          key={i}
          variant={currentPage === i ? "primary" : "outline"}
          size="small"
          onClick={() => handlePageChange(i)}
          className="pagination-button"
        >
          {i}
        </Button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="pagination-ellipsis">
            ...
          </span>
        );
      }

      pageNumbers.push(
        <Button
          key="last"
          variant="outline"
          size="small"
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </Button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="dragons-container">
      <div className="dragons-header">
        <ThemeToggle />
        <h1 className="dragons-title">Coleção de Dragões</h1>
        <p className="dragons-subtitle">
          Explore nossa coleção de dragões lendários de diferentes tipos e
          habilidades.
        </p>
      </div>

      <div className="search-container">
        <Input
          type="search"
          placeholder="Buscar por nome ou tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <Button>Crie um Dragão</Button>
      </div>

      {filteredDragons.length === 0 ? (
        <div className="no-results">
          <p>Nenhum dragão encontrado com o termo "{searchTerm}".</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("");
              setActiveFilter(null);
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="dragons-table-container">
            <table className="dragons-table">
              <thead>
                <tr>
                  <th className="selected-column"></th>
                  <th className="avatar-column"></th>
                  <th>ID</th>
                  <th className="name-column">NOME</th>
                  <th>ELEMENTO</th>
                  <th>DATA</th>
                  <th>TIPO</th>
                  <th>HISTORIA</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {currentDragons.map((dragon) => (
                  <tr key={dragon.id} className="dragon-row">
                    <td className="selected-column">
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={selectedDragons.includes(dragon.id)}
                          onChange={() => toggleDragonSelection(dragon.id)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </td>
                    <td className="avatar-column">
                      <div className="dragon-avatar">
                        {dragon.imageUrl ? (
                          <img
                            src={dragon.imageUrl}
                            alt={`${dragon.name} avatar`}
                            className="dragon-image"
                          />
                        ) : (
                          <span className="no-image-text">
                            <ImageOffIcon size={20} />
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span className="dragon-origin">{`${dragon.id.substring(
                        0,
                        8
                      )}`}</span>
                    </td>
                    <td className="name-column">
                      <span className="dragon-name">{dragon.name}</span>
                    </td>
                    <td>
                      <span className="dragon-element">{dragon.type}</span>
                    </td>
                    <td>
                      <span className="dragon-date">
                        {new Date().toLocaleDateString("pt-BR")}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`dragon-tier ${getTypeClass(dragon.type)}`}
                      >
                        {dragon.type}
                      </span>
                    </td>
                    <td>
                      <span className="dragon-origin">
                        {dragon.histories.length > 0
                          ? dragon.histories
                              .map((history) =>
                                history.length > 15
                                  ? history.slice(0, 15) + "..."
                                  : history
                              )
                              .join(", ")
                          : "Nenhuma história"}
                      </span>
                    </td>

                    <td>
                      <div className="action-buttons">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Editar"
                          onClick={() =>
                            console.log(`Edit dragon ${dragon.id}`)
                          }
                        >
                          <Pen size={18} />
                        </Button>

                        <DeleteModalPure
                          title="Excluir Dragão"
                          description="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
                          itemName={dragon.name}
                          onDelete={() => handleDeleteDragon(dragon.id)}
                          buttonClassName="delete-button"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination-container">
            <div className="pagination-controls">
              <Button
                variant="default"
                size="small"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                leftIcon={<ChevronLeft size={16} />}
                className="pagination-nav-button"
              >
                Anterior
              </Button>

              <div className="pagination-numbers">{renderPageNumbers()}</div>

              <Button
                variant="default"
                size="small"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                rightIcon={<ChevronRight size={16} />}
                className="pagination-nav-button"
              >
                Próximo
              </Button>
            </div>

            <div className="pagination-info">
              Mostrando{" "}
              {Math.min(
                filteredDragons.length,
                (currentPage - 1) * itemsPerPage + 1
              )}{" "}
              - {Math.min(currentPage * itemsPerPage, filteredDragons.length)}{" "}
              de {filteredDragons.length} dragões
            </div>
          </div>
        </>
      )}
    </div>
  );
}
